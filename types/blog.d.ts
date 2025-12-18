//   "id": 0,
//   "languageId": 0,
//   "titleBlog": "string",
//   "slug": "string",
//   "contentBlog": "string",
//   "featured_image": "string",
//   "excerpt": "string",
//   "statusblog": 0

interface Blog {
  id: number;
  languageId: number;
  titleBlog: string;
  slug: string;
  contentBlog: string;
  featured_image: string;
  excerpt: string;
  statusblog: number;
}


interface BlogResponse {
  data: Blog[];
  message: string;
}

interface categoryBlog {
  id: number;
  languageId: number;
  nameCategory: string;
  slug: string;
  statusCategory: number;
}
