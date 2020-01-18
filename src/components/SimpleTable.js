import React from 'react';

const SimpleTable = ({ headers, data, dataFormatter, keys }) => {
    return (
        <table className='table'>
            <thead>
                {headers.map((item) => <th>{item}</th>)}
            </thead>
            <tbody>
                {data.map((item) => {
                    const obj = dataFormatter(item);
                    return (
                        <tr>
                            {keys.map(item => <td>{obj[item]}</td>)}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}


export default SimpleTable;