import { TopicProvider } from './context/TopicContext';
import TopicsTable from './components/TopicsTable';
import CreateTopicButton from './components/CreateTopicButton';
import ModalCreateTopic from './components/modals/ModalCreateTopic';
import ModalDeleteTopic from './components/modals/ModalDeleteTopic';

const Topic: React.FC = () => {
  return (
    <TopicProvider>
      <div className='relative h-screen overflow-hidden'>
        <div className='fixed z-10 bg-white shadow-md py-4 px-6 w-[80%]'>
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
