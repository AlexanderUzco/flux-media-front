import { FC } from 'react';

interface FeatureSuspenseContentProps {
  numCards?: number;
}

const FeatureSuspenseContent: FC<FeatureSuspenseContentProps> = ({
  numCards = 1,
}) => {
  return (
    <div className='flex justify-center mt-24 min-w-full divide-y divide-gray-200'>
      <div className='flex flex-wrap justify-center max-w-7xl w-full'>
        {Array.from({ length: numCards }).map((_, index) => (
          <div
            key={index}
            className='p-4 w-[352px] h-[376px]'
          >
            <div className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl mx-auto shadow-md animate-pulse h-full w-full p-8'>
              <div className='absolute inset-0 bg-gray-300'></div>
              <div className='z-10 mt-3 h-8 bg-gray-500 w-3/4'></div>
              <div className='z-10 inline-block bg-gray-400 rounded-full px-2 py-1 text-xs font-semibold mr-2 mb-2 w-1/3'></div>
              <div className='z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-400 h-4 mt-2 w-1/2'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSuspenseContent;
