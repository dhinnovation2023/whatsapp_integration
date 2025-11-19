'use server';

import { dbConnect } from "@/config/dbConfig";
import ContactsModel, { ContactsModelInterface } from "@/models/contacts";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { fetchTeamMemberByUserId } from "../teams/fetch-team-by-id";
import { getOneStatusById } from "../status/get-status-by-id";
import { getGoogleOAuthClient } from "../google-auth/googleOAuth";
import OptionsModel, { OptionsModelInterface } from "@/models/options";
import { Credentials } from "google-auth-library";

export interface GenerateBasicReportRequestDataInterface {
    date: {
        start: number,
        end: number,
    },
    userId?: string,
}

interface BasicReportDataRowInterface {
    "date": string,
    "customer_name": string,
    "mob_no": string,
    "sales_person/user": string,
    "remarks/status": string,
    "chat_url": string,
}

export async function generateBasicReport({ date, userId }: GenerateBasicReportRequestDataInterface) {
    return new Promise(async (resolve, reject) => {
        try {
            let startDate, endDate;
            const basicReportDataRow: BasicReportDataRowInterface[] = []

            await dbConnect();

            const findQuery: {
                // eslint-disable-next-line
                [key: string]: any,
            } = {};


            if (date) {

                startDate = new Date(date.start);
                endDate = new Date(date.end);

                if (date.start > date.end) {
                    throw new Error("'Start date' should be before 'End date'")
                }

                findQuery["createdAt"] = {
                    $gte: startDate,
                    $lte: endDate,
                };

            }

            if (userId) {
                findQuery["assigned"] = userId;
            }

            if (!startDate || !endDate) {
                throw new Error("Start date and end date is required!");
            }

            const contacts = await ContactsModel.find(findQuery) as ContactsModelInterface[];

            const oauth2Client = getGoogleOAuthClient();
            const googleAuthOption = await OptionsModel.findOne({ name: "google-oauth" }) as OptionsModelInterface;
            const credentials = JSON.parse(googleAuthOption.value) as Credentials;
            oauth2Client.setCredentials(credentials);

            const mainSheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(
                oauth2Client,
                {
                    title: `WhatsApp Report from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
                }
            );

            // mainSheet.setPublicAccessLevel("writer");

            const currentSheet = mainSheet.sheetsByIndex[0];

            if (!currentSheet) {
                throw new Error("Spread sheet first tab not found!");
            }

            currentSheet.setHeaderRow(
                [
                    "date",
                    "customer_name",
                    "mob_no",
                    "sales_person/user",
                    "remarks/status",
                    "chat_url",
                ],
            );

            for (const contact of contacts) {

                let salesPerson, status, chatUrl;

                if (contact.assigned) {
                    const teamData = await fetchTeamMemberByUserId(contact.assigned);
                    if (teamData) {
                        salesPerson = teamData.name;
                    }
                }

                if (contact.statusId) {
                    const statusData = await getOneStatusById(contact.statusId);
                    if (statusData) {
                        status = statusData.name;
                    }
                }

                const PRODUCTION_BASE_URL = process.env.PRODUCTION_BASE_URL;

                if (!PRODUCTION_BASE_URL) {
                    throw new Error("Please provide PRODUCTION_BASE_URL in .env file");
                }

                if (contact.phone) {
                    chatUrl = `${PRODUCTION_BASE_URL}/app?phone=${contact.phone}`;
                }

                const dateString = `${contact.createdAt.getDate().toString().padStart(2, '0')}/${(contact.createdAt.getMonth() + 1).toString().padStart(2, '0')}/${contact.createdAt.getFullYear()}`;
                const row: BasicReportDataRowInterface = {
                    date: dateString,
                    customer_name: contact.name,
                    mob_no: contact.phone,
                    "sales_person/user": salesPerson || "Not set",
                    "remarks/status": status || "Not set",
                    chat_url: chatUrl || "Not set",
                }
                basicReportDataRow.push(row);
            }

            // eslint-disable-next-line
            await currentSheet.addRows(basicReportDataRow as any);

            return resolve(`https://docs.google.com/spreadsheets/d/${mainSheet.spreadsheetId}`);

        } catch (err) {
            return reject(err);
        }
    })
}

