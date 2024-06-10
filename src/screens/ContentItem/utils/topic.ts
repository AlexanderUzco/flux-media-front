import { groupBy } from 'lodash';
import { TTopic, TTopicByCategory } from '../../Topic/types';

const groupByCategory = (topics: TTopic[]): TTopicByCategory[] => {
  const grouped = groupBy(topics, (topic) => topic.categoryID.name);
  return Object.keys(grouped).map((category) => ({
    category,
    topics: grouped[category],
  }));
};

export { groupByCategory };
