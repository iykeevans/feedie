import axios, { type AxiosResponse } from "axios";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";

export interface IRandomUser {
  isFilledOut?: boolean;
  cell: string;
  dob: {
    age: number;
    date: string;
  };
  email: string;
  gender: string;
  id: {
    name: string;
    value: string;
  };
  location: {
    city: string;
    coordinates: { latitude: string; longitude: string };
    country: string;
    postcode: number;
    state: string;
    street: { number: number; name: string };
    timezone: {
      offset: string;
      description: string;
    };
  };
  login: {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: {
    age: number;
    date: string;
  };
}

interface IRandomUserResponse {
  info: {
    page: number;
    result: number;
    seed: string;
    version: string;
  };
  results: IRandomUser[];
}

export const getRandomUsers = () => {
  const endpoint = "https://randomuser.me/api/?results=5";

  return axios.get(endpoint) as Promise<AxiosResponse<IRandomUserResponse>>;
};

export const getAllFeedBacks = async () => {
  const querySnapshot = await getDocs(collection(db, "feedback"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};

export const createFeedBack = async (data: {
  userId: string;
  id: string;
  answers: string;
}) => {
  try {
    await setDoc(doc(db, "feedback"), data);
  } catch (error) {
    console.log(error);
  }
};
// export const createUser = async (data: { userId: string }) => {
//   try {
//     await addDoc(collection(db, "users"), data);
//   } catch (error) {
//     console.log(error);
//   }
// };
export const createUser = async (data: {
  userId: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  photoURL?: string;
}) => {
  try {
    await setDoc(doc(db, "users", data.userId), { ...data });
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const users: any[] = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log({ querySnapshot });
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      users.push(doc.data());
    });

    return users;
  } catch (error) {}
};

export const getUser = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return {};
    }
  } catch (error) {}
};
