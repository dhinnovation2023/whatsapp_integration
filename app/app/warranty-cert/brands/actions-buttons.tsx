'use client';

import axios from "axios";
import { useRouter } from "next/navigation";

const ActionsButtons = ({ href, label }: {
    label: string,
    href: string,
}) => {

    const router = useRouter();

    return (
        <button
            className='py-2 px-4 bg-foreground text-background rounded-2xl cursor-pointer'
            onClick={async () => {
                if (label.toLowerCase() === "delete") {
                    const confirm = window.confirm(`Please confirm deleting`);
                    if (!confirm) {
                        return;
                    }

                    await axios.get(href);
                    router.refresh();
                    return;
                }

                router.push(href);

            }}
        >
            {label}
        </button>
    )
}

export default ActionsButtons