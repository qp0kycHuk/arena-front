import { IPosition } from '@models/Position';
import { ICreateRequest, IUpdateRequest } from "./positions.api"
import { createPosition, fetchPositionById, fetchPositions, removePosition, updatePosition } from './positions.thunk';
import { selectAll, selectById } from './positions.slice';
import { createEntitiesHooks } from '../utils/createEntitiesHooks'

export const {
    useEntitiesControl: usePositionControl,
    useFetchEntities: useFetchPositions,
    useFetchEntityById: useFetchPositionById
} = createEntitiesHooks<IPosition, ICreateRequest, IUpdateRequest>({
    fetchAllThunk: fetchPositions,
    updateThunk: updatePosition,
    removeThunk: removePosition,
    createThunk: createPosition,
    fetchByIdThunk: fetchPositionById,
    selectEntitiesSelector: ({ positions }) => positions,
    selectAllSelector: selectAll,
    selectByIdSelector: selectById,
})