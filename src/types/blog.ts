export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: number;
  sample: boolean;
}

export interface TocItem {
  title: string;
  id: string;
  level: 2 | 3;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  toc: TocItem[];
}
