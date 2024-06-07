import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContentItem } from '../../../api/fluxMediaService/services/contentItem';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { TItem } from '../../ContentItem/types';

export interface IItemDetailModal {
  open: boolean;
  type: 'create' | 'edit' | 'delete' | null;
  contentItemID?: string;
}

export interface IContentItemDetailContext {
  contentItem?: TItem | null;
  loadingContentItem: boolean;
  itemDetailModal: IItemDetailModal;
  handleItemDetailModal: (data: IItemDetailModal) => void;
}

const initialContentItemDetailContext: IContentItemDetailContext = {
  contentItem: null,
  loadingContentItem: false,
  itemDetailModal: {
    open: false,
    type: 'create',
    contentItemID: undefined,
  },
  handleItemDetailModal: () => {},
};

export const ContentItemDetailContext =
  createContext<IContentItemDetailContext>(initialContentItemDetailContext);

export const ContentItemDetailProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingContentItem, setLoadingContentItem] = useState<boolean>(false);
  const [contentItem, setContentItem] = useState<TItem | null>(null);
  const [itemDetailModal, setItemDetailModal] = useState<IItemDetailModal>(
    initialContentItemDetailContext.itemDetailModal
  );
  const { contentItemID } = useParams();

  const handleItemDetailModal = (data: IItemDetailModal) => {
    setItemDetailModal(data);
  };

  const fetchContentItem = async (id: string) => {
    try {
      setLoadingContentItem(true);
      const res = await getContentItem(id);

      if (res instanceof AxiosError) {
        throw new Error(res?.response?.data || 'Error fetching content item');
      }

      setContentItem(res.data.contentItem as TItem);
      setLoadingContentItem(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
      setLoadingContentItem(false);
    }
  };

  useEffect(() => {
    contentItemID && fetchContentItem(contentItemID);
  }, [contentItemID]);

  return (
    <ContentItemDetailContext.Provider
      value={{
        contentItem,
        loadingContentItem,
        itemDetailModal,
        handleItemDetailModal,
      }}
    >
      {children}
    </ContentItemDetailContext.Provider>
  );
};
