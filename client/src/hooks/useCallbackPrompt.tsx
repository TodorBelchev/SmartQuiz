import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBlocker from "./useBlocker";

const useCallbackPrompt = (when: boolean): (boolean | (() => void))[] => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState(false);
    const [lastLocation, setLastLocation] = useState<any>(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const cancelNavigation = useCallback(() => {
        setShowPrompt(false);
    }, []);

    const handleBlockedNavigation = useCallback((nextLocation: { location: { pathname: string; }; }) => {
        // in if condition we are checking next location and current location are equals or not
        if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
            setShowPrompt(true);
            setLastLocation(nextLocation);
            return false;
        }
        return true;
    }, [confirmedNavigation, location]);

    const confirmNavigation = useCallback(() => {
        setShowPrompt(false);
        setConfirmedNavigation(true);
    }, []);

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            navigate(lastLocation.location.pathname);
            setConfirmedNavigation(false);
        }
    }, [confirmedNavigation, lastLocation, navigate]);

    useBlocker(handleBlockedNavigation, when);

    return [showPrompt, confirmNavigation, cancelNavigation];

};

export default useCallbackPrompt;