class PostSummary {
  id: string;
  title: string;
  author: string;
  summary: string;
  datetime: Date;

  constructor(
    id: string,
    title: string,
    author: string,
    summary: string,
    datetime: Date
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.summary = summary;
    this.datetime = datetime;
  }
}

export default PostSummary;