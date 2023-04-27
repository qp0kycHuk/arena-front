
import { IArticle } from '@models/Article';
import { IUpdateRequest, ICreateRequest, articlesApi } from '@store/articles/articles.api';
import { createEntitiesThunks } from '@store/utils/createEntitiesThunks';

export const {
    fetchAllThunk: fetchArticles,
    updateThunk: updateArticle,
    createThunk: createArticle,
    fetchByIdThunk: fetchArticleById,
    removeThunk: removeArticle
} = createEntitiesThunks<IArticle, ICreateRequest, IUpdateRequest>({
    name: 'articles',
    api: articlesApi
})
