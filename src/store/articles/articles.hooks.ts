import { IArticle } from "@models/Article"
import { ICreateRequest, IUpdateRequest, useCreateMutation, useUpdateMutation } from "./articles.api"

export function useArticleControl() {
    const [create] = useCreateMutation()
    const [update] = useUpdateMutation()

    async function createDraftArticle(formData: ICreateRequest) {
        if (!formData.has('name')) {
            formData.append('name', '__DRAFT__')
        }

        return await create(formData)
    }

    async function updateArticle(formData: IUpdateRequest) {
        return await update(formData)

    }

    async function createArticle(formData: ICreateRequest) {
        return await create(formData)

    }

    return {
        createDraftArticle,
        updateArticle,
        createArticle
    }
}