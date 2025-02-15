export async function GET(request: Request) {
    // get the roomId from the query string
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
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
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
}