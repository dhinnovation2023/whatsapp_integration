import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "@/functions/common";
import { createNewContact } from "@/functions/whatsapp/create-new-contact";
import { makeContactUnread } from "@/functions/whatsapp/makeContactUnread";
import { saveMessageToDB } from "@/functions/whatsapp/saveMessage";
import { sendTextToWhatsapp } from "@/functions/whatsapp/sendToWhatsapp";
import { updateContactRefer } from "@/functions/whatsapp/update-contact-refer";
import WarrantyCustomersModel, { WarrantyCustomersModelInterface } from "@/models/warranty/customers";
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

        const customersData = await WarrantyCustomersModel.find(
            {
                $or: [
                    { reminded: false },
                    { reminded: { $exists: false } },
                ],
                currentDate: {
                    $lt: sixMonthAgo,
                },
            }
        ) as WarrantyCustomersModelInterface[];

        for (const customer of customersData) {

            const MARKETING_WARRANTY_REMINDER_TEXT = `Dear ${customer.customerName},

This is a friendly reminder that your ${customer.productName}, installed on ${(customer.currentDate instanceof Date ? customer.currentDate : new Date(customer.currentDate)).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} in ${customer.location}, is due for its 6-month service as per the warranty terms.

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
                referSource: "warranty-reminder",
            })

            await WarrantyCustomersModel.findByIdAndUpdate(customer._id,
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