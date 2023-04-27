import { IFolder } from '@models/Folder';
import { createEntityAdapter } from "@reduxjs/toolkit";

export const foldersEntityAdapter = createEntityAdapter<IFolder>()