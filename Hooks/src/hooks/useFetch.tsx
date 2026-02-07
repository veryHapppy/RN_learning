import {useState, useEffect} from 'react';

export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setInProgress(true);
                const res = await fetch(url);
                const result = await res.json();
                if (res.ok) {
                    setData(result);
                    setError(null);
                } else {
                    throw result;
                }
            } catch (err: any) {
                setError(err);
            } finally {
                setInProgress(false);
            }
        };
        fetchData();
    }, [count]);

    return {data, error, inProgress, setCount};
};