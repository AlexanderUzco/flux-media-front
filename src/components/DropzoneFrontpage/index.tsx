import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface IDropzoneFrontpage {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  externalPreview?: string;
}

const DropzoneFrontpage: React.FC<IDropzoneFrontpage> = ({
  setFiles,
  externalPreview,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 1) {
        alert('Please upload only one image.');
        return;
      }
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFiles([file]);
        setImageLoaded(true);
      };
      reader.readAsDataURL(file);
    },
    [setFiles]
  );

  const removePreview = () => {
    setPreview(null);
    setFiles([]);
    setImageLoaded(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/svg+xml': [],
    },
    multiple: false,
  });

  useEffect(() => {
    if (externalPreview) {
      setPreview(externalPreview);
      setImageLoaded(true);
    }
  }, [externalPreview]);

  return (
    <div className='flex flex-col items-center justify-center'>
      {!imageLoaded && !preview && (
        <div
          {...getRootProps()}
          className='border-dashed border-2 border-gray-300 p-6 w-64 h-64 flex flex-col items-center justify-center cursor-pointer relative'
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image here, or click to select an image</p>
        </div>
      )}
      {preview && (
        <div className='relative w-full flex justify-center w-[500px] h-[200px]'>
          <img
            src={preview}
            alt='Preview'
            className='h-auto w-auto object-cover w-full h-full'
          />

          <button
            className='absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white font-bold py-2 px-4 rounded'
            onClick={removePreview}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default DropzoneFrontpage;
