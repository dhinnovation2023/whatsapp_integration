import { dbConnect } from "@/config/dbConfig";
import TeamMemberModel from "@/models/team-member";

export async function deleteUser(userId: string) {
    return new Promise<void>(async (resolve, reject) => {
        try {

            await dbConnect();
            await TeamMemberModel.findOneAndDelete({ userId })

            return resolve()

        } catch (err) {
            return reject(err);
        }
    })
}