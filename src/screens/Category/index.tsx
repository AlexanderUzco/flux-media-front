import CategoriesTable from './components/CategoriesTable';
import { CategoryProvider } from './context/CategoryContext';
import ModalCreateCategory from './components/modals/ModalCreateCategory';
import CreateCategoryButton from './components/CreateCategoryButton';
import ModalDeleteCateogory from './components/modals/ModalDeleteCateogory';
import { AuthContext } from '../../contexts/authContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Category: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigator = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.role !== 'ADMIN') {
      navigator('/dashboard');
    }
  }, [isAuthenticated, user, navigator]);

  return (
    <CategoryProvider>
      <div className='relative h-screen overflow-hidden flex justify-center'>
        <div className='fixed top-20 z-10 bg-white shadow-md py-4 px-6 xl:w-[80%] md:w-[70%] w-[90%]'>
          <div className='flex items-center justify-between w-full'>
            <h2 className='text-2xl font-bold'>Categories</h2>
            <div className='flex justify-between items-center'>
              <CreateCategoryButton />
            </div>
          </div>
        </div>

        <CategoriesTable />
      </div>
      <ModalCreateCategory />
      <ModalDeleteCateogory />
    </CategoryProvider>
  );
};

export default Category;
