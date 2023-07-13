import { ITag } from '@models/Tag'
import { createEntityAdapter } from '@reduxjs/toolkit'

export const tagsEntityAdapter = createEntityAdapter<ITag>()
