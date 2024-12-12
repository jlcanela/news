export interface Topic {
    name: string;
}

export interface Article {
    title: string;
    content: string;
    topic: Topic;
}

export interface ArticleRepository {
    getArticles(topic?: Topic): Promise<Article[]>;
    createArticle(article: Article): Promise<void>;
    getTopics(): Promise<Topic[]>;
    asMarkdown(article: Article): string;
    asMarkdownList(articles: Article[]): string;
}
