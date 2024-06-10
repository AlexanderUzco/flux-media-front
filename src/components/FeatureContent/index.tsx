import React from 'react';
import FeatureCard from './FeatureCard';
import { TItem } from '../../screens/ContentItem/types';
import FeatureSuspenseContent from '../FeatureSuspenseContent';

interface FeatureContentProps {
  features: TItem[];
  loading: boolean;
}

const FeatureContent: React.FC<FeatureContentProps> = ({
  features,
  loading,
}) => {
  return (
    <div className='flex justify-center mt-24 min-w-full divide-y divide-gray-200 '>
      <div className='flex flex-wrap justify-center max-w-7xl w-full'>
        {loading ? (
          <FeatureSuspenseContent numCards={3} />
        ) : features.length > 0 ? (
          features.map((feature, index) => (
            <FeatureCard
              key={index}
              contentItemID={feature._id}
              title={feature.title}
              topic={feature.topicID?.name || 'No Topic'}
              topicColor={feature.topicID?.color || '#252222'}
              content={feature.content}
              createdBy={feature.createdBy.username}
            />
          ))
        ) : (
          <div className='text-center text-2xl font-bold text-gray-500 mt-10'>
            No features found
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureContent;
