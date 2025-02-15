import { uploadFileToR2 } from "@/lib/files";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;
        if (!file) {
            return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
        }
        const fileKey = uuidv4();
        const response = await uploadFileToR2(file, "yapster", fileKey);
        return NextResponse.json({ success: true, imageKey: fileKey });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}