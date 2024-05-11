"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { Modal } from "antd";
import React, { useState } from "react";

interface CustomModalProps {
  children: React.ReactNode;
}

function CustomModal({ children }: CustomModalProps) {
  const { isOpenModal, closeModal } = useGlobalState();
  return (
    <Modal
      title="Add New Task"
      open={isOpenModal}
      onCancel={closeModal}
      footer={[]}
      centered
      width={900}
      style={{ padding: "30px" }}
      styles={{
        body: {
          padding: "30px",
        },
      }}
    >
      {children}
    </Modal>
  );
}

export default CustomModal;
