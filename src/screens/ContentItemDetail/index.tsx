import ItemDetailContainer from './components/ItemDetailContainer';
import ModalDeleteContentItem from './components/modal/ModalDeleteContentItem';
import { ContentItemDetailProvider } from './context/ContentItemDetailContext';

const ContentItemDetail = () => {
  return (
    <ContentItemDetailProvider>
      <ItemDetailContainer />
      <ModalDeleteContentItem />
    </ContentItemDetailProvider>
  );
};

export default ContentItemDetail;
