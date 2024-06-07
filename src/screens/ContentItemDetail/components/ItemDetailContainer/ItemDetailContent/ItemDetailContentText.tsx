import { FC } from 'react';

interface ItemDetailContentTextProps {
  text: string;
}

const ItemDetailContentText: FC<ItemDetailContentTextProps> = ({ text }) => {
  return (
    <div className='my-4'>
      <p className='text-lg'>{text}</p>
    </div>
  );
};

export default ItemDetailContentText;
