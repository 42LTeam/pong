import React, {useEffect, useCallback, useState, useRef} from "react"
import "../../css/errorpopup.css"

const NOTIFCATION_ERROR = "notificationError"

export const sendNotificationError = (reason: string) => {
    const event = new CustomEvent(NOTIFCATION_ERROR, {detail: reason});
    dispatchEvent(event);
}

export function PopupError() {
    const [errorMsg, setError] = useState<string | null>(null);

    const timeoutRef = useRef<NodeJS.Timeout>();

    const handleEvent = useCallback((error) => {
        setError(error.detail);
    }, []);

    useEffect(() => {
        window.addEventListener(NOTIFCATION_ERROR, handleEvent)
        return  () => window.removeEventListener(NOTIFCATION_ERROR, handleEvent);
    }, [handleEvent])

    useEffect(() => {
        if (errorMsg !== null) {
            timeoutRef.current = setTimeout(() => {
                setError(null)
            }, 4000)

            return () => clearTimeout(timeoutRef.current);
        }
    }, [errorMsg])

    if (errorMsg === null)
    {
        return;
    }
    return (
        <>
            {
                errorMsg &&
                <div className="errorpopup">
                    {errorMsg}
                </div>
            }
        </>
    )
}