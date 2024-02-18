import React, { useState } from "react";
import { Task } from "../Task";

const EditTask: React.FC<{ task: Task; updateTaskHandler: () => void }> = ({
  task,
  updateTaskHandler,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve tasks from local storage
    const tasksJSON = localStorage.getItem("tasks");
    let tasks: Task[] = [];

    if (tasksJSON) {
      tasks = JSON.parse(tasksJSON);
    }

    // Find the index of the task with the matching ID
    const taskIndexToUpdate = tasks.findIndex((t) => t.id === task.id);

    // If the task exists, update its properties
    if (taskIndexToUpdate !== -1) {
      tasks[taskIndexToUpdate].title = title;
      tasks[taskIndexToUpdate].description = description;

      // Save the updated tasks array back to local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
      console.log("Task updated successfully.");
      updateTaskHandler();
    } else {
      console.log("Task not found.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          rows={3}
          value={description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTask;
