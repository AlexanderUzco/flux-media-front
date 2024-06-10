import { useContext } from 'react';
import { ArrowUturnLeftIcon, PencilIcon } from '@heroicons/react/16/solid';
import { ContentItemDetailContext } from '../../context/ContentItemDetailContext';
import { TrashIcon } from '@heroicons/react/16/solid';
import { AuthContext } from '../../../../contexts/authContext';
import { useNavigate } from 'react-router';

const ItemDetailProperty = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { contentItem, handleItemDetailModal } = useContext(
    ContentItemDetailContext
  );

  const navigator = useNavigate();

  const handleReturnDashboard = () => {
    navigator('/dashboard');
  };

  return (
    <div className='p-4 border-b'>
      <div className='flex items-center'>
        <ArrowUturnLeftIcon
          className='h-5 w-5 text-gray-500 cursor-pointer mr-3'
          onClick={handleReturnDashboard}
        />
        <h2 className='text-lg font-semibold'>
          {contentItem?.title || 'No title'}
        </h2>
      </div>
      <div className='flex items-center mt-2'>
        <span className='text-sm text-gray-500 mr-2'>Category:</span>
        <span className='text-sm font-medium mr-4'>
          {contentItem?.topicID?.categoryID?.name || 'No Category'}
        </span>
        <span className='text-sm text-gray-500 mr-2'>Topic:</span>
        <span className='text-sm font-medium'>
          {contentItem?.topicID?.name || 'No Topic'}
        </span>
        {isAuthenticated &&
          (user?.role === 'ADMIN' || contentItem?.createdBy._id == user.id) && (
            <div className='ml-auto flex'>
              <TrashIcon
                className='h-8 w-8 text-red-500 cursor-pointer'
                onClick={() =>
                  handleItemDetailModal({
                    type: 'delete',
                    open: true,
                    contentItemID: contentItem?._id,
                  })
                }
              />
              <PencilIcon
                className='h-8 w-8 text-blue-500 cursor-pointer mr-2'
                onClick={() =>
                  handleItemDetailModal({
                    type: 'edit',
                    open: true,
                    contentItemID: contentItem?._id,
                  })
                }
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default ItemDetailProperty;
