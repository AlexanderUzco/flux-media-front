import StatsValues from '@components/StatsValues';
import { DashboardContext } from '@screens/Dashboard/context/DashboardContext';
import { useContext, useMemo } from 'react';

const DashboardSummary = () => {
  const { loadingContentItemSummary, contentItemSummary } =
    useContext(DashboardContext);

  const formattedStats = useMemo(() => {
    return [
      {
        title: 'Content Items',
        value: contentItemSummary?.contentItems.toString(),
      },
      { title: 'Images', value: contentItemSummary.images.toString() },
      { title: 'Videos', value: contentItemSummary.videos.toString() },
      { title: 'Text', value: contentItemSummary.text.toString() },
    ];
  }, [contentItemSummary]);
  return (
    <div className='mt-20'>
      <StatsValues
        stats={formattedStats}
        loading={loadingContentItemSummary}
      />
    </div>
  );
};

export default DashboardSummary;
