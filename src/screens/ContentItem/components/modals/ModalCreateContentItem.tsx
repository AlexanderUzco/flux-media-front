import { useContext, useState } from 'react';
import { ContentItemContext } from '@ContentItem/context/ContentItemContext';
import { AuthContext } from '@contexts/authContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import ModalBase from '@components/ModalBase';
import AddYoutubeLinks from '@components/AddYoutubeLinks';
import ImageDropzone, { ImagePreview } from '@components/ImagesDropzone';
import { uploadFile } from '../../../../firebase/storage';
import { TCreateContentItem } from '@api/fluxMediaService/services/types';
import { AxiosError } from 'axios';
import { createContentItem } from '@api/fluxMediaService/services/contentItem';
import { toast } from 'react-toastify';
import { TImageData } from '@ContentItem/types';
import useContentSelection from '@hooks/useContentSelection';

type FormValues = {
  title: string;
  description: string;
  topic: string;
  category: string;
};

const ModalCreateContentItem = () => {
  const {
    handleContentItemModal,
    fetchContentItems,
    contentItemModal,
    topics,
  } = useContext(ContentItemContext);
  const { user } = useContext(AuthContext);
  const [urlVideos, setUrlVideos] = useState<string[]>(['']);
  const [imagesItem, setImagesItem] = useState<ImagePreview[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    categorySelected,
    topicSelected,
    selectedContentType,
    handleCategoryChange,
    handleTopicChange,
    handleContentTypeChange,
  } = useContentSelection(topics);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const closeModal = () => {
    handleContentItemModal({
      type: null,
      open: false,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

    try {
      const imagesUploaded: TImageData[] = [];

      if (selectedContentType == 'image' && imagesItem.length === 0)
        throw new Error('Images are required');

      if (selectedContentType == 'image') {
        await Promise.all(
          imagesItem.map(async (image) => {
            const imageItem = await uploadFile({
              imageRef: `user/${user?.id}/file/${uuidv4() + image.file.name}`,
              file: image.file,
            });

            if (imageItem instanceof Error) {
              console.log('Error in create content item:', imageItem);
              return;
            }

            if (imageItem.url && imageItem.ref) {
              imagesUploaded.push({
                url: imageItem.url,
                ref: imageItem.ref,
              });
            }
          })
        );
      }

      const contentItemData: TCreateContentItem = {
        title: data.title,
        topicID: data.topic,
        createdBy: user?.id as string,
        content: null,
      };

      if (selectedContentType === 'text') {
        contentItemData.content = {
          type: 'text',
          data: data.description,
        };
      }

      if (selectedContentType === 'video') {
        contentItemData.content = {
          type: 'video',
          data: urlVideos,
        };
      }

      if (imagesUploaded.length > 0) {
        contentItemData.content = {
          type: 'image',
          data: imagesUploaded,
        };
      }

      const resContentItem = await createContentItem(contentItemData);

      if (resContentItem instanceof AxiosError) {
        throw new Error(
          resContentItem.response?.data.message ||
            'Error in create Content Item'
        );
      }

      fetchContentItems();

      toast.success('Item Media created successfully');

      setLoading(false);

      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {contentItemModal.open && contentItemModal.type === 'create' ? (
        <ModalBase
          open={contentItemModal.open}
          closeModal={closeModal}
          title='Create Content Item'
          successAction={handleSubmit(onSubmit)}
          successText='Create'
          loading={loading}
        >
          {/*body*/}
          <form className='relative p-6 flex-auto'>
            <div className='mb-4'>
              <label
                htmlFor='title'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Title
              </label>
              <input
                id='title'
                type='text'
                {...register('title', { required: 'Title is required' })}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              {errors.title && (
                <p className='text-red-500 text-xs italic'>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Select for category */}
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
                onChange={handleCategoryChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              >
                {topics.map((category) => (
                  <option
                    key={category.category}
                    value={category.category}
                  >
                    {category.category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className='text-red-500 text-xs italic'>
                  {errors.category.message}
                </p>
              )}
            </div>
            {/* Select for topic */}
            {categorySelected && (
              <div className='mb-4'>
                <label
                  htmlFor='topic'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Topic
                </label>
                <select
                  id='topic'
                  {...register('topic', {
                    required: 'Category is required',
                  })}
                  onChange={handleTopicChange}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                >
                  {categorySelected.topics.map((topic) => (
                    <option
                      key={topic._id}
                      value={topic._id}
                    >
                      {topic.name}
                    </option>
                  ))}
                </select>
                {errors.topic && (
                  <p className='text-red-500 text-xs italic'>
                    {errors.topic.message}
                  </p>
                )}
              </div>
            )}

            {/* Select for content type */}
            {topicSelected && (
              <div className='mb-4'>
                <label
                  htmlFor='contentType'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Content Type
                </label>
                <select
                  id='contentType'
                  value={selectedContentType}
                  onChange={(e) => handleContentTypeChange(e)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                >
                  {Object.keys(topicSelected).map((contentType) => {
                    if (topicSelected[contentType] == false) return null;

                    return (
                      <option
                        key={contentType}
                        value={contentType}
                      >
                        {contentType}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {selectedContentType === 'text' && (
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
            )}

            {selectedContentType === 'image' && (
              <div className='mb-4'>
                <label
                  htmlFor='images'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Images
                </label>
                <ImageDropzone
                  setImages={setImagesItem}
                  images={imagesItem}
                />
              </div>
            )}

            {selectedContentType === 'video' && (
              <AddYoutubeLinks
                setUrlVideos={setUrlVideos}
                urlVideos={urlVideos}
              />
            )}
            {/*footer*/}
          </form>
        </ModalBase>
      ) : null}
    </>
  );
};

export default ModalCreateContentItem;
