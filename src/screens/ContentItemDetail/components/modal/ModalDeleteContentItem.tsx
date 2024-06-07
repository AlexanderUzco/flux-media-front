import { useContext, useState } from 'react';
import ModalBase from '../../../../components/ModalBase';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ContentItemDetailContext } from '../../context/ContentItemDetailContext';
import { deleteContentItem } from '../../../../api/fluxMediaService/services/contentItem';
import { useNavigate } from 'react-router';

const ModalDeleteContentItem = () => {
  const { contentItem, itemDetailModal, handleItemDetailModal } = useContext(
    ContentItemDetailContext
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    handleItemDetailModal({
      type: null,
      open: false,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!itemDetailModal.contentItemID) {
        throw new Error('Item not selected');
      }

      const res = await deleteContentItem(
        itemDetailModal.contentItemID as string
      );

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setLoading(false);
      closeModal();
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <ModalBase
      open={itemDetailModal.open && itemDetailModal.type === 'delete'}
      closeModal={closeModal}
      title={`Delete Item ${contentItem?.title}`}
      successAction={handleSubmit}
      successText={`Delete`}
      loading={loading}
    >
      <div className='flex flex-col gap-4'>
        <p className='text-lg ml-5 my-5'>
          Are you sure you want to delete this Item?
        </p>
      </div>
    </ModalBase>
  );
};

export default ModalDeleteContentItem;
