import { ContentItemDetailContext } from '@screens/ContentItemDetail/context/ContentItemDetailContext';
import ItemDetailContent from './ItemDetailContent';
import ItemDetailProperty from './ItemDetailProperty';
import { useContext } from 'react';
import Spinner from '@components/Spinner';

const ItemDetailContainer = () => {
  const { loadingContentItem } = useContext(ContentItemDetailContext);

  return (
    <div className='overflow-y-auto h-full flex flex-col'>
      {loadingContentItem ? (
        <Spinner />
      ) : (
        <>
          <ItemDetailProperty />
          <ItemDetailContent />
        </>
      )}
    </div>
  );
};

export default ItemDetailContainer;
