import { useState, useEffect } from 'react';

function getOptions(type, body) {
    switch(type) {
        case 'get':
            return { method: 'get'}
        case 'post':
            return { 
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        case 'put':
            return { method: 'put'}
        case 'delete': 
            return { method: 'delete'}
        default:
            return { method: 'get'}
    }
}

function useAPI(url, type, effectArr, initialData=[]) {
    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        (async () => {
            fetch(url, getOptions(type))
            .then(resp => resp.json())
            .then(data => {
                setLoading(false);
                setError('');
                setData([...initialData, ...data]);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            })
        })()
    }, effectArr)

    return [data, loading, error];
}

export default useAPI;