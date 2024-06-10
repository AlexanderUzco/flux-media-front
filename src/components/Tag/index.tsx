import { FC } from 'react';

interface TagProps {
  text: string;
  color?: string;
}

const Tag: FC<TagProps> = ({ text, color = '#4299e1' }) => {
  return (
    <div
      className={`z-10 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-[${color}] border-4 border-[${color}]`}
      style={{ color: color, borderColor: color }}
    >
      {text}
    </div>
  );
};

export default Tag;
