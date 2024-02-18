// TaskManager.tsx
import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import ViewTasks from "./ViewTasks";
import { Task } from "../Task";
import Message from "../utils/Message";
import { useTaskStore } from "../store";

interface Message {
  set: boolean;
  text: string;
  type: string;
}

const TaskManager: React.FC = () => {
  const showAddBtn = useTaskStore((state) => state.showAddBtn);
  const setAddBtn = useTaskStore((state) => state.setAddBtn);
  const message = useTaskStore((state) => state.message);
  const added = useTaskStore((state) => state.added);
  const reset = useTaskStore((state) => state.reset);
  const loaded = useTaskStore((state) => state.loaded);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks((prevTasks) => {
        // Combine previous tasks with the parsed tasks from local storage
        return [...prevTasks, ...parsedTasks];
      });

      // Show success message when data is loaded
      loaded();

      // Reset message after 5 seconds
      setTimeout(() => reset(), 2000);
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAddition = (newTask: Task) => {
    localStorage.clear();
    setTasks([...tasks, newTask]);
    added();
    // Reset message after 5 seconds
    setTimeout(() => reset(), 2000);
  };

  const viewTasksHandler = () => {
    setAddBtn();
  };

  return (
    <div className="flex flex-col gap-5 items-center mt-10 md:mt-20 h-[100vh]">
      {!showAddBtn.set && (
        <div className="flex flex-col">
          <Message message={message} />
          <AddTask onTaskAdd={handleTaskAddition} />
        </div>
      )}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={viewTasksHandler}
      >
        View/Hide all Tasks
      </button>
      {showAddBtn.set && <ViewTasks tasks={tasks} />}
    </div>
  );
};

export default TaskManager;
