import { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ModalBase from '../../../../components/ModalBase';
import { v4 as uuidv4 } from 'uuid';
import { CategoryContext } from '../../context/CategoryContext';
import DropzoneFrontpage from '../../../../components/DropzoneFrontpage';
import { uploadFile } from '../../../../firebase/storage';
import { AuthContext } from '../../../../contexts/authContext';
import {
  createCategory,
  updateCategory,
} from '../../../../api/fluxMediaService/services/category';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type FormValues = {
  name: string;
  description: string;
};

const ModalCreateCategory = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { categoryModal, handleCategoryModal, fetchCategories } =
    useContext(CategoryContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (categoryModal.categorySelected) {
      setValue('name', categoryModal.categorySelected.name);
      setValue('description', categoryModal.categorySelected.description);
    }

    return () => {
      setValue('name', '');
      setValue('description', '');
    };
  }, [categoryModal.categorySelected, setValue]);

  const closeModal = () => {
    handleCategoryModal({
      type: null,
      open: false,
      categorySelected: undefined,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

      let imageData = {
        imageUrl: categoryModal.categorySelected?.imageUrl || '',
        ref: categoryModal.categorySelected?.ref || '',
      };

      if (files.length > 0) {
        const fileData = files[0];

        const principalImageRes = await uploadFile({
          imageRef: `user/${user?.id}/file/${uuidv4() + fileData.name}`,
          file: fileData,
        });

        if (principalImageRes instanceof Error) {
          console.log('Error in create category:', principalImageRes);
          setLoading(false);
          return;
        }

        if (principalImageRes.url && principalImageRes.ref) {
          imageData = {
            imageUrl: principalImageRes.url,
            ref: principalImageRes.ref,
          };
        }
      }

      if (!data.name || !data.description) {
        throw new Error('Name and description are required');
      }

      if (!imageData.imageUrl || !imageData.ref) {
        throw new Error('Image is required');
      }

      const categoryData = {
        ...data,
        ...imageData,
        createdBy: user?.id as string,
      };

      if (categoryModal.categorySelected) {
        const res = await updateCategory(
          categoryModal.categorySelected._id,
          categoryData
        );

        if (res instanceof AxiosError) {
          throw new Error(
            res.response?.data.message || 'Error in Edit category'
          );
        }

        toast.success('Category Edited successfully');
      } else {
        const res = await createCategory(categoryData);

        if (res instanceof AxiosError) {
          throw new Error(
            res.response?.data.message || 'Error in create category'
          );
        }

        toast.success('Category created successfully');
      }

      fetchCategories();

      setLoading(false);

      closeModal();
    } catch (error) {
      console.log('Error in create category:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {(categoryModal.open && categoryModal.type === 'create') ||
      categoryModal.type === 'edit' ? (
        <ModalBase
          open={
            (categoryModal.open && categoryModal.type === 'create') ||
            categoryModal.type === 'edit'
          }
          closeModal={closeModal}
          title={
            categoryModal.type === 'create'
              ? 'Create Category'
              : 'Edit Category'
          }
          successAction={handleSubmit(onSubmit)}
          successText='Create'
          loading={loading}
        >
          {/*body*/}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='relative p-6 flex-auto'
          >
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Name
              </label>
              <input
                id='name'
                type='text'
                {...register('name', { required: 'Name is required' })}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              {errors.name && (
                <p className='text-red-500 text-xs italic'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                {...register('description', {
                  required: 'Description is required',
                })}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              {errors.description && (
                <p className='text-red-500 text-xs italic'>
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='Image'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Image
              </label>
              <DropzoneFrontpage
                setFiles={setFiles}
                externalPreview={
                  categoryModal.categorySelected &&
                  categoryModal.categorySelected.imageUrl
                }
              />
            </div>
            {/*footer*/}
          </form>
        </ModalBase>
      ) : null}
    </>
  );
};

export default ModalCreateCategory;
