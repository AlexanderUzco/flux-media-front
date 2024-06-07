import { useContext, useMemo, useState } from 'react';
import { ContentItemContext } from '../../context/ContentItemContext';
import { AuthContext } from '../../../../contexts/authContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import ModalBase from '../../../../components/ModalBase';
import { TAllotment, TTopic } from '../../../Topic/types';
import AddYoutubeLinks from '../../../../components/AddYoutubeLinks';
import ImageDropzone, {
  ImagePreview,
} from '../../../../components/ImagesDropzone';
import { uploadFile } from '../../../../firebase/storage';
import {
  TCreateContentItem,
  TCreateFileItem,
  TFileElementCreated,
} from '../../../../api/fluxMediaService/services/types';
import { createFileItems } from '../../../../api/fluxMediaService/services/filesItems';
import { AxiosError } from 'axios';
import { createContentItem } from '../../../../api/fluxMediaService/services/contentItem';
import { toast } from 'react-toastify';

type FormValues = {
  title: string;
  description: string;
  topic: string;
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
  const [topicSelected, setTopicSelected] = useState<TAllotment | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { image, text, video } = useMemo(() => {
    if (!topicSelected) {
      const firstTopic = topics[0];

      if (!firstTopic)
        return { image: false, text: false, document: false, video: false };

      setTopicSelected(firstTopic.allowContent);
      return firstTopic.allowContent;
    }

    return topicSelected;
  }, [topicSelected, topics]);

  const closeModal = () => {
    handleContentItemModal({
      type: null,
      open: false,
    });
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = topics.find(
      (topic: TTopic) => topic._id === e.target.value
    );
    if (selectedTopic) {
      setTopicSelected(selectedTopic.allowContent);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

    try {
      const imagesUploaded: TFileElementCreated[] = [];

      if (imagesItem.length > 0) {
        const imagesItemData: TCreateFileItem[] = [];

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
              imagesItemData.push({
                url: imageItem.url,
                ref: imageItem.ref,
                type: 'image',
                name: image.file.name,
                createdBy: user?.id as string,
              });
            }
          })
        );

        if (imagesItemData.length > 0) {
          const res = await createFileItems(imagesItemData);

          if (res instanceof AxiosError) {
            throw new Error(
              res.response?.data.message || 'Error in create Images Data'
            );
          }

          imagesUploaded.push(...(res.data.filesItem as TFileElementCreated[]));
        }
      }

      const contentItemData: TCreateContentItem = {
        title: data.title,
        topicID: data.topic,
        createdBy: user?.id as string,
        content: {},
      };

      if (text) {
        contentItemData.content.text = data.description;
      }

      if (video) {
        contentItemData.content.videos = urlVideos;
      }

      if (imagesUploaded.length > 0) {
        contentItemData.content.images = imagesUploaded.map(
          (image) => image._id
        );
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
        console.log('Error in create content item:', error);
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
                {topics.map((topic) => (
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

            {text && (
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

            {image && (
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

            {video && (
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
