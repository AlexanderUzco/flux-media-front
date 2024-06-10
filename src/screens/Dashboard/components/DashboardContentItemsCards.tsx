import { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import SectionItemsCategory from '@components/SectionItemsCategory';

const DashboardContentItemsCards = () => {
  const { contentItems, loadingContentItems } = useContext(DashboardContext);
  return (
    <SectionItemsCategory
      contentItems={contentItems}
      loading={loadingContentItems}
    />
  );
};

export default DashboardContentItemsCards;
