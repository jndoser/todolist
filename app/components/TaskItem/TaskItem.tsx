"use client";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Space, Typography } from "antd";
import React from "react";
import formatDate from "@/app/utils/formatDate";
import { useGlobalState } from "@/app/context/globalProvider";

const { Text } = Typography;

interface TaskItemProps {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: string;
}

function TaskItem({
  title,
  description,
  date,
  isCompleted,
  isImportant,
  id,
}: TaskItemProps) {
  const { updateTask, deleteTask, openModal, setValueForEditTask } = useGlobalState();
  const clickCheckButtonHandler = () => {
    const task = {
      id: id,
      isCompleted: !isCompleted,
    };
    updateTask(task);
  };
  return (
    <Card
      title={title}
      extra={
        isCompleted ? (
          <Button
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            onClick={clickCheckButtonHandler}
          />
        ) : (
          <Button
            shape="circle"
            icon={<CheckOutlined />}
            onClick={clickCheckButtonHandler}
          />
        )
      }
      style={{ width: 300 }}
      actions={[
        <EditOutlined key="edit-task" onClick={() => {
          const task = {
            id,
            title,
            description,
            date,
            isCompleted,
            isImportant,
          };
          setValueForEditTask(task);
          openModal()
        }} />,
        <DeleteOutlined
          key="delete-task"
          onClick={() => {
            deleteTask(id);
          }}
        />,
      ]}
    >
      <Space
        size="middle"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Text>{description}</Text>
        <Text>{formatDate(date)}</Text>
      </Space>
    </Card>
  );
}

export default TaskItem;
