class PostSummary {
  id: string;
  title: string;
  author: string;
  content: string;
  languages: string[];
  datetime: Date;

  constructor(
    id: string,
    title: string,
    author: string,
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

export default PostSummary;
