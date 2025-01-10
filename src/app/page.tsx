import CreateRoom from "@/components/Room/CreateRoom";

export default async function Home() {
  // const roomId = await createRandomRoom();
  // return <IntroPage roomId={roomId} />;
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <CreateRoom />
    </div>
  );
}
