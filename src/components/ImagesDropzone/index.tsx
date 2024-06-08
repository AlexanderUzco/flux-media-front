import React from 'react';
import { useDropzone } from 'react-dropzone';
import { XCircleIcon } from '@heroicons/react/16/solid';

export interface ImagePreview {
  file: File;
  preview: string;
}

interface ImageDropzoneProps {
  images: ImagePreview[];
  setImages: React.Dispatch<React.SetStateAction<ImagePreview[]>>;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ images, setImages }) => {
  const onDrop = (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length <= 3) {
      const newImages: ImagePreview[] = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    } else {
      alert('You can only upload up to 3 images.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/svg+xml': [],
    },
    onDrop,
  });

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className='p-4 border rounded'>
      <div
        {...getRootProps()}
        className='flex justify-center items-center p-6 border-2 border-dashed rounded cursor-pointer hover:bg-gray-100'
      >
        <input {...getInputProps()} />
        {images.length < 3 ? (
          <p className='text-gray-600'>
            Drag 'n' drop images here, or click to select images (up to 3)
          </p>
        ) : (
          <p className='text-gray-600'>
            You have reached the maximum number of images (3)
          </p>
        )}
      </div>
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {images.map((image, index) => (
          <div
            key={index}
            className='relative'
          >
            <img
              src={image.preview}
              alt={`preview ${index}`}
              className='w-full h-32 object-cover rounded shadow'
            />
            <div
              onClick={() => removeImage(index)}
              className='absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 focus:outline-none cursor-pointer'
            >
              <XCircleIcon
                className='h-5 w-5'
                aria-hidden='true'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDropzone;
