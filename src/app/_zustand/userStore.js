import { create } from "zustand";

export const useUserStore = create((set)=>({
    loginStatus : false,
    currentUser : null,
    login: (user)=>set({ loginStatus: true, currentUser: user}),
    logout:(user)=>set({loginStatus:false, currentUser: null}),

}))