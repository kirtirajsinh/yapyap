import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getFallbackAvatar = () => {
  return '/avatars/avatars/0.png';
};

export const geRoomMetaData = async (roomId: string) => {



  const response = await fetch(`https://api.huddle01.com/api/v2/sdk/rooms/room-details/${roomId}`, {
    method: "GET",
    headers: {
      'x-api-key': process.env.API_KEY || '',
    },
  }
  )

  if (!response.ok) {
    console.log("Error getting room metadata:", response);
    throw new Error(`Error getting room metadata: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  console.log("data from getting room metadata", data);
  return data;
}

