import { TopicProvider } from './context/TopicContext';
import TopicsTable from './components/TopicsTable';
import CreateTopicButton from './components/CreateTopicButton';
import ModalCreateTopic from './components/modals/ModalCreateTopic';
import ModalDeleteTopic from './components/modals/ModalDeleteTopic';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router';

const Topic: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigator = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.role !== 'ADMIN') {
      navigator('/dashboard');
    }
  }, [isAuthenticated, user, navigator]);

  return (
    <TopicProvider>
      <div className='relative h-screen overflow-hidde flex justify-center'>
        <div className='fixed top-20 z-10 bg-white shadow-md py-4 px-6 xl:w-[80%] md:w-[70%] w-[90%]'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='text-2xl font-bold'>Topics</h2>
            <div className='flex justify-between items-center'>
              <CreateTopicButton />
            </div>
          </div>
        </div>

        <TopicsTable />
      </div>

      <ModalCreateTopic />
      <ModalDeleteTopic />
    </TopicProvider>
  );
};

export default Topic;
