import React from "react";

import Main from "../../layouts/Main";

import Input from "../../components/Input/Input";
import Copy from "../../components/CopyToClipboard/Copy";
import TextArea from "../../components/TextArea/TextArea";
import Card from "../../components/Card/Card";
import { Button } from "antd";
import ProductCard from "../../components/Card/ProductCard/ProductCard";
import Table from "../../components/Table/Table";
import NotificationCard from "../../components/Card/NotificationCard/NotificationCard";
import Tabs from "../../components/Tabs/Tabs";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Confirm from "../../components/Confirm/Confirm";
import Alert from "../../components/Alert/Alert";

const Document = () => {
  const items = [
    {
      title: "Application Center",
      href: ""
    },
    {
      title: "Application List",
      href: ""
    }
  ];
  return (
    <>
      <div className="test">
        <div className="code-box-demo">
          <Input />
          <Copy
            textJson={`
    <Input
        value={value}
        placeholder={placeholder}
        variant={variant}
        name={name}
        onChange={(e) => handeChange(e)}
        allowClear={allowClear}
        disabled={disabled}
        classNames={classNames}
        defaultValue={defaultValue}
        maxLength={maxLength}
        size={size}
    />
            `}
          />
        </div>

        <div className="code-box-demo">
          <TextArea />

          <Copy
            textJson={`
    <TextArea
        showCount={showCount}
        maxLength={maxLength}
        onChange={handleChange}
        placeholder={placeholder}
        style={style}
        name={name}
        value={value}
    />      
            `}
          />
        </div>
      </div>
      <div className="test">
        <div className="code-box-demo">
          <Card
            title={
              <>
                <div>
                  <span>Order ID: </span> <br />
                  <span>#000123</span>
                </div>
                <Button>Complete</Button>
              </>
            }
          >
            <p>Test Card </p>
          </Card>

          <Copy
            textJson={`
    <CardAnt
        title={title}
        style={style}
        type={type}
        size={size}
        className="custom-card"
    >
        {children}
    </CardAnt>

    title can be Element like: 
    <div>
        <span>Order ID: </span> <br/>
        <span>#000123</span>
    </div>
    <Button>Complete</Button>

        `}
          />
        </div>
        <div className="code-box-demo">
          <ProductCard />
          <Copy
            textJson={`
    <ProductCard
        name="Product Name"
        quanlity="1000 MT"
        country="US"
        price="$200/MT"
        imageSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    />
    `}
          />
        </div>
      </div>
      <div className="test">
        <div className="code-box-demo">
          <Table />
          <Copy
            textJson={`
    import { Table as TableAnt } from 'antd';

    <TableAnt 
        className="content" 
        dataSource={dataSource} 
        columns={columns} 
        size={size}
        pagination={false}
    />

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
        `}
          />
        </div>

        <div className="code-box-demo">
          <NotificationCard />
          <Copy
            textJson={`
    <NotificationCard
    icon={<TaobaoCircleOutlined />}
    title="New contract opportunities."
    subTitle="Lorem ipsum..."
    />
                `}
          />
        </div>
      </div>
      <div className="test">
        <div className="code-box-demo">
          <Tabs type="card" />
          <Copy
            textJson={`
    <Tabs items={items}/>

    const items = [{
    label: 'Tab 1',
    key: '1',
    children: 'Content of editable tab 1',
    },
    {
    label: 'Tab 2',
    key: '2',
    children: 'Content of editable tab 2',
    },
    {
    label: 'Tab 3',
    key: '3',
    children: 'Content of editable tab 3',
    }]
                `}
          />
        </div>

        <div className="code-box-demo">
          <Breadcrumb />

          <Copy
            textJson={`
    <Breadcrumb
    separator={separator}
    items={items}
    className='custom-breadcrumb'
    />

    separator : <RightOutlined />,
    items : [
        {
            title: <div>
                <span className="divider">|</span>
                Home 
            </div>,
        },
        {
            title: 'Application Center',
            href: '',
        },
        {
            title: 'Application List',
            href: '',
        },
        {
            title: 'An Application',
        }
    ]
            `}
          />
        </div>
      </div>
      <div className="test">
        <div className="code-box-demo">
          <Tabs />
        </div>
        <div className="code-box-demo">
          <Confirm>
            <Button>Show confirm</Button>
          </Confirm>
          <Copy
            textJson={`
    <Confirm 
    handleOk={handleOk}
    handleCancel={handleCancel}
    title="Test titile"
    >
    <Button>Show confirm</Button>
    </Confirm>
            `}
          />
        </div>
      </div>

      <div className="test">
        <div className="code-box-demo">
          <Alert />
        </div>
      </div>
    </>
  );
};

export default Document;
