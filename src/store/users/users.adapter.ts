import { IUser } from '@models/User';
import { createEntityAdapter } from "@reduxjs/toolkit";

export const usersEntityAdapter = createEntityAdapter<IUser>()