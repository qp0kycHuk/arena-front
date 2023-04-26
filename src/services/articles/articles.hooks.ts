import { useLoading } from "@hooks/useLoading";
import { IArticle } from "@models/Article";
import { createHooks } from "@services/utils/createHooks";
import { useEffect, useMemo, useState } from "react";
import { ICreateRequest, IUpdateRequest, articlesApi } from "./articles.api";

export const {
    useFetchEntities: useFetchArticles,
    useFetchEntityById: useFetchArticleById,
    useEntitiesControl: useArticleControl

} = createHooks<IArticle, ICreateRequest, IUpdateRequest>({
    api: articlesApi
})

