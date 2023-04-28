import { IArticle } from '@models/Article';
import { ICreateRequest, IUpdateRequest } from "./articles.api"
import { createArticle, fetchArticleById, fetchArticles, updateArticle, removeArticle } from './articles.thunk';
import { clearAction, selectAll, selectById, } from './articles.slice';

import { createEntitiesHooks } from '@store/utils/createEntitiesHooks';

export const {
    useEntitiesControl: useArticleControl,
    useFetchEntities: useFetchArticles,
    useFetchEntityById: useFetchArticleById
} = createEntitiesHooks<IArticle, ICreateRequest, IUpdateRequest>({
    fetchAllThunk: fetchArticles,
    updateThunk: updateArticle,
    removeThunk: removeArticle,
    createThunk: createArticle,
    fetchByIdThunk: fetchArticleById,
    clearEntitiesAction: clearAction,
    selectEntitiesSelector: ({ articles }) => articles,
    selectAllSelector: selectAll,
    selectByIdSelector: selectById,
})