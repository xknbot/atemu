import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // 1. Define the data you want to send back.
    // 2. Return a new NextResponse with that data.

    const data = {
        message: "Hello from backend!"
    }
    return NextResponse.json(data);

}