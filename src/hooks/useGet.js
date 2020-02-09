import { useState, useEffect } from 'react';

function useGet(url, effectArr, initialData=[]) {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        (async () => {
            fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setLoading(false);
                setError('');
                setData(data);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
                setData(initialData)
            })
        })()
    }, effectArr)

    return [data, loading, error];
}

export default useGet;