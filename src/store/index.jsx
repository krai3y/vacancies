import { create } from 'zustand'
import { userSlice } from './slices/createUserSlice'

export const useStore = create((set, get) => ({
  ...userSlice(set, get),
}))