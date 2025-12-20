import { dbConnect } from "@/config/dbConfig";
import WarrantyCustomersModel, { WarrantyCustomersModelInterface } from "@/models/warranty/customers";

export interface GetAllWarrantyCustomersRequestData {
    currentPage: number,
}

export async function getAllWarrantyCustomers(data: GetAllWarrantyCustomersRequestData) {
    return new Promise<WarrantyCustomersModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();

            const limit = 10;
            const skip = (data.currentPage - 1) * limit

            const customersData = await WarrantyCustomersModel.find({}, null, {
                limit,
                skip,
                sort: {
                    createdAt: -1,
                }
            })

            return resolve(customersData);
        } catch (err) {
            return reject(err);
        }
    })
}