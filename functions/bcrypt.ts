import bcrypt from "bcrypt";

export async function generateHashFromValue(value: string) {
    'use server';

    return new Promise<string>(async (resolve, reject) => {
        try {

            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const hashPassword = await bcrypt.hash(value, salt)

            return resolve(hashPassword);

        } catch (err) {
            return reject(err);
        }
    })
}

export async function compareHashValue (value: string, hash: string) {
    return new Promise<boolean>(async (resolve, reject) => {
        try {

            const isMatching = await bcrypt.compare(value, hash);
            return resolve(isMatching)

        } catch (err) {
            return reject(err);
        }
    })
}