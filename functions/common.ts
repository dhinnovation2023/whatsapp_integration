import { AxiosError } from "axios";

// eslint-disable-next-line
export function handleCatchBlock(err: any) {
    console.log(err);
    let message = '';

    if (err instanceof AxiosError) {
        if (err.response?.data) {
            message = err.response.data;
        } else {
            message = err.message;
        }
    } else if (err instanceof Error) {
        message = err.message;
    } else if (typeof err === "string") {
        message = err;
    } else {
        message = "Something went wrong!";
    }

    return message;
}

export const mimeMap: Record<string, string> = {
    'application/pdf': 'pdf',
    'text/plain': 'txt',
    'text/html': 'html',
    'application/json': 'json',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/zip': 'zip',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
};