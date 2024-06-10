import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TItem } from '../types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import {
  getContentItems,
  getContentItemsByUser,
} from '../../../api/fluxMediaService/services/contentItem';
import { TTopic, TTopicByCategory } from '../../Topic/types';
import { getTopics } from '../../../api/fluxMediaService/services/topic';
import { AuthContext } from '../../../contexts/authContext';
import { groupByCategory } from '../utils/topic';

export interface IContentItemModal {
  open: boolean;
  type: 'create' | 'edit' | 'delete' | null;
}

export interface IContentItemContext {
  loadingContentItem: boolean;
  contentItems: TItem[];
  topics: TTopicByCategory[];
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
  const { user } = useContext(AuthContext);
  const [loadingContentItem, setLoadingContentItem] = useState<boolean>(false);
  const [contentItems, setContentItems] = useState<TItem[]>([]);
  const [topics, setTopics] = useState<TTopicByCategory[]>([]);
  const [contentItemModal, setContentItemModal] = useState<IContentItemModal>(
    initialContentItemContext.contentItemModal
  );

  const handleContentItemModal = (data: IContentItemModal) => {
    setContentItemModal(data);
  };

  const fetchContentItems = async () => {
    try {
      setLoadingContentItem(true);

      if (!user) {
        throw new Error('User not found');
      }

      if (user.role === 'ADMIN') {
        const res = await getContentItems();
        if (res instanceof AxiosError) {
          throw { message: res?.response?.data };
        }

        setContentItems(res.data.contentItems as TItem[]);
      }

      if (user.role === 'WRITER') {
        const res = await getContentItemsByUser(user.id);
        if (res instanceof AxiosError) {
          throw { message: res?.response?.data };
        }
        setContentItems(res.data.contentItems as TItem[]);
      }

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

      setTopics(groupByCategory(res.data.topics as TTopic[]));

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
    // fetchContentItems don't need to be in the dependency array because it's not changing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
