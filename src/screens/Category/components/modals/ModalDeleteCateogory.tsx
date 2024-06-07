import { useContext, useState } from 'react';
import ModalBase from '../../../../components/ModalBase';
import { CategoryContext } from '../../context/CategoryContext';
import { toast } from 'react-toastify';
import { deleteCategory } from '../../../../api/fluxMediaService/services/category';
import { AxiosError } from 'axios';

const ModalDeleteCateogory = () => {
  const { categoryModal, handleCategoryModal, fetchCategories } =
    useContext(CategoryContext);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    handleCategoryModal({
      type: null,
      open: false,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!categoryModal.categorySelected) {
        throw new Error('Category not selected');
      }

      const res = await deleteCategory(
        categoryModal.categorySelected?._id as string
      );

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      fetchCategories();
      setLoading(false);
      closeModal();
      toast.success('Category deleted successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <ModalBase
      open={categoryModal.open && categoryModal.type === 'delete'}
      closeModal={closeModal}
      title={`Delete Category ${categoryModal.categorySelected?.name}`}
      successAction={handleSubmit}
      successText={`Delete`}
      loading={loading}
    >
      <div className='flex flex-col gap-4'>
        <p className='text-lg ml-5 my-5'>
          Are you sure you want to delete this category?
        </p>
      </div>
    </ModalBase>
  );
};

export default ModalDeleteCateogory;
