import { EntityId } from '@reduxjs/toolkit';

export interface IFile {
    id: EntityId
    name?: string
    updated_at?: Date
    created_at?: Date
    src?: string
    key?: string
    file?: File
}