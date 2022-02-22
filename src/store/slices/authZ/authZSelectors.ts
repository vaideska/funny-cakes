import { RootState } from '../..';

export const selectAuthZModalState = (state: RootState) => state.AuthZ.modal;
export const selectAuthZStatus = (state: RootState) => state.AuthZ.status;
export const userSelector = (state: RootState) => state.AuthZ.user;
