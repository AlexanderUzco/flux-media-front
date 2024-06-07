import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { TItem } from '../types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getContentItems } from '../../../api/fluxMediaService/services/contentItem';
import { TTopic } from '../../Topic/types';
import { getTopics } from '../../../api/fluxMediaService/services/topic';

export interface IContentItemModal {
  open: boolean;
  type: 'create' | 'edit' | 'delete' | null;
}

export interface IContentItemContext {
  loadingContentItem: boolean;
  contentItems: TItem[];
  topics: TTopic[];
  contentItemModal: IContentItemModal;
  handleContentItemModal: (data: IContentItemModal) => void;
  fetchContentItems: () => void;
}

const initialContentItemContext: IContentItemContext = {
  loadingContentItem: false,
  contentItems: [],
  topics: [],
  contentItemModal: {
    open: false,
    type: 'create',
  },
  handleContentItemModal: () => {},
  fetchContentItems: () => {},
};

export const ContentItemContext = createContext<IContentItemContext>(
  initialContentItemContext
);

export const ContentItemProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingContentItem, setLoadingContentItem] = useState<boolean>(false);
  const [contentItems, setContentItems] = useState<TItem[]>([]);
  const [topics, setTopics] = useState<TTopic[]>([]);
  const [contentItemModal, setContentItemModal] = useState<IContentItemModal>(
    initialContentItemContext.contentItemModal
  );

  const handleContentItemModal = (data: IContentItemModal) => {
    setContentItemModal(data);
  };

  const fetchContentItems = async () => {
    try {
      setLoadingContentItem(true);
      const res = await getContentItems();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setContentItems(res.data.contentItems as TItem[]);

      setLoadingContentItem(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoadingContentItem(false);
    }
  };

  const fetchTopics = async () => {
    try {
      setLoadingContentItem(true);
      const res = await getTopics();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setTopics(res.data.topics as TTopic[]);

      setLoadingContentItem(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoadingContentItem(false);
    }
  };

  useEffect(() => {
    fetchContentItems();
    fetchTopics();
  }, []);

  return (
    <ContentItemContext.Provider
      value={{
        contentItems,
        topics,
        contentItemModal,
        loadingContentItem,
        handleContentItemModal,
        fetchContentItems,
      }}
    >
      {children}
    </ContentItemContext.Provider>
  );
};
