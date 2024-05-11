"use client";

import React from "react";
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../components/Tasks/Tasks";

function page() {
  const { completedTasks } = useGlobalState();
  return <Tasks tasks={completedTasks} />;
}

export default page;
