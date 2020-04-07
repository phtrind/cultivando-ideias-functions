import Author from "./author";

class Post {
  id: string;
  title: string;
  author: Author;
  content: string;
  languages: string[];
  datetime: Date;

  constructor(
    id: string,
    title: string,
    author: Author,
    content: string,
    languages: string[],
    datetime: Date
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.content = content;
    this.languages = languages;
    this.datetime = datetime;
  }
}

export default Post;
