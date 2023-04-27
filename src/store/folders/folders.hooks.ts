import { IFolder } from '@models/Folder';
import { ICreateRequest, IUpdateRequest } from "./folders.api"
import { createFolder, fetchFolderById, fetchFolders, updateFolder, removeFolder } from './folders.thunk';
import { selectAll, selectById } from './folders.slice';

import { createEntitiesHooks } from '@store/utils/createEntitiesHooks';

export const {
    useEntitiesControl: useFolderControl,
    useFetchEntities: useFetchFolders,
    useFetchEntityById: useFetchFolderById
} = createEntitiesHooks<IFolder, ICreateRequest, IUpdateRequest>({
    fetchAllThunk: fetchFolders,
    updateThunk: updateFolder,
    removeThunk: removeFolder,
    createThunk: createFolder,
    fetchByIdThunk: fetchFolderById,
    selectEntitiesSelector: ({ folders }) => folders,
    selectAllSelector: selectAll,
    selectByIdSelector: selectById,
})