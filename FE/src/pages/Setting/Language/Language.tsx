import React from 'react';
import { Flex } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons/faGlobeAmericas";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';


const Language = () => {
    return (
        <Flex gap="large" vertical className="language">
        <Flex
          className="info-box"
          align="center"
          justify="space-between"
          style={{ width: "100%" }}
        >
          <Flex vertical gap="small">
            <div className="block-title">Language</div>
            <div className="block-sub-title">
            Securely stores users' payment and banking information for more convenient transactions.
            </div>
          </Flex>
          
        </Flex>
        
      </Flex>
    )
}

export default Language;