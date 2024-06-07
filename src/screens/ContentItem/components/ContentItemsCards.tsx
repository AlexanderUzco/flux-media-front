import { useContext } from 'react';
import FeatureContent from '../../../components/FeatureContent';
import { ContentItemContext } from '../context/ContentItemContext';

const ContentItemsCards = () => {
  const { contentItems } = useContext(ContentItemContext);
  return <FeatureContent features={contentItems} />;
};

export default ContentItemsCards;
