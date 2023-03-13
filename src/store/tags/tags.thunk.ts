
import { ITag } from '@models/Tag';
import { EntityId, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IUpdateRequest, ICreateRequest, tagsApi } from './tags.api';
import { createEntitiesThunks } from '@store/utils/createEntitiesThunks';


export const {
    fetchAllThunk: fetchTags,
    updateThunk: updateTag,
    createThunk: createTag,
    fetchByIdThunk: fetchTagById,
} = createEntitiesThunks<ITag, ICreateRequest, IUpdateRequest>({
    name: 'tags',
    api: tagsApi
})
