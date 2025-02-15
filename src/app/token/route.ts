import { AccessToken, Role } from '@huddle01/server-sdk/auth';

export const dynamic = 'force-dynamic';

const createToken = async (
  roomId: string,
  role: string,
  displayName: string,
  walletAddress: string,
  avatarUrl: string,
) => {
  const accessToken = new AccessToken({
    apiKey: process.env.API_KEY as string,
    roomId: roomId as string,
    role: role,
    permissions: {
      admin: true,
      canConsume: true,
      canProduce: true,
      canProduceSources: {
        cam: true,
        mic: true,
        screen: true,
      },
      canRecvData: true,
      canSendData: true,
      canUpdateMetadata: true,
    },
    options: {
      metadata: {
        displayName,
        walletAddress,
        avatarUrl
      },
    },
  });

  const token = await accessToken.toJwt();

  return token;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const roomId = searchParams.get('roomId');
  const name = searchParams.get('name');
  const walletAddress = searchParams.get('walletAddress');
  const avatarUrl = searchParams.get('avatarUrl');
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const getRoomData = await fetch(`${appUrl}/api/get-room-metadata` + `?roomId=${roomId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const roomMetaData = await getRoomData.json();
  console.log('roomMetaData', roomMetaData);

  const isHost = roomMetaData?.metadata?.hostWallet === walletAddress;
  console.log('isHost', isHost, roomMetaData?.metadata?.hostWallet, walletAddress);

  if (!roomId) {
    return new Response('Missing roomId', { status: 400 });
  }

  let token: string;

  try {
    // const response = await fetch(
    //   `https://api.huddle01.com/api/v1/live-meeting/preview-peers?roomId=${roomId}`,
    //   {
    //     headers: {
    //       'x-api-key': process.env.API_KEY ?? '',
    //     },
    //   },
    // );
    // const data = await response.json();
    // const { previewPeers } = data;

    token = await createToken(
      roomId,
      isHost ? Role.HOST : Role.LISTENER,
      name ?? 'Guest',
      walletAddress ?? '',
      avatarUrl ?? '',
    );
  } catch (error) {
    console.error('Error :', error);
    token = await createToken(roomId, Role.LISTENER, name ?? 'Guest', walletAddress ?? '', avatarUrl ?? '');
  }

  return new Response(token, { status: 200 });
}