class Content {
  title?: string;
  data: string;
  language: string;
  availableLanguages: string[];

  constructor(
    data: string,
    language: string,
    availableLanguages: string[],
    title?: string
  ) {
    this.data = data;
    this.language = language;
    this.availableLanguages = availableLanguages;
    this.title = title;
  }
}

export default Content;
