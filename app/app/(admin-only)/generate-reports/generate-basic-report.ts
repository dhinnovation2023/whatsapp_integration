import { GenerateBasicReportRequestDataInterface } from "@/functions/reports/basic-report";
import axios from "axios";

export async function generateBasicReportFromClient (options: GenerateBasicReportRequestDataInterface) {
    return new Promise<string>(async (resolve, reject) => {
        try {
            const requestData: GenerateBasicReportRequestDataInterface = options;
            const {
                data: sheetUrl,
            } = await axios.post('/api/reports/basic-report', requestData);

            if (!sheetUrl) {
                throw new Error("Sheet URL not found.")
            }

            return resolve(sheetUrl);
        } catch (err) {
            return reject(err);
        }
    })
}