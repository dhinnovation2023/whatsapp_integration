import { AxiosError } from "axios";

// eslint-disable-next-line
export function handleCatchBlock(err: any) {
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

export function FormateDateInMessage({ timeStanp }: {
    timeStanp: number
}) {
    const date = new Date(timeStanp)

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    const formattedDate = `${day}/${month}/${year} ${formattedTime}`;

    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);

    if (!isDifferentDay(today, date)) {
        return "Today" + ` ${formattedTime}`;
    } else if (!isDifferentDay(yesterday, date)) {
        return "Yesterday" + ` ${formattedTime}`;
    }

    return formattedDate;
}

export function isDifferentDay(currentDate: Date, prevDate: Date) {
    const isDifferent =
        currentDate.getFullYear() !== prevDate.getFullYear() ||
        currentDate.getMonth() !== prevDate.getMonth() ||
        currentDate.getDate() !== prevDate.getDate();

    return isDifferent;
}