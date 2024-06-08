import { useContext, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ModalBase from '../../../../components/ModalBase';
import { TopicContext } from '../../context/TopicContext';
import { AuthContext } from '../../../../contexts/authContext';
import { toast } from 'react-toastify';
import {
  createTopic,
  editTopic,
} from '../../../../api/fluxMediaService/services/topic';
import { AxiosError } from 'axios';

type FormValues = {
  name: string;
  category: string;
  textAllowed: boolean;
  imageAllowed: boolean;
  videoAllowed: boolean;
};

const ModalCreateTopic = () => {
  const { handleTopicModal, fetchTopics, topicModal, categories } =
    useContext(TopicContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (topicModal.topicSelected) {
      setValue('name', topicModal.topicSelected.name);
      setValue('category', topicModal.topicSelected.categoryID._id || '');
      setValue('textAllowed', topicModal.topicSelected.allowContent.text);
      setValue('imageAllowed', topicModal.topicSelected.allowContent.image);
      setValue('videoAllowed', topicModal.topicSelected.allowContent.video);
      setSelectedColor(topicModal.topicSelected.color);
    }

    return () => {
      setValue('name', '');
      setValue('category', '');
      setValue('textAllowed', false);
      setValue('imageAllowed', false);
      setValue('videoAllowed', false);
    };
  }, [topicModal.topicSelected, setValue]);

  const closeModal = () => {
    handleTopicModal({
      type: null,
      open: false,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

      const topicData = {
        name: data.name,
        categoryID: data.category,
        allowContent: {
          text: data.textAllowed,
          image: data.imageAllowed,
          video: data.videoAllowed,
        },
        color: selectedColor,
        createdBy: user?.id as string,
      };

      if (topicModal.topicSelected) {
        const res = await editTopic(topicModal.topicSelected._id, topicData);

        if (res instanceof AxiosError) {
          throw new Error(res.response?.data.message || 'Error in edit topic');
        }

        toast.success('Topic edited successfully');
      } else {
        const res = await createTopic(topicData);

        if (res instanceof AxiosError) {
          throw new Error(
            res.response?.data.message || 'Error in create topic'
          );
        }

        toast.success('Topic created successfully');
      }

      fetchTopics();

      setLoading(false);

      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      console.log('Error in create topic:', error);
      setLoading(false);
    }
  };

  return (
    <>
      {(topicModal.open && topicModal.type === 'create') ||
      topicModal.type === 'edit' ? (
        <ModalBase
          open={
            (topicModal.open && topicModal.type === 'create') ||
            topicModal.type === 'edit'
          }
          closeModal={closeModal}
          title={topicModal.type === 'create' ? 'Create Topic' : 'Edit Topic'}
          successAction={handleSubmit(onSubmit)}
          successText={topicModal.type === 'create' ? 'Create' : 'Edit'}
          loading={loading}
        >
          <form className='relative p-6 flex-auto'>
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
                htmlFor='category'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Category
              </label>
              <select
                id='category'
                {...register('category', {
                  required: 'Category is required',
                })}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              >
                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className='text-red-500 text-xs italic'>
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Allowed Content
              </label>
              <div className='flex items-center space-x-4'>
                <input
                  type='checkbox'
                  id='textAllowed'
                  {...register('textAllowed')}
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <label
                  htmlFor='textAllowed'
                  className='text-gray-700'
                >
                  Text
                </label>
                <input
                  type='checkbox'
                  id='imageAllowed'
                  {...register('imageAllowed')}
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <label
                  htmlFor='imageAllowed'
                  className='text-gray-700'
                >
                  Image
                </label>
                <input
                  type='checkbox'
                  id='videoAllowed'
                  {...register('videoAllowed')}
                  className='form-checkbox h-5 w-5 text-blue-600'
                />
                <label
                  htmlFor='videoAllowed'
                  className='text-gray-700'
                >
                  Video
                </label>
              </div>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Color
              </label>
              <div className='flex items-center space-x-4'>
                <input
                  type='color'
                  value={selectedColor}
                  onChange={handleChange}
                  className='w-10 h-10 border border-gray-300 rounded'
                />
                <span className='text-gray-700'>{selectedColor}</span>
              </div>
            </div>
          </form>
        </ModalBase>
      ) : null}
    </>
  );
};

export default ModalCreateTopic;
