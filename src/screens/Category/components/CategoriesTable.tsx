import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';
const CategoriesTable: React.FC = () => {
  const { categories } = useContext(CategoryContext);
  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-gray-50'>
        <tr>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Name
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Image
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Description
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Created By
          </th>
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {categories.map((category) => (
          <tr key={category.id}>
            <td className='px-6 py-4 whitespace-nowrap'>
              <div className='flex items-center'>
                <div className='ml-4'>
                  <div className='text-sm font-medium text-gray-900'>
                    {category.name}
                  </div>
                </div>
              </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <img
                src={category.imageUrl}
                alt={category.name}
                className='h-12 w-12'
              />
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {category.description}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {category.createdBy}
            </td>
            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
              {/* Aquí puedes colocar los componentes o botones de acciones */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
