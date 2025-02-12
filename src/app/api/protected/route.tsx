import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

export async function GET(){
    const session = await getServerSession(authOptions)

    return NextResponse.json({name:session?.user?.name ?? 'Not logged in.'})
}