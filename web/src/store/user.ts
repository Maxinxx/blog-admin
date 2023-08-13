import { create } from 'zustand'

interface State {
  uid: string;
  username: string;
  avatar?: string;
}

interface Action {
  setUser: (user: State) => void;
}


export const useUser = create<State & Action>((set) => ({
  uid: '',
  username: '',
  avatar: '',
  setUser: (user: State) => set(user),
}))
