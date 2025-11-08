import { NextRequest, NextResponse } from "next/server";
import { bucket } from "@/config/firebase";
import { mimeMap } from "@/functions/common";

export async function GET(request: NextRequest, { params }: {
  params: Promise<{
    filename: string,
  }>,
}) {

  const { filename } = (await params);
  
  const file = bucket.file(`${filename}`);

  try {
    const [metadata] = await file.getMetadata();
    const contentType = metadata.contentType || "application/octet-stream";

    const [buffer] = await file.download();
    const uint8Array = new Uint8Array(buffer);

    const ext = mimeMap[contentType] || contentType.split('/')[1] || '';

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename + '.' + ext}"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
