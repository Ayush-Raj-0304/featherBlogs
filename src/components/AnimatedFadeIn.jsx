// src/components/AnimatedFadeIn.jsx
import { motion } from "framer-motion";

export default function AnimatedFadeIn({ children, delay = 0.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
