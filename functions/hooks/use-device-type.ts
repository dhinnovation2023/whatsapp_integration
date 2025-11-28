import { useState, useEffect } from "react";

export default function useDeviceType(): "mobile" | "desktop" {
    const [device, setDevice] = useState<"mobile" | "desktop">("desktop");

    useEffect(() => {
        const checkDevice = () => {
            const isMobile =
                /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
                    navigator.userAgent
                ) || window.innerWidth <= 768;

            setDevice(isMobile ? "mobile" : "desktop");
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);

        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    return device;
}
