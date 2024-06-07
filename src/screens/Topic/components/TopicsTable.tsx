import { useContext } from 'react';
import { TopicContext } from '../context/TopicContext';
import { TTopic } from '../types'; // Asegúrate de importar el tipo TTopic desde el lugar correcto
import {
  PencilIcon,
  TrashIcon,
  ChatBubbleBottomCenterIcon,
  PhotoIcon,
  VideoCameraIcon,
} from '@heroicons/react/16/solid';

const TopicsTable: React.FC = () => {
  const { topics, handleTopicModal } = useContext(TopicContext);

  return (
    <table className='min-w-full divide-y divide-gray-200 mt-24'>
      <thead className='bg-gray-50'>
        <tr>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Name
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Color
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Category
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Allow Content
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Created By
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {topics.map((topic: TTopic) => (
          <tr key={topic._id}>
            <td className='px-6 py-4 whitespace-nowrap'>
              <div className='text-sm font-medium text-gray-900'>
                {topic.name}
              </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <div className='text-sm font-medium text-gray-900'>
                <input
                  type='color'
                  value={topic.color}
                  disabled
                />
              </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <div
                className={`text-sm font-medium ${
                  topic.categoryID?.name ? 'text-gray-900' : 'text-red-400'
                }`}
              >
                {topic.categoryID?.name || '(Category Deleted)'}
              </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <div className='text-sm font-medium text-gray-900 flex'>
                {topic.allowContent.text && (
                  <ChatBubbleBottomCenterIcon className='h-5 w-5 text-green-500' />
                )}
                {topic.allowContent.image && (
                  <PhotoIcon className='h-5 w-5 text-green-500' />
                )}
                {topic.allowContent.video && (
                  <VideoCameraIcon className='h-5 w-5 text-green-500' />
                )}
              </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <div className='text-sm font-medium text-gray-900'>
                {topic.createdBy.username}
              </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center aling-center'>
              <PencilIcon
                className='h-5 w-5 text-blue-500 cursor-pointer mr-2'
                onClick={() =>
                  handleTopicModal({
                    type: 'edit',
                    open: true,
                    topicSelected: topic,
                  })
                }
              />
              <TrashIcon
                className='h-5 w-5 text-red-500 cursor-pointer'
                onClick={() =>
                  handleTopicModal({
                    type: 'delete',
                    open: true,
                    topicSelected: topic,
                  })
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopicsTable;
