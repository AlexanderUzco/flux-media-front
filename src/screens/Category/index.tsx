import CategoriesTable from './components/CategoriesTable';
import { CategoryProvider } from './context/CategoryContext';
import ModalCreateCategory from './components/modals/ModalCreateCategory';
import CreateCategoryButton from './components/CreateCategoryButton';
import ModalDeleteCateogory from './components/modals/ModalDeleteCateogory';

const Category: React.FC = () => {
  return (
    <CategoryProvider>
      <div className='relative h-screen overflow-hidden'>
        <div className='fixed z-10 bg-white shadow-md py-4 px-6 w-[80%]'>
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
