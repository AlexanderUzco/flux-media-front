import { PlusIcon } from '@heroicons/react/16/solid';
import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

const CreateCategoryButton = () => {
  const { handleCategoryModal } = useContext(CategoryContext);

  return (
    <button
      onClick={() =>
        handleCategoryModal({
          type: 'create',
          open: true,
        })
      }
      className='flex items-center bg-blue-500 text-white px-4 py-2 rounded'
    >
      <PlusIcon className='w-5 h-5' />
    </button>
  );
};

export default CreateCategoryButton;
