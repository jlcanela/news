export interface Topic {
    name: string;
}

export interface Article {
    title: string;
    content: string;
    topic: Topic;
}

export class ArticleRepository {

    public async getArticles(topic?: Topic): Promise<Article[]> {
        return [
            {
                title: "Article 1",
                content: "Content 1",
                topic: topic, //{ name: "Topic 1" },
            },
            {
                title: "Article 2",
                content: "Content 2",
                topic: topic, //{ name: "Topic 2" },
            },
        ];
    }

    public async createArticle(article: Article): Promise<void> {
        console.log(article);
    }

    public async getTopics(): Promise<Topic[]> {
        return ["news", "politics", "sports", "entertainment"].map((topic) => ({ name: topic}));
    }

    public asMarkdown(article: Article): string {
        return `# ${article.title}\n\n${article.content}`;
    }

    public asMarkdownList(articles: Article[]): string {
        return articles.map((article) => this.asMarkdown(article)).join("\n\n");
    }
}

