"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { Button, Checkbox, DatePicker, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import dayjs from "dayjs";
import React from "react";
import toast from "react-hot-toast";

function CreateTaskForm() {
  const { allTasks, updateTask, closeModal, editTask } = useGlobalState();

  const createTask = async (task: any) => {
    const res = await axios.post("/api/tasks", task);

    if (res.data.error) {
      toast.error(res.data.error);
    }

    if (!res.data.error) {
      toast.success("Task created sucessfully.");
      allTasks();
      closeModal();
    }
  };

  const onFinish = async (values: any) => {
    const task = {
      title: values.title,
      description: values.description,
      date: values.date.toString(),
      completed: values.completed,
      important: values.important,
    };

    console.log(task);

    try {
      if (!editTask) {
        await createTask(task);
      } else {
        let updatedTask = { ...task, id: editTask.id };
        await updateTask(updatedTask);
        allTasks();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      initialValues={{
        title: editTask.title,
        description: editTask.description,
        date: dayjs(editTask.date),
        completed: editTask.isCompleted,
        important: editTask.isImportant,
      }}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="date" label="Date">
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="completed"
        label="Toggle Completed"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        name="important"
        label="Toggle Important"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default CreateTaskForm;
