import ContentItemsCards from './components/ContentItemsCards';
import CreateContentItemButton from './components/CreateContentItemButton';
import ModalCreateContentItem from './components/modals/ModalCreateContentItem';
import { ContentItemProvider } from './context/ContentItemContext';

const ContentItem: React.FC = () => {
  return (
    <ContentItemProvider>
      <div className='relative overflow-hidden'>
        <div className='fixed z-10 bg-white shadow-md py-4 px-6 w-[80%]'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='text-2xl font-bold'>Content Media</h2>
            <div className='flex justify-between items-center'>
              <CreateContentItemButton />
            </div>
          </div>
        </div>
      </div>
      <ContentItemsCards />
      <ModalCreateContentItem />
    </ContentItemProvider>
  );
};

export default ContentItem;
