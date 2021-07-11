import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

interface IUserTableProps {}

const UserTable: React.FunctionComponent<IUserTableProps> = props => {
  //   const DragHandle = sortableHandle(() => (
  //     <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
  //   ));
  const [tableData, setTable] = useState([]);
  useEffect(() => {
    setTable(data);
  }, []);

  // 1.定义拖拽把手
  const DragHandle = SortableHandle(() => (
    <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
  ));

  // 2.定义拖拽容器

  const StortTBItem = SortableElement((props: any) => (
    <tr useDragHandle disableAutoscroll helperClass="row-dragging" {...props} />
  ));
  const StortTBContain = SortableContainer((props: any) => (
    <tbody {...props} />
  ));

  // 3.定义拖拽方法

  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      index: 0,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      index: 1,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      index: 2,
    },
  ];

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove(
        [].concat(tableData),
        oldIndex,
        newIndex,
      ).filter(el => !!el);
      setTable(newData);
    }
  };
  const DragContainer = (props: any) => (
    <StortTBContain
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = tableData.findIndex(
      (x: any) => x.index === restProps['data-row-key'],
    );
    return <StortTBItem index={index} {...restProps} />;
  };

  return (
    <div className="UserTable">
      <Table
        rowKey="index"
        columns={columns}
        dataSource={tableData}
        components={{
          body: {
            wrapper: DragContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </div>
  );
};

export default UserTable;
