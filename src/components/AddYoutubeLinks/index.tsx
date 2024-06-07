import { FC } from 'react';

type Props = {
  urlVideos: string[];
  setUrlVideos: (urls: string[]) => void;
};

const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

const AddYoutubeLinks: FC<Props> = ({ urlVideos, setUrlVideos }) => {
  const addInput = () => {
    if (urlVideos.length < 3) {
      setUrlVideos([...urlVideos, '']);
    }
  };

  const removeInput = (index: number) => {
    setUrlVideos(urlVideos.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, value: string) => {
    const newUrlVideos = [...urlVideos];
    newUrlVideos[index] = value;
    setUrlVideos(newUrlVideos);
  };

  return (
    <div className='mb-4'>
      <label
        htmlFor='youtube-links'
        className='block text-gray-700 text-sm font-bold mb-2'
      >
        YouTube Links
      </label>
      {urlVideos.map((input, index) => (
        <div
          key={index}
          className='mb-2 flex items-center'
        >
          <input
            id={`youtube-url-${index}`}
            type='text'
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder='Enter YouTube URL'
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              input && !youtubeRegex.test(input) ? 'border-red-500' : ''
            }`}
          />
          {index > 0 && (
            <button
              type='button'
              onClick={() => removeInput(index)}
              className='ml-2 text-red-500 hover:text-red-700'
            >
              &times;
            </button>
          )}
          {input && !youtubeRegex.test(input) && (
            <p className='text-red-500 text-xs italic mt-1'>
              Please enter a valid YouTube link
            </p>
          )}
        </div>
      ))}
      <div className='flex justify-between items-center'>
        <button
          type='button'
          onClick={addInput}
          disabled={urlVideos.length >= 3}
          className='bg-blue-500 text-white px-3 py-2 rounded disabled:bg-gray-400'
        >
          Add link
        </button>
      </div>
    </div>
  );
};

export default AddYoutubeLinks;
