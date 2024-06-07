import React, { useState } from 'react';

interface ImagePreviewProps {
  imageUrl: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className='max-w-xs rounded overflow-hidden shadow-lg'>
        <img
          src={imageUrl}
          alt='Preview'
          className='w-full cursor-pointer'
          onClick={toggleModal}
        />
      </div>
      {showModal && (
        <div className='fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50'>
          <div className='max-w-3xl bg-white rounded-lg overflow-hidden shadow-xl'>
            <button
              className='absolute top-0 right-0 m-4 text-xl font-bold text-gray-500 hover:text-gray-800'
              onClick={toggleModal}
            >
              &times;
            </button>
            <img
              src={imageUrl}
              alt='Preview'
              className='w-full'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
