import { TItem } from '@screens/ContentItem/types';
import _ from 'lodash';

const groupedByCategory = (data: TItem[]) => {
  const groupedByCategory = _.groupBy(data, 'topicID.categoryID.name');

  const formattedData = Object.entries(groupedByCategory).map(
    ([category, items]) => ({
      category,
      imageUrl: items[0]?.topicID.categoryID.imageUrl || '',
      items,
    })
  );

  return formattedData;
};

export default groupedByCategory;
