import { TItem } from '@screens/ContentItem/types';
import { useMemo } from 'react';

interface IUseFilterContentItems {
  contentItems: TItem[];
  filter: string;
}

const useFilterContentItems = ({
  contentItems,
  filter,
}: IUseFilterContentItems) => {
  const filteredContentItems = useMemo(() => {
    return contentItems.filter((item) => {
      const title = item.title.toLowerCase();
      const category = item.topicID.categoryID.name.toLowerCase();
      const topic = item.topicID.name.toLowerCase();
      const search = filter.toLowerCase();
      return (
        title.includes(search) ||
        category.includes(search) ||
        topic.includes(search)
      );
    });
  }, [contentItems, filter]);

  return filteredContentItems;
};

export default useFilterContentItems;
