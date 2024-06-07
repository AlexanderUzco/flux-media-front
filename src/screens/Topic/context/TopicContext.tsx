import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { TTopic } from '../types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getTopics } from '../../../api/fluxMediaService/services/topic';
import { TCategory } from '../../Category/types';
import { getCategories } from '../../../api/fluxMediaService/services/category';

export interface ITopicModal {
  open: boolean;
  type: 'create' | 'edit' | 'delete' | null;
  topicSelected?: TTopic;
}

export interface ITopicContext {
  loadingTopic: boolean;
  topics: TTopic[];
  categories: TCategory[];
  topicModal: ITopicModal;
  handleTopicModal: (data: ITopicModal) => void;
  fetchTopics: () => void;
  fetchCategories: () => void;
}

const initialTopicContext: ITopicContext = {
  loadingTopic: false,
  topics: [],
  categories: [],
  topicModal: {
    open: false,
    type: 'create',
    topicSelected: undefined,
  },
  handleTopicModal: () => {},
  fetchTopics: () => {},
  fetchCategories: () => {},
};

export const TopicContext = createContext<ITopicContext>(initialTopicContext);

export const TopicProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loadingTopic, setLoadingTopic] = useState<boolean>(false);
  const [topics, setTopics] = useState<TTopic[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [topicModal, setTopicModal] = useState<ITopicModal>(
    initialTopicContext.topicModal
  );

  const handleTopicModal = (data: ITopicModal) => {
    setTopicModal(data);
  };

  const fetchTopics = async () => {
    try {
      setLoadingTopic(true);
      const res = await getTopics();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setTopics(res.data.topics as TTopic[]);

      setLoadingTopic(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoadingTopic(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingTopic(true);
      const res = await getCategories();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setCategories(res.data.categories as TCategory[]);

      setLoadingTopic(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setLoadingTopic(false);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchCategories();
  }, []);

  return (
    <TopicContext.Provider
      value={{
        loadingTopic,
        topics,
        categories,
        topicModal,
        handleTopicModal,
        fetchTopics,
        fetchCategories,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};
