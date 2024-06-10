import { TImageData } from '@screens/ContentItem/types';
import { FC } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface ItemDetailContentImageProps {
  images: TImageData[];
}

const ItemDetailContentImage: FC<ItemDetailContentImageProps> = ({
  images,
}) => {
  return (
    <PhotoProvider>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {images.map((image, index) => (
          <PhotoView src={image.url}>
            <img
              src={image.url}
              className={`w-full h-full object-cover rounded-lg`}
              alt={`gallery-image-${index}`}
              loading='lazy'
            />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
};

export default ItemDetailContentImage;
