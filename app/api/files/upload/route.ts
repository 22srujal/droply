import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { drizzle } from "drizzle-orm/neon-http";
import {and, eq} from "drizzle-orm"
import ImageKit from "imagekit";
import {v4 as uuidv4} from "uuid"
import { NextRequest, NextResponse } from "next/server";
import { request } from "http";


//imageKit credentials
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

export async function POST(request: NextRequest) {
    try {
        const {userId} = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        //parse form data
        const formData = await request.formData()
        const file = formData.get("file") as File
        const formUserId = formData.get("userId") as string
        const parentId = formData.get ("parentId") as string || null

        if(formUserId !== userId){
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if(!file){
            return NextResponse.json({ error: 'NO file provided' }, { status: 401 });
        }

        if(parentId){
            const [parentFolder] = await db
                .select()
                .from(files)
                .where(
                    and(
                        eq(files.id, parentId),
                        eq(files.userId, userId),
                        eq(files.isFolder, true),

                    )
                )
        } 

        if(!parentId){
            return NextResponse.json({ error: 'Parent folder not found' }, { status: 401 });
        }



    } catch (error) {
        
    }
}