import { create } from "zustand";

interface Location {
    placeId: string;
    description: string;
}

interface User {
    displayName: string;
    fid: number;
    location: Location;
    pfpUrl: string;
    username: string;
}

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    client: Client;
    setClient: (client: Client) => void;
}
interface Client {
    added: boolean;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null, // defailt value
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    client: {
        added: false,
    },
    setClient: (client: Client) => set({ client }),
}));
