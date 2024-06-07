import React from 'react';

interface ItemDetailContentVideosProps {
  videos: string[];
}

const ItemDetailContentVideos: React.FC<ItemDetailContentVideosProps> = ({
  videos,
}) => {
  const isValidYouTubeUrl = (url: string) => {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(regExp);
  };

  return (
    <div className='my-4'>
      <h3 className='text-lg font-semibold mb-2'>Videos</h3>
      {videos.map((video, index) => {
        if (isValidYouTubeUrl(video)) {
          const videoId = video.match(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
          )?.[1];

          return (
            <div
              key={index}
              className='my-2'
            >
              <iframe
                width='560'
                height='315'
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube Video ${index}`}
                allowFullScreen
              ></iframe>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className='my-2'
            >
              <p>No es un enlace de YouTube válido: {video}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default ItemDetailContentVideos;
