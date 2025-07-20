import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Info, 
  X, 
  Lightbulb, 
  ArrowRight,
  Star,
  Zap,
  Shield,
  Clock
} from "lucide-react";

interface TooltipContent {
  title: string;
  description: string;
  features?: string[];
  benefits?: string[];
  tips?: string[];
  cta?: {
    text: string;
    action: () => void;
  };
  type?: 'info' | 'feature' | 'benefit' | 'tip';
}

interface InteractiveTooltipProps {
  content: TooltipContent;
  children: React.ReactNode;
  trigger?: 'hover' | 'click';
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  delay?: number;
  maxWidth?: number;
}

export default function InteractiveTooltip({
  content,
  children,
  trigger = 'hover',
  position = 'auto',
  delay = 300,
  maxWidth = 320
}: InteractiveTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState({ top: 0, left: 0 });
  const [actualPosition, setActualPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipHeight = 200; // Estimated height
    const tooltipWidth = maxWidth;
    const spacing = 12;

    let top = 0;
    let left = 0;
    let finalPosition: typeof actualPosition = 'top';

    if (position === 'auto') {
      // Auto-determine best position
      const spaceTop = triggerRect.top;
      const spaceBottom = viewportHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;

      if (spaceBottom >= tooltipHeight + spacing) {
        finalPosition = 'bottom';
      } else if (spaceTop >= tooltipHeight + spacing) {
        finalPosition = 'top';
      } else if (spaceRight >= tooltipWidth + spacing) {
        finalPosition = 'right';
      } else {
        finalPosition = 'left';
      }
    } else {
      finalPosition = position;
    }

    switch (finalPosition) {
      case 'top':
        top = triggerRect.top - tooltipHeight - spacing;
        left = triggerRect.left + (triggerRect.width - tooltipWidth) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + spacing;
        left = triggerRect.left + (triggerRect.width - tooltipWidth) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipHeight) / 2;
        left = triggerRect.left - tooltipWidth - spacing;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipHeight) / 2;
        left = triggerRect.right + spacing;
        break;
    }

    // Ensure tooltip stays within viewport
    left = Math.max(spacing, Math.min(left, viewportWidth - tooltipWidth - spacing));
    top = Math.max(spacing, Math.min(top, viewportHeight - tooltipHeight - spacing));

    setCalculatedPosition({ top, left });
    setActualPosition(finalPosition);
  };

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    const handleScroll = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const getIcon = () => {
    switch (content.type) {
      case 'feature':
        return <Star className="text-yellow-500" size={16} />;
      case 'benefit':
        return <Zap className="text-green-500" size={16} />;
      case 'tip':
        return <Lightbulb className="text-orange-500" size={16} />;
      default:
        return <Info className="text-blue-500" size={16} />;
    }
  };

  const getHeaderColor = () => {
    switch (content.type) {
      case 'feature':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'benefit':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'tip':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      default:
        return 'text-blue-700 bg-blue-50 border-blue-200';
    }
  };

  const tooltip = isVisible && (
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, scale: 0.9, y: actualPosition === 'top' ? 10 : -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: actualPosition === 'top' ? 10 : -10 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 pointer-events-auto"
      style={{
        top: calculatedPosition.top,
        left: calculatedPosition.left,
        maxWidth: maxWidth
      }}
      onMouseEnter={() => trigger === 'hover' && setIsVisible(true)}
      onMouseLeave={() => trigger === 'hover' && hideTooltip()}
    >
      <Card className="shadow-xl border-2 border-gray-100">
        <CardContent className="p-0">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${getHeaderColor()}`}>
            <div className="flex items-center space-x-2">
              {getIcon()}
              <h3 className="font-semibold text-sm">{content.title}</h3>
            </div>
            {trigger === 'click' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={hideTooltip}
                className="h-6 w-6 p-0 hover:bg-white/50"
              >
                <X size={12} />
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              {content.description}
            </p>

            {/* Features */}
            {content.features && content.features.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-2 flex items-center">
                  <Star size={12} className="mr-1" />
                  Tính năng
                </h4>
                <ul className="space-y-1">
                  {content.features.map((feature, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <span className="text-[hsl(207,100%,40%)] mr-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {content.benefits && content.benefits.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-2 flex items-center">
                  <Shield size={12} className="mr-1" />
                  Lợi ích
                </h4>
                <div className="flex flex-wrap gap-1">
                  {content.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {content.tips && content.tips.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-600 mb-2 flex items-center">
                  <Lightbulb size={12} className="mr-1" />
                  Mẹo hay
                </h4>
                <ul className="space-y-1">
                  {content.tips.map((tip, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <span className="text-orange-500 mr-1">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            {content.cta && (
              <div className="pt-2 border-t">
                <Button
                  size="sm"
                  onClick={content.cta.action}
                  className="w-full step-gradient text-white text-xs"
                >
                  {content.cta.text}
                  <ArrowRight size={12} className="ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Arrow */}
          <div
            className={`absolute w-3 h-3 bg-white border transform rotate-45 ${
              actualPosition === 'top' ? 'bottom-[-6px] border-b border-r' :
              actualPosition === 'bottom' ? 'top-[-6px] border-t border-l' :
              actualPosition === 'left' ? 'right-[-6px] border-r border-t' :
              'left-[-6px] border-l border-b'
            }`}
            style={{
              left: actualPosition === 'top' || actualPosition === 'bottom' ? '50%' : undefined,
              top: actualPosition === 'left' || actualPosition === 'right' ? '50%' : undefined,
              transform: `translate(${
                actualPosition === 'top' || actualPosition === 'bottom' ? '-50%' : 
                actualPosition === 'left' ? '50%' : '-50%'
              }, ${
                actualPosition === 'left' || actualPosition === 'right' ? '-50%' : 
                actualPosition === 'top' ? '50%' : '-50%'
              }) rotate(45deg)`
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="inline-block"
      >
        {children}
      </div>
      <AnimatePresence>
        {tooltip && createPortal(tooltip, document.body)}
      </AnimatePresence>
    </>
  );
}