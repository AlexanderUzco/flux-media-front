import { useContext } from 'react';
import Tag from '../../components/Tag';
import { AuthContext } from '../../contexts/authContext';
import ContentItemsCards from './components/ContentItemsCards';
import CreateContentItemButton from './components/CreateContentItemButton';
import { ContentItemProvider } from './context/ContentItemContext';
import ModalCreateItem from './components/modals/ModalCreateItem';

const ContentItem: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <ContentItemProvider>
      <div className='relative overflow-hidden flex justify-center'>
        <div className='fixed top-20 z-10 bg-white shadow-md py-4 px-6 xl:w-[80%] md:w-[70%] w-[90%]'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <h2 className='text-2xl font-bold mr-2'>Content Media</h2>
              {user && user.role === 'ADMIN' && (
                <Tag
                  text='Admin'
                  color='#00ff6e'
                />
              )}
            </div>
            <div className='flex justify-between items-center'>
              <CreateContentItemButton />
            </div>
          </div>
        </div>
      </div>
      <ContentItemsCards />
      <ModalCreateItem />
    </ContentItemProvider>
  );
};

export default ContentItem;
