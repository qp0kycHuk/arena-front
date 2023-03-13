import { IRole } from "@models/Role";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const rolesEntityAdapter = createEntityAdapter<IRole>()