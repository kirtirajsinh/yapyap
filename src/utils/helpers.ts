import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getFallbackAvatar = () => {
  return '/avatars/avatars/0.png';
};

export const getFallbackImageUrl =
  'https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/main%20image.png'






