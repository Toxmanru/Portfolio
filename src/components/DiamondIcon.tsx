import { motion } from 'framer-motion';

export default function DiamondIcon() {
  return (
    <motion.svg 
      width="52" 
      height="52" 
      viewBox="0 0 52 52" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="diamond-icon"
      initial={{ rotate: 0, y: 0 }}
      animate={{ 
        rotate: 180,
        y: [0, -12, 0]
      }}
      transition={{ 
        delay: 2,
        duration: 0.3,
        ease: "easeOut",
        times: [0, 0.5, 1]
      }}
    >
      <path d="M26 0L52 26L26 52L0 26L26 0Z" fill="white"/>
    </motion.svg>
  );
} 