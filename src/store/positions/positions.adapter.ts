import { IPosition } from '@models/Position'
import { createEntityAdapter } from '@reduxjs/toolkit'

export const positionsEntityAdapter = createEntityAdapter<IPosition>()
