import React from 'react';
import { List } from 'antd';

function Report(props) {

    const header = <div>{props.reportLines.length} lines</div>;
    return (
        <div>
            <h3 style={{ marginBottom: 16 }}>Reports</h3>
            <List
              header={header}
              bordered
              dataSource={props.reportLines}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
        </div>
    )
}


export default Report;