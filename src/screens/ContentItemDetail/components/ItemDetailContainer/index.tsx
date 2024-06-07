import ItemDetailContent from './ItemDetailContent';
import ItemDetailProperty from './ItemDetailProperty';

const ItemDetailContainer = () => {
  return (
    <div className='overflow-y-auto h-full flex flex-col'>
      <ItemDetailProperty />
      <ItemDetailContent />
    </div>
  );
};

export default ItemDetailContainer;
