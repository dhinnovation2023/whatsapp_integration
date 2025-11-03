import axios from "axios";
import { Session } from "next-auth";

export async function getClientSession () {
    return new Promise<Session>(async (resolve, reject) => {
        try {

            const response = await axios.get('/api/auth/session');
            return resolve(response.data);

        } catch (err) {
            return reject(err);
        }
    })
}