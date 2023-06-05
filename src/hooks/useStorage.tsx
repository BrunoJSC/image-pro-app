import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../firebase/config";

import { v4 as uuid } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "./useAuth";

export default function useStorage() {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  function startUpload(file: File) {
    if (!file) {
      return;
    }

    const fileId = uuid();
    const formatFile = file.type.split("/")[1];

    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        setError(error.message);
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setProgress(progress);

        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          createdAt: new Date(),
          userId: user?.email,
        });
      }
    );
  }

  return {
    progress,
    error,
    startUpload,
  };
}
