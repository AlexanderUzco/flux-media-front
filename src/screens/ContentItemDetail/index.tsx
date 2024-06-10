import ItemDetailContainer from './components/ItemDetailContainer';
import ModalDeleteContentItem from './components/modal/ModalDeleteContentItem';
import ModalUpdateItem from './components/modal/ModalUpdateItem';
import { ContentItemDetailProvider } from './context/ContentItemDetailContext';

const ContentItemDetail = () => {
  return (
    <ContentItemDetailProvider>
      <ItemDetailContainer />
      <ModalDeleteContentItem />
      <ModalUpdateItem />
    </ContentItemDetailProvider>
  );
};

export default ContentItemDetail;
