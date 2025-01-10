"use server"
interface RoomDetails {
    message: string;
    data: {
        roomId: string;
    };
}
export const createRoom = async (title: string, hostWallets: string[]) => {
    const res = await fetch(
        "https://api.huddle01.com/api/v2/sdk/rooms/create-room",
        {
            method: "POST",
            body: JSON.stringify({
                title: title,
                hostWallets: hostWallets ? hostWallets : [],
            }),
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.API_KEY ?? "",
            },
            cache: "no-store",
        }
    );
    const data: RoomDetails = await res.json();
    console.log("data from creating a room", data);
    const roomId = data.data.roomId;
    console.log("roomId", roomId);
    return roomId;
};