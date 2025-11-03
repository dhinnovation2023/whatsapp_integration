import { NextRequest, NextResponse } from "next/server";
import { bucket } from "@/config/firebase";

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

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
