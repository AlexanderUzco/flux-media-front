import { DashboardProvider } from './context/DashboardContext';
import DashboardContentItemsCards from './components/DashboardContentItemsCards';
import DashboardSummary from './components/DashboardSummary';

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className='relative overflow-hidden flex justify-center flex justify-center'>
        <div className='fixed top-20 z-10 bg-white shadow-md py-4 px-6 xl:w-[80%] md:w-[70%] w-[90%]'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='text-2xl font-bold'>Dashboard</h2>
          </div>
        </div>
      </div>
      <DashboardSummary />
      <DashboardContentItemsCards />
    </DashboardProvider>
  );
};

export default Dashboard;
