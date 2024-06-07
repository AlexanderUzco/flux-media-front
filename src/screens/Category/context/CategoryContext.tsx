import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { TCategory } from '../types';
import { getCategories } from '../../../api/fluxMediaService/services/category';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export interface ICategoryModal {
  open: boolean;
  type: 'create' | 'edit' | 'delete' | null;
  categorySelected?: TCategory;
}

export interface ICategoryContext {
  loadingCategory: boolean;
  categories: TCategory[];
  categoryModal: ICategoryModal;
  handleCategoryModal: (data: ICategoryModal) => void;
  fetchCategories: () => void;
}

const initialCategoryContext: ICategoryContext = {
  loadingCategory: false,
  categories: [],
  categoryModal: {
    open: false,
    type: 'create',
    categorySelected: undefined,
  },
  handleCategoryModal: () => {},
  fetchCategories: () => {},
};

export const CategoryContext = createContext<ICategoryContext>(
  initialCategoryContext
);

export const CategoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [categoryModal, setCategoryModal] = useState<ICategoryModal>(
    initialCategoryContext.categoryModal
  );

  const handleCategoryModal = (data: ICategoryModal) => {
    setCategoryModal(data);
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategory(true);
      const res = await getCategories();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setCategories(res.data.categories as TCategory[]);

      setLoadingCategory(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoryModal,
        loadingCategory,
        handleCategoryModal,
        fetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
