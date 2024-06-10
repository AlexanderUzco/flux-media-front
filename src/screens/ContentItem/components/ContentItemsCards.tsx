import { useContext } from 'react';
import { ContentItemContext } from '../context/ContentItemContext';
import SectionItemsCategory from '@components/SectionItemsCategory';

const ContentItemsCards = () => {
  const { contentItems, loadingContentItem } = useContext(ContentItemContext);
  return (
    <div className='mt-28'>
      <SectionItemsCategory
        contentItems={contentItems}
        loading={loadingContentItem}
      />
    </div>
  );
};

export default ContentItemsCards;
