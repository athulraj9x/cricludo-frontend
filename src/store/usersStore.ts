import { create } from "zustand";

interface UsersState {
  users: any | null;
  setUsers: (user: any) => void;
  removeUsers: () => void;
  getMasterUsers: () => any[];
  refetchUsers: boolean;
  setRefetchUsers: (u: boolean) => void;
}

export const useUsersStore = create<UsersState>()((set, get) => ({
  users: null,
  setUsers: (users: any) => set({ users }),
  removeUsers: () => set({ users: null }),
  getMasterUsers: () => {
    const users = get().users;
    if (!users) return [];
    return users.filter((user: any) => user.userType === "master");
  },
  refetchUsers: false,
  setRefetchUsers: (u: boolean) => set({refetchUsers: u})
}));
