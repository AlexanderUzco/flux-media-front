import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface DropzoneProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
  filesAllow: number;
  fileTypes: ('images' | 'video' | 'document')[];
}

const Dropzone: React.FC<DropzoneProps> = ({
  setFiles,
  files,
  filesAllow,
  fileTypes,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const getAcceptedFileTypes = () => {
    const types = {
      images: ['image/jpeg', 'image/png', 'image/svg+xml'],
      video: ['video/*'],
      document: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
    };

    return fileTypes.reduce((acc, type) => {
      return { ...acc, ...types[type] };
    }, {});
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > filesAllow) {
        alert(`You can only upload up to ${filesAllow} files.`);
        return;
      }
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setFiles([...files, file]);
        };
        reader.readAsDataURL(file);
      }
    },
    [files, filesAllow, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: getAcceptedFileTypes(),
    multiple: false,
  });

  return (
    <div className='flex flex-col items-center justify-center'>
      <div
        {...getRootProps()}
        className='border-dashed border-2 border-gray-300 p-6 w-64 h-64 flex flex-col items-center justify-center cursor-pointer'
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>

      {'PREVIEW FILES HERE'}

      {preview && (
        <button
          className='mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            setPreview(null);
            setFiles([]);
          }}
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default Dropzone;
