"use server"

import { API } from '@huddle01/server-sdk/api';

interface RoomDetails {
    message: string;
    data: {
        roomId: string;
    };
}
export const createRoom = async (title: string, hostWallet: string) => {
    console.log("title", title, hostWallet, "hostWallet");
    try {
        const api = new API({
            apiKey: process.env.API_KEY!,
        });

        const response = await api.createRoom({
            roomLocked: true,
            metadata: JSON.stringify({
                'title': `${title}`,
                'hostWallet': `${hostWallet}`,
            })
        });

        console.log("response", response);
        const roomId: string = response.roomId;

        return roomId;

    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
};