export interface Post {
  id: number,
  image: string,
  description: string,
  user:{
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
  }
}