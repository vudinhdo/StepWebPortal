import { ReactNode, Suspense } from 'react';
import { motion } from 'framer-motion';

interface LazyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center p-8">
    <motion.div
      className="w-8 h-8 border-4 border-[hsl(207,100%,40%)] border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default function LazyWrapper({ 
  children, 
  fallback = <DefaultFallback />, 
  delay = 0 
}: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.2 }}
        style={{ willChange: 'opacity' }}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}