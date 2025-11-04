"use server";

import { dbConnect } from "@/config/dbConfig";
import { handleCatchBlock } from "../common";
import TeamMemberModel, { TeamMembersModelInterface } from "@/models/team-member";
import { compareHashValue } from "../bcrypt";

export interface VerifyUserRequestData {
    email: string,
    password: string,
}

export async function verifyUser({
    email,
    password,
}: VerifyUserRequestData) {
    return new Promise<{
        name: string,
        email: string,
        userId: string,
    }>(async (resolve, reject) => {
        try {
            await dbConnect();
            const user = await TeamMemberModel.findOne({ email }) as TeamMembersModelInterface;

            if (!user) {
                throw new Error("User not found");
            }

            const isPasswordMatching = compareHashValue(password, user.password);

            if (!isPasswordMatching) {
                throw new Error("Password is not correct!");
            }

            return resolve({
                name: user.name,
                email: user.email,
                userId: user.userId,
            })

        } catch (err) {
            const message = handleCatchBlock(err);
            return reject(message);
        }
    })
}