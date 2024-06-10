import ModalCreateContentItem from '@components/modals/ModalCreateContentItem';
import { ContentItemDetailContext } from '@screens/ContentItemDetail/context/ContentItemDetailContext';
import { useContext } from 'react';

const ModalUpdateItem = () => {
  const {
    itemDetailModal,
    handleItemDetailModal,
    fetchContentItem,
    contentItem,
    topics,
  } = useContext(ContentItemDetailContext);

  return (
    <ModalCreateContentItem
      handleOpen={itemDetailModal}
      topicsByCategory={topics}
      handleContentItemModal={handleItemDetailModal}
      fetchData={() => fetchContentItem(contentItem._id)}
      item={contentItem}
    />
  );
};

export default ModalUpdateItem;
