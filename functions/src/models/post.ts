import Author from "./Author";
import Content from "./content";

export default interface Post {
  id: string;
  author: Author;
  content: Content;
  datetime: Date;
}
