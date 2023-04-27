import { IFolder } from '@models/Folder';
import { RootState } from '../index';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createFolder, fetchFolderById, fetchFolders, updateFolder } from "./folders.thunk";
import { foldersEntityAdapter } from "./folders.adapter";
import { asyncThunkErrorHandler } from '@store/utils/asyncThunkErrorHandler';

export const articleSlice = createSlice({
    name: 'folders',
    initialState: foldersEntityAdapter.getInitialState(),
    reducers: {
        updateFolder(state, action: PayloadAction<IFolder>) {
            foldersEntityAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFolders.pending, foldersEntityAdapter.removeAll)
            
        builder
            .addCase(fetchFolders.fulfilled, foldersEntityAdapter.setAll)
            .addCase(fetchFolderById.fulfilled, foldersEntityAdapter.upsertOne)
            .addCase(createFolder.fulfilled, foldersEntityAdapter.upsertOne)
            .addCase(updateFolder.fulfilled, foldersEntityAdapter.upsertOne)

        builder
            .addCase(fetchFolders.rejected, asyncThunkErrorHandler)
            .addCase(fetchFolderById.rejected, asyncThunkErrorHandler)
            .addCase(createFolder.rejected, asyncThunkErrorHandler)
            .addCase(updateFolder.rejected, asyncThunkErrorHandler)
    },
})


export const {
    selectEntities,
    selectAll,
    selectById,
} = foldersEntityAdapter.getSelectors<RootState>(({ folders }) => folders)

export default articleSlice.reducer