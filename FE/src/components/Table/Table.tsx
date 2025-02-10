import React from 'react';

import PropTypes from 'prop-types';

import { Table as TableAnt } from 'antd';

import './Table.less';


const Table = (props) => {

    const { dataSource, columns, size } = props;

    return (
        <>
            <div className="custom-table">
                <span className="title">Active Bids</span>
                <TableAnt 
                    className="content" 
                    dataSource={dataSource} 
                    columns={columns} 
                    size={size}
                    pagination={false}
                />
            </div>
        </>
        
    )
}

Table.propTypes = {
    dataSource: PropTypes.any,
    columns: PropTypes.any,
    size: PropTypes.oneOfType(['small', 'middle', 'large'])
}

Table.defaultProps = {
    dataSource: [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        }
    ],
    columns: [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ],
    size: 'small',

}
export default Table