import { useContext, useState } from 'react';
import ModalBase from '../../../../components/ModalBase';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { TopicContext } from '../../context/TopicContext';
import { deleteTopic } from '../../../../api/fluxMediaService/services/topic';

const ModalDeleteTopic = () => {
  const { topicModal, handleTopicModal, fetchTopics } =
    useContext(TopicContext);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    handleTopicModal({
      type: null,
      open: false,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!topicModal.topicSelected) {
        throw new Error('Category not selected');
      }

      const res = await deleteTopic(topicModal.topicSelected?._id as string);

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      fetchTopics();
      setLoading(false);
      closeModal();
      toast.success('Topic deleted successfully');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <ModalBase
      open={topicModal.open && topicModal.type === 'delete'}
      closeModal={closeModal}
      title={`Delete Topic ${topicModal.topicSelected?.name}`}
      successAction={handleSubmit}
      successText={`Delete`}
      loading={loading}
    >
      <div className='flex flex-col gap-4'>
        <p className='text-lg ml-5 my-5'>
          Are you sure you want to delete this topic?
        </p>
      </div>
    </ModalBase>
  );
};

export default ModalDeleteTopic;
