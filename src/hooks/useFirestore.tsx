import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

interface Image {
  imageUrl: string;
  createdAt: Date;
  userEmail: string;
}

export default function useFirestore(collectionName: string) {
  const [docs, setDocs] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, collectionName),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images: Image[] = [];
          querySnapshot.forEach((doc) => {
            images.push({
              imageUrl: doc.data().imageUrl,
              createdAt: new Date(),
              userEmail: doc.data().userEmail,
            });
          });
          setDocs(images);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getData();
  }, [collectionName]);

  return {
    docs,
    isLoading,
  };
}
