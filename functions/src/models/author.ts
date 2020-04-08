import Content from "./content";

class Author {
  id: string;
  name: string;
  bio: Content;
  image: string;

  constructor(id: string, name: string, bio: Content, image: string) {
    this.id = id;
    this.name = name;
    this.bio = bio;
    this.bio = bio;
    this.image = image;
  }
}

export default Author;
