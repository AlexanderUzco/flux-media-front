import { useContext } from 'react';
import { ContentItemDetailContext } from '../../context/ContentItemDetailContext';
import { TrashIcon } from '@heroicons/react/16/solid';

const ItemDetailProperty = () => {
  const { contentItem, handleItemDetailModal } = useContext(
    ContentItemDetailContext
  );

  return (
    <div className='p-4 border-b'>
      <h2 className='text-lg font-semibold'>
        {contentItem?.title || 'No title'}
      </h2>
      <div className='flex items-center mt-2'>
        <span className='text-sm text-gray-500 mr-2'>Category:</span>
        <span className='text-sm font-medium mr-4'>
          {contentItem?.topicID?.categoryID?.name || 'No Category'}
        </span>
        <span className='text-sm text-gray-500 mr-2'>Topic:</span>
        <span className='text-sm font-medium'>
          {contentItem?.topicID?.name || 'No Topic'}
        </span>
        <TrashIcon
          className='h-5 w-5 text-red-500 cursor-pointer ml-auto'
          onClick={() =>
            handleItemDetailModal({
              type: 'delete',
              open: true,
              contentItemID: contentItem?._id,
            })
          }
        />
      </div>
    </div>
  );
};

export default ItemDetailProperty;
