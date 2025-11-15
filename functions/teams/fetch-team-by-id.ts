import { dbConnect } from "@/config/dbConfig";
import TeamMemberModel, { TeamMembersModelInterface } from "@/models/team-member";

export async function fetchTeamMemberByUserId(userId: string) {
    return new Promise<TeamMembersModelInterface>(async (resolve, reject) => {
        try {
            await dbConnect();
            const user = await TeamMemberModel.findOne({ userId }, "name email labelColor") as TeamMembersModelInterface;

            if (!user) {
                throw new Error("User not found!");
            }

            return resolve(user);
            
        } catch (err) {
            return reject(err);
        }
    })
}