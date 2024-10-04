export type FormInputNews = {
  title: string;
  descriptions: string;
  content: string;
  tagId: string;
};


export interface News {
  id: string;
  title: string;
  descriptions: string;
  content: string;
  imageUrl: string | null;
  publishedAt: Date;
  authorId: string;
  tagId: string;
  createdAt: Date;
  updatedAt: Date;
  tag: Tag;
  author: Author;
}

interface Tag {
  id: string;
  name: string;
}

interface Author {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
}

