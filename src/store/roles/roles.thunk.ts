import { IRole } from '@models/Role';
import { IUpdateRequest, ICreateRequest, rolesApi } from './roles.api';
import { createEntitiesThunks } from '@store/utils/createEntitiesThunks';


export const {
    fetchAllThunk: fetchRoles,
    updateThunk: updateRole,
    createThunk: createRole,
    fetchByIdThunk: fetchRoleById,
} = createEntitiesThunks<IRole, ICreateRequest, IUpdateRequest>({
    name: 'roles',
    api: rolesApi
})
