"use client";
import { Col, Divider, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import CustomModal from "../CustomModal/CustomModal";
import CreateTaskForm from "../CreateTaskModal/CreateTaskForm";

interface TasksProps {
  tasks: any[];
}

function Tasks({ tasks }: TasksProps) {
  return (
    <>
      <Flex align="center" justify="space-between">
        <CustomModal>
          <CreateTaskForm />
        </CustomModal>
        <Title level={3} style={{ marginTop: 0 }}>
          My Tasks
        </Title>
      </Flex>
      <Divider />
      <Row gutter={[{}, { xs: 16, sm: 16 }]}>
        {tasks.map((task) => (
          <Col className="gutter-row" xs={9} sm={7}>
            <TaskItem
              title={task.title}
              description={task.description}
              date={task.date}
              isCompleted={task.isCompleted}
              isImportant={task.isImportant}
              id={task.id}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Tasks;
