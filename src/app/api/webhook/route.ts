import {
    ParseWebhookEvent,
    parseWebhookEvent,
    verifyAppKeyWithNeynar,
} from "@farcaster/frame-node";
import { NextRequest } from "next/server";
import {
    deleteUserNotificationDetails,
    setUserNotificationDetails,
} from "@/lib/kv";
import { sendFrameNotification } from "@/lib/notifs";

export async function POST(request: Request) {
    const requestJson = await request.json();

    console.log(requestJson, "request json");

    let data;
    try {
        data = await parseWebhookEvent(requestJson, verifyAppKeyWithNeynar);
        console.log(data, "parsed webhook event");
    } catch (e: unknown) {
        const error = e as ParseWebhookEvent.ErrorType;

        switch (error.name) {
            case "VerifyJsonFarcasterSignature.InvalidDataError":
            case "VerifyJsonFarcasterSignature.InvalidEventDataError":
                // The request data is invalid
                return new Response(JSON.stringify({ success: false, error: error.message }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                });
            case "VerifyJsonFarcasterSignature.InvalidAppKeyError":
                // The app key is invalid
                return new Response(JSON.stringify({ success: false, error: error.message }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            case "VerifyJsonFarcasterSignature.VerifyAppKeyError":
                // Internal error verifying the app key (caller may want to try again)
                return new Response(JSON.stringify({ success: false, error: error.message }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
        }
    }

    const fid = data.fid;
    const event = data.event;

    console.log(event, "event");

    switch (event.event) {
        case "frame_added":
            if (event.notificationDetails) {
                await setUserNotificationDetails(fid, event.notificationDetails);
                const addNotif = await sendFrameNotification({
                    fid,
                    title: "Welcome,now you got a space to Yap",
                    body: "You'll be notified when we have updates",
                });
                console.log(addNotif, "addNotif");
            } else {
                const removeNotif = await deleteUserNotificationDetails(fid);
                console.log(removeNotif, "removeNotif");
            }

            break;
        case "frame_removed":
            await deleteUserNotificationDetails(fid);

            break;
        case "notifications_enabled":
            await setUserNotificationDetails(fid, event.notificationDetails);
            await sendFrameNotification({
                fid,
                title: "Pov Yapster: :)",
                body: "Sed to see you disable notifications",
            });

            break;
        case "notifications_disabled":
            await deleteUserNotificationDetails(fid);

            break;
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}