import { useContext, Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import { AuthContext } from '../../contexts/authContext';
import { TItemContent } from '../../screens/ContentItem/types';
import youtubeImage from '../../assets/youtube-card-logo.png';
import textImage from '../../assets/text-card-logo.png';
import TooltipHover from '../TooltipHover.tsx';
import Tag from '../Tag/index.tsx';

interface FeatureCardProps {
  title: string;
  topic: string;
  topicColor: string;
  content: TItemContent;
  contentItemID: string;
  createdBy: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  topic,
  topicColor,
  content,
  contentItemID,
  createdBy,
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  const imageToDisplay = useMemo(() => {
    const { type, data } = content;

    const imageSrc = {
      image: type === 'image' && data[0].url,
      video: youtubeImage,
      text: textImage,
    };

    return imageSrc[content.type];
  }, [content]);

  return (
    <TooltipHover
      tooltipText={
        isAuthenticated ? title : 'Please Sign in to see the content!'
      }
      direction='bottom'
    >
      <Link
        to={isAuthenticated ? `/contentItem/${contentItemID}` : '/signin'}
        className='p-4 w-96'
      >
        <article className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto shadow-md'>
          <Fragment>
            <img
              src={imageToDisplay}
              alt={title}
              className='absolute inset-0 h-full w-full object-cover'
            />
          </Fragment>
          <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80'></div>
          <h3 className='z-10 mt-3 text-3xl font-bold text-white truncate'>
            {title} {content.type}
          </h3>
          <Tag
            text={topic}
            color={topicColor}
          />
          <div className='z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300'>
            Credits: {createdBy}
          </div>
        </article>
      </Link>
    </TooltipHover>
  );
};

export default FeatureCard;
