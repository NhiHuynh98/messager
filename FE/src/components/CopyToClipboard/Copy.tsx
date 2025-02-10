import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { CopyOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';

import { Flex } from 'antd';

import './Copy.less';

const Copy = ({ textJson }) => {
    const [isShow, setShow] = useState(false);

    return (
        <>
        <div className='show-code'>
            {!isShow ? <DownOutlined style={{ marginLeft: 'auto',  marginTop: 10 }} onClick={() => setShow(true)}/>
            : <UpOutlined style={{ marginLeft: 'auto',  marginTop: 10 }} onClick={() => setShow(false)} />
            }
        </div>
        {
            isShow && 
            <Flex align="normal" justify="space-between">
                <pre className="pre-code">{textJson}
                <CopyToClipboard text={textJson}>
                    <CopyOutlined />
                </CopyToClipboard>
                </pre>
                
            </Flex>
        }
        </>
        
    )
}

export default Copy;