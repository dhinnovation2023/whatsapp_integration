import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "@/functions/common";
import { createNewContact } from "@/functions/whatsapp/create-new-contact";
import { makeContactUnread } from "@/functions/whatsapp/makeContactUnread";
import { saveMessageToDB } from "@/functions/whatsapp/saveMessage";
import { sendTextToWhatsapp } from "@/functions/whatsapp/sendToWhatsapp";
import { updateContactRefer } from "@/functions/whatsapp/update-contact-refer";
import CompletionCertCustomersModel, { CompletionCertCustomersModelInterface } from "@/models/completion-cert/customers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {

        await dbConnect();

        const CRONS_SECRET = process.env.CRON_SECRET;

        if (!CRONS_SECRET) {
            throw new Error("Please provide CRON_SECRET in .env file.");
        }

        if (request.headers.get('Authorization') !== `Bearer ${CRONS_SECRET}`) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const sixMonthAgo = new Date();
        sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

        const customersData = await CompletionCertCustomersModel.find(
            {
                $or: [
                    { reminded: false },
                    { reminded: { $exists: false } },
                ],
                dateOfCompletion: {
                    $lt: sixMonthAgo,
                },
            }
        ) as CompletionCertCustomersModelInterface[];

        for (const customer of customersData) {

            const MARKETING_WARRANTY_REMINDER_TEXT = `Dear ${customer.customerName},

This is a gentle reminder that your ${customer.productName} is now due for its scheduled service to ensure optimal performance and longevity.

Please let us know your convenient date and time for the service visit so we can schedule our technician.

Thank you,
PROUDI TRADING FZE  

📞  +971564305251
📧  abhilash@proudi.ae
🌐  www.proudi.ae
📍 Sharjah, United Arab Emirates`;

            await createNewContact({ name: "unknown", phone: customer.phone });
            const { wamid } = await sendTextToWhatsapp({
                phone: customer.phone,
                text: MARKETING_WARRANTY_REMINDER_TEXT,
            })

            await saveMessageToDB({
                customRole: "Automated",
                data: {
                    phone: customer.phone,
                    newMessage: true,
                    role: "team",
                    timestamp: new Date().getTime().toString(),
                    wamid,
                    message: MARKETING_WARRANTY_REMINDER_TEXT,
                }
            })

            await makeContactUnread({
                phone: customer.phone,
            });

            await updateContactRefer({
                phone: customer.phone,
                referSource: "completion-reminder",
            })

            await CompletionCertCustomersModel.findByIdAndUpdate(customer._id,
                {
                    reminded: true,
                }
            )
        }

        return NextResponse.json({ ok: true })

    } catch (err) {
        console.log("Error testing:", err);
        const message = handleCatchBlock(err);
        return NextResponse.json(message, { status: 500 });
    }
}