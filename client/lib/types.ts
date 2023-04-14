export type IUser = {
  _id: string;
  email: string;
  name: string;
  role: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
};

export type IPost = {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
    name: string;
    photo: string;
  };
};
