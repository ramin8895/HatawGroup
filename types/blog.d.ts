// "id": 0,
// "categoryId": 0,
// "languageId": 0,
// "titleBlog": "string",
// "slug": "string",
// "contentBlog": "string",
// "featured_image": "string",
// "featured_imagename": "string",
// "excerpt": "string",
// "statusblog": 0

interface Blog {
  id?: number;
  languageId: number;
  titleBlog: string;
  slug: string;
  contentBlog: string;
  featured_image: string;
  excerpt: string;
  statusblog: number;
  categoryId: number;
  featured_imagename: string;
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
