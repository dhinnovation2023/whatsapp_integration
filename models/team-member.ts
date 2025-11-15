import mongoose from "mongoose";

export interface TeamMembersModelInterface {
    userId: string,
    name: string,
    email: string,
    password: string,
    labelColor?: string,
}

const teamMembersSchema = new mongoose.Schema<TeamMembersModelInterface>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    labelColor: {
        type: String,
    }
})

const TeamMemberModel = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMembersSchema);
export default TeamMemberModel;