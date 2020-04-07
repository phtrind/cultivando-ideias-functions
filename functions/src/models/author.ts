class Author {
  id: string;
  name: string;
  bio: string;
  image: string;
  languages: string[];

  constructor(
    id: string,
    name: string,
    bio: string,
    image: string,
    languages: string[]
  ) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.bio = bio;
    this.image = image;
    this.languages = languages;
  }
}

export default Author;
