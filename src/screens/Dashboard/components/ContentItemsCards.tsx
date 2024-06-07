import { useContext } from 'react';
import FeatureContent from '../../../components/FeatureContent';
import { DashboardContext } from '../context/DashboardContext';

const ContentItemsCards = () => {
  const { contentItems } = useContext(DashboardContext);
  return <FeatureContent features={contentItems} />;
};

export default ContentItemsCards;
