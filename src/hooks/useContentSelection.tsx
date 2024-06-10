import { useState, useEffect } from 'react';
import { TTopicByCategory } from '@Topic/types';

const useContentSelection = (topics: TTopicByCategory[]) => {
  const [categorySelected, setCategorySelected] =
    useState<TTopicByCategory | null>(null);
  const [topicSelected, setTopicSelected] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedContentType, setSelectedContentType] = useState<string>('');

  useEffect(() => {
    if (topics.length > 0) {
      const firstCategory = topics[0];
      const firstTopic = getFirstTopic(firstCategory);
      setCategorySelected(firstCategory);
      setTopicSelected(firstTopic.allowContent);
      setSelectedContentType(getFirstContentType(firstTopic.allowContent));
    }
  }, [topics]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = topics.find(
      (category) => category.category === e.target.value
    );
    if (selectedCategory) {
      const firstTopic = getFirstTopic(selectedCategory);
      setCategorySelected(selectedCategory);
      setTopicSelected(firstTopic.allowContent);
      setSelectedContentType(getFirstContentType(firstTopic.allowContent));
    }
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopic = categorySelected?.topics.find(
      (topic) => topic._id === e.target.value
    );
    if (selectedTopic) {
      setTopicSelected(selectedTopic.allowContent);
      setSelectedContentType(getFirstContentType(selectedTopic.allowContent));
    }
  };

  const handleContentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedContentType(e.target.value);

  const getFirstTopic = (category: TTopicByCategory) => {
    return category.topics.length > 0
      ? category.topics[0]
      : { allowContent: {} };
  };

  const getFirstContentType = (allowContent: { [key: string]: boolean }) => {
    return (
      Object.keys(allowContent).find((key) => allowContent[key] === true) || ''
    );
  };

  return {
    categorySelected,
    topicSelected,
    selectedContentType,
    handleCategoryChange,
    handleTopicChange,
    handleContentTypeChange,
  };
};

export default useContentSelection;
