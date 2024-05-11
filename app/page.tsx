"use client";
import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  const { tasks } = useGlobalState();
  console.log(tasks);
  return (
    <main>
      <Tasks tasks={tasks} />
    </main>
  );
}
