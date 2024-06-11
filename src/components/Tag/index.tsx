import { FC } from 'react';

interface TagProps {
  text: string;
  transparent?: boolean;
  color?: string;
  className?: string;
}

const Tag: FC<TagProps> = ({
  transparent,
  className,
  text,
  color = '#4299e1',
}) => {
  return (
    <div
      className={`z-10 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full text-[${color}] border-4 border-[${color}] ${
        transparent ? 'bg-transparent' : 'bg-white'
      } ${className}`}
      style={{ color: color, borderColor: color }}
    >
      {text}
    </div>
  );
};

export default Tag;
