import Spinner from '@components/Spinner';
import { FC } from 'react';

interface Stat {
  title: string;
  value: string;
}

interface StatsProps {
  stats: Stat[];
  loading: boolean;
}

const StatsComponent: FC<StatsProps> = ({ stats, loading }) => {
  return (
    <div className='max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8'>
      {loading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='bg-white rounded-lg text-left overflow-hidden shadow transform transition-all'
            >
              <div className='bg-white p-5'>
                <div className='sm:flex sm:items-start'>
                  <div className='text-center sm:mt-0 sm:ml-2 sm:text-left'>
                    <h3 className='text-sm leading-6 font-medium text-gray-400'>
                      {stat.title}
                    </h3>
                    <p className='text-3xl font-bold text-black'>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsComponent;
