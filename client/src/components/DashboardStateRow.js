import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardStateRow = (props) => {
    return (
        <tr>
            <td>{props.state}</td>
            <td>{props.minHVP}</td>
            <td>{props.MaxHVP}</td>
            <td>{props.AvgHVP}</td>
        </tr>
    );
}
export default DashboardStateRow;