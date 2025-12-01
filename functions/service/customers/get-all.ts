import { dbConnect } from "@/config/dbConfig";
import ServiceCustomersModel, { ServiceCustomersModelInterface } from "@/models/service/customers";

export async function getAllServiceCustomers({ currentPage }: {
    currentPage: number,
}) {
    return new Promise<ServiceCustomersModelInterface[]>(async (resolve, reject) => {
        try {
            await dbConnect();
            const limit = 10;
            const skip = (currentPage - 1) * limit;

            const customers = await ServiceCustomersModel.find({}, null, {
                limit,
                skip,
            })

            return resolve(customers);

        } catch (err) {
            return reject(err);
        }
    })
}