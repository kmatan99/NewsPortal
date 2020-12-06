export interface IArticlesData {
    [topic: string]: IArticle[]
}

export interface IArticle {
    source: IArticleSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: String;
}

export interface IArticleSource {
    id: string;
    name: string;
}