import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { TItem } from '../../ContentItem/types';
import { AxiosError } from 'axios';
import { getContentItems } from '../../../api/fluxMediaService/services/contentItem';
import { toast } from 'react-toastify';

export interface IDashboardContext {
  loadingDashboard: boolean;
  contentItems: TItem[];
}

const initialDashboardContext: IDashboardContext = {
  loadingDashboard: false,
  contentItems: [],
};

export const DashboardContext = createContext<IDashboardContext>(
  initialDashboardContext
);

export const DashboardProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(false);
  const [contentItems, setContentItems] = useState<TItem[]>([]);

  const fetchContentItems = async () => {
    try {
      setLoadingDashboard(true);
      const res = await getContentItems();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setContentItems(res.data.contentItems as TItem[]);

      setLoadingDashboard(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoadingDashboard(false);
    }
  };

  useEffect(() => {
    fetchContentItems();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        loadingDashboard,
        contentItems,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
