import { dbConnect } from "@/config/dbConfig";
import TeamMemberModel, { TeamMembersModelInterface } from "@/models/team-member";

export async function fetchTeamMembers (projection: string) {
    return new Promise<TeamMembersModelInterface[]>(async (resolve, reject) => {
        try {

            await dbConnect();

            const users = await TeamMemberModel.find({}, projection);
            return resolve(users);

        } catch (err) {
            return reject(err);
        }
    })
}