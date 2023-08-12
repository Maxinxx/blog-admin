import { create } from 'zustand'

interface State {
  username: string;
  avatar?: string;
}

interface Action {
  setUser: (user: State) => void;
}


export const useUser = create<State & Action>((set) => ({
  username: '',
  avatar: '',
  setUser: (user: State) => set(user),
}))
