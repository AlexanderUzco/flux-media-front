import { useContext, useMemo } from 'react';
import { ContentItemDetailContext } from '../../../context/ContentItemDetailContext';
import ItemDetailContentText from './ItemDetailContentText';
import ItemDetailContentImage from './ItemDetailContentImage';
import ItemDetailContentVideos from './ItemDetailContentVideos';

const ItemDetailContent = () => {
  const { contentItem } = useContext(ContentItemDetailContext);

  const allowContent = useMemo(() => {
    if (!contentItem || !contentItem.topicID) {
      return null;
    }
    return contentItem.topicID.allowContent;
  }, [contentItem]);

  if (!allowContent) {
    return null;
  }

  return (
    <div className='p-4'>
      {allowContent.text && (
        <ItemDetailContentText text={contentItem?.content.text || ''} />
      )}
      {allowContent.image && (
        <ItemDetailContentImage images={contentItem?.content.images || []} />
      )}
      {allowContent.video && (
        <ItemDetailContentVideos videos={contentItem?.content.videos || []} />
      )}
    </div>
  );
};

export default ItemDetailContent;
