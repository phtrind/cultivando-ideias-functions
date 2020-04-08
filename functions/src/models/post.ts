import Author from "./Author";
import Content from "./content";

class Post {
  id: string;
  author: Author;
  content: Content;
  datetime: Date;

  constructor(id: string, author: Author, content: Content, datetime: Date) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.datetime = datetime;
  }
}

export default Post;
