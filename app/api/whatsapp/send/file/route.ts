import { handleCatchBlock } from "@/functions/common";
import { saveLocalFileToFirebase } from "@/functions/whatsapp/saveFileToFirebase";
import { sendFileToWhatsapp } from "@/functions/whatsapp/sendToWhatsapp";
import MessagesModel from "@/models/messages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();

        const file = formData.get("file") as File;
        const phone = formData.get("phone")?.toString();

        if (!file || !phone) {
            throw new Error("File and Phone is required!");
        }

        const filePath = await saveLocalFileToFirebase({
            chatRole: "team",
            file,
            mime_type: file.type,
            phone,
        })

        const messageeId = await sendFileToWhatsapp({
            filrebaseFileUrl: filePath,
            phone,
        });

        console.log("Updating in database....", messageeId)

        await MessagesModel.findOneAndUpdate({
            "attachments.path": filePath,
        }, {
            wamid: messageeId,
        })

        return NextResponse.json(true);

    } catch (err) {
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 })
    }
}