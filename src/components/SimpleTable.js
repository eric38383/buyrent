import React from 'react';

const SimpleTable = ({ headers, data, dataFormatter, keys }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            {headers.map(item => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const obj = dataFormatter(item);
            return (
              <tr key={index}>
                {keys.map((item, index) => (
                  <td key={index}>{obj[item]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}


export default SimpleTable;