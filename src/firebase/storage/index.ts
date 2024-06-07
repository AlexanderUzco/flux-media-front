import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../firebase.config';

type TUploadFile = {
  file: File | Blob;
  imageRef: string;
};

export const uploadFile = async ({ file, imageRef }: TUploadFile) => {
  console.log({ file, imageRef, storage });

  const currentFileRef = ref(storage, imageRef);

  return uploadBytes(currentFileRef, file)
    .then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref).then(
        (downloadURL) => downloadURL
      );

      return {
        ref: snapshot.ref.fullPath,
        url: url,
      };
    })
    .catch((error) => {
      console.log('Firebase - Storage: Error in upload Image:', error);
      return error;
    });
};

export const deleteImage = async (refString: string) => {
  const deleteRef = ref(storage, refString);

  return deleteObject(deleteRef)
    .then(() => {
      console.log(`File ${refString} deleted`);
    })
    .catch((error) => {
      console.log('Firebase - Storage: Error in delete Image:', error);
    });
};
