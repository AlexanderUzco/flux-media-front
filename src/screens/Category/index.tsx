import CategoriesTable from './components/CategoriesTable';
import { CategoryProvider } from './context/CategoryContext';
import ModalCreateCategory from './components/modals/ModalCreateCategory';
import CreateCategoryButton from './components/CreateCategoryButton';

const Category: React.FC = () => {
  return (
    <CategoryProvider>
      <div>
        <div className='flex items-center justify-between mb-4 w-full'>
          <h2 className='text-2xl font-bold'>Categories</h2>
          <div className='flex justify-between items-center'>
            <CreateCategoryButton />
          </div>
        </div>

        <CategoriesTable />
      </div>
      <ModalCreateCategory />
    </CategoryProvider>
  );
};

export default Category;
