import React, { ReactNode } from 'react';

interface TooltipHoverProps {
  children: ReactNode;
  tooltipText: string;
  direction?: string;
}

const getTooltipDirectionStyles = (direction: string): string => {
  switch (direction) {
    case 'top':
      return 'bottom-[95%] left-1/2 -translate-x-1/2 translate-y-full';
    case 'bottom':
      return 'top-[95%] left-1/2 -translate-x-1/2 -translate-y-full';
    case 'left':
      return 'top-1/2 right-[35%] -translate-y-1/2 -translate-x-full';
    case 'right':
      return 'top-1/2 left-[35%] -translate-y-1/2 translate-x-full';
    case 'top-left':
      return 'bottom-[95%] right-[35%] translate-x-0.5 translate-y-full';
    case 'top-right':
      return 'bottom-[95%] left-[35%] -translate-x-0.5 translate-y-full';
    case 'bottom-left':
      return 'top-[95%] right-[35%] translate-x-0.5 -translate-y-full';
    case 'bottom-right':
      return 'top-[95%] left-[35%] -translate-x-0.5 -translate-y-full';
    case 'center':
      return '-translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2';
    default:
      return '';
  }
};

const TooltipHover: React.FC<TooltipHoverProps> = ({
  children,
  tooltipText,
  direction = 'center',
}) => {
  const tooltipDirectionStyles = getTooltipDirectionStyles(direction);

  return (
    <div className='group flex relative'>
      {children}
      <span
        className={`group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute opacity-0 m-4 mx-auto ${tooltipDirectionStyles}`}
      >
        {tooltipText}
      </span>
    </div>
  );
};

export default TooltipHover;
