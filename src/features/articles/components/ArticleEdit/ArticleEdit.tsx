import { ArticleUpdate } from './ArticleUpdate';
import { ArticleCreate } from './ArticleCreate';

export interface IArticleEditProps {
    articleId?: string | number
}

export function ArticleEdit({ articleId }: IArticleEditProps) {
    return articleId ? <ArticleUpdate articleId={articleId} /> : <ArticleCreate />;
}
