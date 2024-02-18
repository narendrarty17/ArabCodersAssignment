// TaskManager.tsx
import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import ViewTasks from "./ViewTasks";
import { Task } from "../Task";
import Message from "../utils/Message";

interface Message {
  set: boolean;
  text: string;
  type: string;
}

interface Show {
  set: boolean;
  text: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<Message>({
    set: false,
    text: "",
    type: "",
  });
  const [showBtn, setShowBtn] = useState<Show>({
    set: false,
    text: "Show",
  });

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
      setMessage({
        set: true,
        text: "All tasks have been loaded",
        type: "Success",
      });

      // Reset message after 5 seconds
      setTimeout(
        () =>
          setMessage({
            set: false,
            text: "",
            type: "",
          }),
        2000
      );
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAddition = (newTask: Task) => {
    localStorage.clear();
    setTasks([...tasks, newTask]);
    setMessage({
      set: true,
      text: "New task has been added",
      type: "Success",
    });
    // Reset message after 5 seconds
    setTimeout(
      () =>
        setMessage({
          set: false,
          text: "",
          type: "",
        }),
      2000
    );
  };

  const viewTasksHandler = () => {
    setShowBtn({
      set: !showBtn.set,
      text: showBtn.set ? "Hide" : "Show",
    });
  };

  return (
    <div className="flex flex-col gap-5 items-center mt-10 md:mt-20 h-[100vh]">
      {!showBtn.set && (
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
      {showBtn.set && <ViewTasks tasks={tasks} />}
    </div>
  );
};

export default TaskManager;
