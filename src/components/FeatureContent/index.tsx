import React from 'react';
import FeatureCard from './FeatureCard';
import { TItem } from '../../screens/ContentItem/types';

interface FeatureContentProps {
  features: TItem[];
}

const FeatureContent: React.FC<FeatureContentProps> = ({ features }) => {
  return (
    <div className='flex justify-center mt-24 min-w-full divide-y divide-gray-200 '>
      <div className='flex flex-wrap justify-center max-w-7xl w-full'>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            contentItemID={feature._id}
            title={feature.title}
            description={feature.content.text}
            topic={feature.topicID?.name || 'No Topic'}
            topicColor={feature.topicID?.color || '#252222'}
            principalImage={
              feature.content.images[0] ? feature.content.images[0].url : ''
            }
            linkText={''}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureContent;
