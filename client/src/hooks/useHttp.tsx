import { useState, useCallback, useEffect } from 'react';

import { notificationActions } from '../store/notification';
import { useAppDispatch, useAppSelector } from './useRedux';

type reqConfig = {
    url: string;
    method?: string;
    headers?: {};
    body?: any;
}

const useHttp = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string[] | null>(null);
    const notificationState = useAppSelector(state => state.notification);
    const user = useAppSelector(state => state.auth);

    const sendRequest = useCallback(async (requestConfig: reqConfig, applyData: (arg0: any) => void) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method || 'GET',
                credentials: 'include',
                headers: { ...requestConfig.headers, 'Authorization': `Bearer ${user.access_token}` || '' } || {},
                body: requestConfig.body || null
            });

            if (!response.ok && requestConfig.url.endsWith("/login")) {
                throw new Error(JSON.stringify(["Invalid credentials"]));
            }

            const data = await response.json();

            if (!response.ok) { throw new Error(JSON.stringify(data.messages)); }

            setIsLoading(false);
            applyData(data);
        } catch (err) {
            const errorMessages = JSON.parse((err as Error).message);
            setError(errorMessages);
            setIsLoading(false);
        }
    }, [user.access_token]);

    useEffect(() => {
        if (error) {
            dispatch(notificationActions.show({ type: 'error', text: error }));
        }
        if (notificationState.text.length === 0) {
            setError(null);
        }
    }, [dispatch, error, notificationState.text]);

    return {
        isLoading,
        error,
        setError,
        sendRequest,
    };
};

export default useHttp;