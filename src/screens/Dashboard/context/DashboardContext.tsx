import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import {
  getContentItems,
  getContentSummary,
} from '@api/fluxMediaService/services/contentItem';
import { toast } from 'react-toastify';
import { TContentItemSummary, TItem } from '@screens/ContentItem/types';

export interface IDashboardContext {
  loadingContentItems: boolean;
  loadingContentItemSummary: boolean;
  contentItems: TItem[];
  contentItemSummary: TContentItemSummary;
}

const initialDashboardContext: IDashboardContext = {
  loadingContentItems: false,
  loadingContentItemSummary: false,
  contentItems: [],
  contentItemSummary: {
    contentItems: 0,
    images: 0,
    videos: 0,
    text: 0,
  },
};

export const DashboardContext = createContext<IDashboardContext>(
  initialDashboardContext
);

export const DashboardProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingContentItems, setLoadingContentItems] =
    useState<boolean>(false);
  const [contentItems, setContentItems] = useState<TItem[]>([]);
  const [loadingContentItemSummary, setLoadingContentItemSummary] =
    useState<boolean>(false);
  const [contentItemSummary, setContentItemSummary] =
    useState<TContentItemSummary>(initialDashboardContext.contentItemSummary);

  const fetchContentItems = async () => {
    try {
      setLoadingContentItems(true);
      const res = await getContentItems();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setContentItems(res.data.contentItems as TItem[]);

      setLoadingContentItems(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoadingContentItems(false);
    }
  };

  const fetchContentItemSummary = async () => {
    try {
      setLoadingContentItemSummary(true);
      const res = await getContentSummary();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setContentItemSummary(res.data.totalItemsSummary as TContentItemSummary);

      setLoadingContentItemSummary(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoadingContentItemSummary(false);
    }
  };

  useEffect(() => {
    fetchContentItems();
    fetchContentItemSummary();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        loadingContentItems,
        loadingContentItemSummary,
        contentItems,
        contentItemSummary,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
