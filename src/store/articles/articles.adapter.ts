import { IArticle } from '@models/Article'
import { createEntityAdapter } from '@reduxjs/toolkit'

export const articlesEntityAdapter = createEntityAdapter<IArticle>()
