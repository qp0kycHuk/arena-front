import { ICreateRequest, IUpdateRequest, useCreateMutation, useUpdateMutation } from "./articles.api"

export function useArticleControl() {
    const [create] = useCreateMutation()
    const [update] = useUpdateMutation()

    async function createDraftArticle(formData: ICreateRequest) {
        if (!formData.get('name')) {
            formData.append('name', '__DRAFT__')
        }

        return await create(formData)
    }

    async function updateArticle(formData: IUpdateRequest) {
        const result = await update(formData)
        return result
    }

    async function createArticle(formData: ICreateRequest) {
        return await create(formData)
    }

    async function upsertArticle(formData: ICreateRequest | IUpdateRequest) {
        if ((formData as IUpdateRequest).has('id')) {
            return await updateArticle(formData)
        } else {
            return await createArticle(formData)
        }
    }

    return {
        upsertArticle,
        createDraftArticle,
        updateArticle,
        createArticle
    }
}