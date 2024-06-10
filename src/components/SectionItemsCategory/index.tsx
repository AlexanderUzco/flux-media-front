import { useMemo } from 'react';
import { TItem } from '@screens/ContentItem/types';
import groupedByCategory from '@utils/category';
import FeatureContent from '@components/FeatureContent';

interface ISectionItemsCategoryProps {
  contentItems: TItem[];
  loading: boolean;
}

const SectionItemsCategory = ({
  contentItems,
  loading,
}: ISectionItemsCategoryProps) => {
  const groupByCategoryData = useMemo(() => {
    return groupedByCategory(contentItems);
  }, [contentItems]);

  return (
    <>
      {groupByCategoryData.map((category) => (
        <section className='mt-10'>
          <div
            className='relative bg-cover bg-center h-40 md:h-64 w-[90%] mx-auto rounded-lg overflow-hidden shadow-lg'
            style={{ backgroundImage: `url(${category.imageUrl})` }}
          >
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <h1 className='text-white text-3xl md:text-5xl font-bold text-center'>
                {category.category}
              </h1>
            </div>
          </div>
          <FeatureContent
            features={category.items}
            loading={loading}
          />
        </section>
      ))}
    </>
  );
};

export default SectionItemsCategory;
