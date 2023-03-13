import { ITag } from '@models/Tag';
import { toast } from '@lib/Toast';
import { RootState } from '../index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createTag, fetchTagById, fetchTags, removeTag, updateTag } from "./tags.thunk";
import { tagsEntityAdapter } from "./tags.adapter";


export const tagsSlice = createSlice({
    name: 'tags',
    initialState: tagsEntityAdapter.getInitialState(),
    reducers: {
        updateTag(state, action: PayloadAction<ITag>) {
            tagsEntityAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTags.fulfilled, tagsEntityAdapter.setAll)
            .addCase(fetchTagById.fulfilled, tagsEntityAdapter.upsertOne)
            .addCase(createTag.fulfilled, tagsEntityAdapter.upsertOne)
            .addCase(updateTag.fulfilled, tagsEntityAdapter.upsertOne)
            .addCase(removeTag.fulfilled, tagsEntityAdapter.removeOne)

        builder
            .addCase(fetchTags.rejected, showThunkError)
            .addCase(fetchTagById.rejected, showThunkError)
            .addCase(createTag.rejected, showThunkError)
            .addCase(updateTag.rejected, showThunkError)
            .addCase(removeTag.rejected, showThunkError)
    },
})

function showThunkError(state: any, action: any) {
    toast.error(action.payload.message)
}

export const {
    selectEntities,
    selectAll,
    selectById,
} = tagsEntityAdapter.getSelectors<RootState>(({ tags }) => tags)



export default tagsSlice.reducer