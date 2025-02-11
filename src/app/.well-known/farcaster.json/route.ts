export async function GET() {

    const config = {
        accountAssociation: {
            header: "eyJmaWQiOjY4NjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhBNTkzMUE3MjZDRUNjYTA1N0EzRkY0M0E4NDg4MzQ2NjI2MDQ3OEI0In0",
            payload: "eyJkb21haW4iOiJ5YXBzdGVyLmZ1biJ9",
            signature: "MHhiNDM1NDhiM2Q1OGQ0ZDIxZGYxMmRhYmJhYWZkZDE0ZDdlNmE2NjI5MDNiOTYzNTE4NDBiYjI3NDBkZTAwMDYyMGZmZGU0YzEzMTM2OTNhOGFmNWY2NzhiN2E2Zjk1NGIyODQ3MWUwNzY4MGFkYjNlMzYyOTUwNGY5MGRkZWY0MzFi"
        },
        frame: {
            version: "1",
            name: "Yapster",
            iconUrl: "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/logo_full_yapster.png",
            homeUrl: "https://yapster.fun",
            imageUrl: "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/main%20image.png",
            buttonTitle: "Start Yapping",
            splashImageUrl: "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/logo_full_yapster.png",
            splashBackgroundColor: "#000000",
            webhookUrl: "https://yapster.fun/api/webhook"
        }
    }

    return Response.json(config);

}