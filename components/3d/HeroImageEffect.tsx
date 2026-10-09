'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
// Aliased so it doesn't shadow the global `Image` constructor used by loadTexture.
import NextImage from 'next/image';

// Vertex shader
const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// Fragment shader с liquid distortion
const fragmentShaderSource = `
  precision highp float;
  
  uniform sampler2D u_texture1;
  uniform sampler2D u_texture2;
  uniform vec2 u_mouse;
  uniform float u_hover;
  uniform float u_time;
  varying vec2 v_texCoord;
  
  void main() {
    vec2 uv = v_texCoord;
    
    // Искажаем позицию для расчёта формы spotlight (не UV текстуры!)
    vec2 morphedUv = uv + vec2(
      sin(uv.y * 12.0 + u_time * 1.5) * 0.04,
      cos(uv.x * 12.0 + u_time * 1.5) * 0.04
    ) * u_hover;
    
    // Добавляем волновое искажение к границе
    float waveDist = distance(morphedUv, u_mouse);
    float wave = sin(waveDist * 20.0 - u_time * 2.0) * 0.02 * u_hover;
    float dist = distance(morphedUv, u_mouse) + wave;
    
    // Радиус эффекта (уменьшен на 10%)
    float radius = 0.27;
    
    // Плавный переход (форма spotlight морфится как жидкость, размытие уменьшено вполовину)
    float mixFactor = smoothstep(radius + 0.025, radius - 0.075, dist) * u_hover;
    
    // Текстуры читаем по ОРИГИНАЛЬНЫМ UV — картинки не искажаются!
    vec4 tex1 = texture2D(u_texture1, uv);
    vec4 tex2 = texture2D(u_texture2, uv);
    
    gl_FragColor = mix(tex1, tex2, mixFactor);
  }
`;

interface HeroImageEffectProps {
  className?: string;
  style?: React.CSSProperties;
  triggerDemo?: boolean;
}

export default function HeroImageEffect({ className, style, triggerDemo }: HeroImageEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animationRef = useRef<number>(0);
  const isRenderingRef = useRef(false);
  const requestRenderRef = useRef<() => void>(() => {});
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const hoverRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isDemoActiveRef = useRef(false);
  const demoStartTimeRef = useRef(0);
  const startTimeRef = useRef(Date.now());

  // Pause rendering when the hero is off-screen or the tab is hidden.
  const isVisibleRef = useRef(true);
  const isPageVisibleRef = useRef(true);

  // Touch / no-hover devices: skip WebGL entirely and show a static image.
  // Keeps mobile GPUs free (the shader has no touch interaction anyway).
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setUseWebGL(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Demo animation trigger
  useEffect(() => {
    if (triggerDemo && !isDemoActiveRef.current) {
      isDemoActiveRef.current = true;
      demoStartTimeRef.current = Date.now();
      requestRenderRef.current();

      // Reset demo after animation completes
      setTimeout(() => {
        isDemoActiveRef.current = false;
      }, 1500); // 1.5s demo duration
    }
  }, [triggerDemo]);

  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }, []);

  const createProgram = useCallback((gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }, []);

  const loadTexture = useCallback((gl: WebGLRenderingContext, url: string): Promise<WebGLTexture | null> => {
    return new Promise((resolve) => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      // Placeholder pixel
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([128, 128, 128, 255]));
      
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        resolve(texture);
      };
      image.onerror = () => resolve(null);
      image.src = url;
    });
  }, []);

  useEffect(() => {
    if (!useWebGL) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    programRef.current = program;

    // Setup geometry
    const positions = new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1, 1,   1, -1,   1, 1,
    ]);
    const texCoords = new Float32Array([
      0, 0,  1, 0,  0, 1,
      0, 1,  1, 0,  1, 1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Load textures
    let texture1: WebGLTexture | null = null;
    let texture2: WebGLTexture | null = null;

    // Draws a single frame. Returns whether another frame is still needed
    // (i.e. the hover value is animating or the demo/hover is active).
    const drawFrame = (): boolean => {
      if (!gl || !program) return false;

      let demoHover = 0;
      let demoMouseX = mouseRef.current.x;
      let demoMouseY = mouseRef.current.y;

      if (isDemoActiveRef.current) {
        const demoElapsed = (Date.now() - demoStartTimeRef.current) / 1000;
        const demoDuration = 1.5;
        const demoProgress = Math.min(demoElapsed / demoDuration, 1);

        // Bell curve for hover (appear then disappear)
        demoHover = Math.sin(demoProgress * Math.PI);

        // Circular motion for mouse position
        const angle = demoProgress * Math.PI * 0.5; // Quarter circle
        demoMouseX = 0.5 + Math.cos(angle) * 0.15;
        demoMouseY = 0.5 + Math.sin(angle) * 0.15;
      }

      // Smooth hover transition (combine demo and real hover)
      const targetHover = isHoveringRef.current ? 1 : demoHover;
      hoverRef.current += (targetHover - hoverRef.current) * 0.08;

      // Use demo mouse position if demo is active, otherwise use real mouse
      const finalMouseX = isDemoActiveRef.current && !isHoveringRef.current ? demoMouseX : mouseRef.current.x;
      const finalMouseY = isDemoActiveRef.current && !isHoveringRef.current ? demoMouseY : mouseRef.current.y;

      const time = (Date.now() - startTimeRef.current) / 1000;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Bind textures
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture1);
      gl.uniform1i(gl.getUniformLocation(program, 'u_texture1'), 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texture2);
      gl.uniform1i(gl.getUniformLocation(program, 'u_texture2'), 1);

      // Set uniforms
      gl.uniform2f(gl.getUniformLocation(program, 'u_mouse'), finalMouseX, finalMouseY);
      gl.uniform1f(gl.getUniformLocation(program, 'u_hover'), hoverRef.current);
      gl.uniform1f(gl.getUniformLocation(program, 'u_time'), time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // The shader is static when hover is 0 (output is just texture1), so we
      // only need more frames while the effect/demo is active or settling.
      const stillAnimating =
        isHoveringRef.current ||
        isDemoActiveRef.current ||
        Math.abs(targetHover - hoverRef.current) > 0.002 ||
        hoverRef.current > 0.002;
      return stillAnimating;
    };

    const loop = () => {
      const needMore = drawFrame();
      if (needMore && isVisibleRef.current && isPageVisibleRef.current) {
        animationRef.current = requestAnimationFrame(loop);
      } else {
        isRenderingRef.current = false;
      }
    };

    // Start (or keep) the render loop on demand. Idle = no rAF scheduled.
    const requestRender = () => {
      if (isRenderingRef.current) return;
      if (!isVisibleRef.current || !isPageVisibleRef.current) return;
      isRenderingRef.current = true;
      animationRef.current = requestAnimationFrame(loop);
    };
    requestRenderRef.current = requestRender;

    Promise.all([
      loadTexture(gl, '/images/hero-picture-5ae899.png'),
      loadTexture(gl, '/images/hero-picture-top-602311.png'),
    ]).then(([t1, t2]) => {
      texture1 = t1;
      texture2 = t2;
      drawFrame(); // initial static frame
      requestRender();
    });

    // Pause when the tab is backgrounded.
    const handleVisibility = () => {
      isPageVisibleRef.current = !document.hidden;
      if (isPageVisibleRef.current) requestRender();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Pause when the hero scrolls out of view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) requestRender();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationRef.current);
      isRenderingRef.current = false;
      requestRenderRef.current = () => {};
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, [useWebGL, createShader, createProgram, loadTexture]);

  // Resize canvas
  useEffect(() => {
    if (!useWebGL) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
      }
      requestRenderRef.current(); // redraw after dimensions change
    });

    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [useWebGL]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height; // Invert Y: screen coords go down, UV goes up
    mouseRef.current = { x, y };
    requestRenderRef.current();
  };

  // Touch / no-hover devices: render a lightweight, optimized static image
  // instead of initializing WebGL and a continuous render loop.
  if (!useWebGL) {
    return (
      <div className={className} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
        <NextImage
          src="/images/hero-picture-5ae899.png"
          alt="Anton Gubarev-Pentin"
          fill
          priority
          sizes="(max-width: 960px) 70vw, 480px"
          className="object-cover"
          style={{ borderRadius: style?.borderRadius }}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ ...style, display: 'block' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { isHoveringRef.current = true; requestRenderRef.current(); }}
      onMouseLeave={() => { isHoveringRef.current = false; requestRenderRef.current(); }}
    />
  );
}
