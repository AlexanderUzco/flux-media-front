import React, { useState } from 'react';
import { TItemFile } from '../../../../ContentItem/types';

interface ItemDetailContentImageProps {
  images: TItemFile[];
}

const ItemDetailContentImage: React.FC<ItemDetailContentImageProps> = ({
  images,
}) => {
  const [active, setActive] = useState(images[0]?.url || '');

  return (
    <div className='grid gap-4 mt-5'>
      {active && (
        <div>
          <img
            className='w-[600px] rounded-lg md:h-[480px]'
            src={active}
            alt=''
          />
        </div>
      )}

      <div className='flex'>
        {images.map(({ url }, index) => (
          <div
            key={index}
            className='m-1'
          >
            <img
              onClick={() => setActive(url)}
              src={url}
              className='h-40 max-w-full cursor-pointer rounded-lg object-cover object-center'
              alt='gallery-image'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetailContentImage;
