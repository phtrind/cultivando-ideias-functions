import Content from "./content";

export default interface Author {
  id: string;
  name: string;
  bio: Content;
  image: string;
}
