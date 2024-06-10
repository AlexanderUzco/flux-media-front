import { ContentItemContext } from '@screens/ContentItem/context/ContentItemContext';
import ModalCreateContentItem from '@components/modals/ModalCreateContentItem';
import { useContext } from 'react';

const ModalCreateItem = () => {
  const {
    handleContentItemModal,
    fetchContentItems,
    contentItemModal,
    topics,
  } = useContext(ContentItemContext);
  return (
    <ModalCreateContentItem
      handleOpen={contentItemModal}
      topicsByCategory={topics}
      handleContentItemModal={handleContentItemModal}
      fetchData={fetchContentItems}
    />
  );
};

export default ModalCreateItem;
