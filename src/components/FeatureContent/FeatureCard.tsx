import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid';

interface FeatureCardProps {
  title: string;
  description: string;
  linkText: string;
  topic: string;
  topicColor: string;
  principalImage?: string;
  contentItemID: string; // Nuevo prop para el ID del item
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  topic,
  topicColor,
  principalImage,
  contentItemID,
}) => {
  return (
    <Link
      to={`/contentItem/${contentItemID}`}
      className='p-4 w-80 h-96'
    >
      {' '}
      {/* Enlace a la ruta /item con el parámetro itemID */}
      <div className='flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col'>
        <div className='flex items-center mb-3'>
          <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0'>
            <ArrowTopRightOnSquareIcon className='w-5 h-5' />
          </div>
          <h2 className='text-white dark:text-white text-lg font-medium overflow-hidden truncate'>
            {title}
          </h2>
        </div>
        <div
          className={`inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-2`}
          style={{
            backgroundColor: 'white',
            border: `5px solid ${topicColor}`,
            color: topicColor,
          }}
        >
          {topic}
        </div>

        <div className='flex flex-col justify-between flex-grow'>
          <p className='leading-relaxed text-base text-white dark:text-gray-300 overflow-hidden overflow-ellipsis h-32'>
            {description}
          </p>
          {principalImage && (
            <div className='mt-2'>
              <img
                src={principalImage}
                alt='Small'
                className='w-20 h-20 rounded'
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
