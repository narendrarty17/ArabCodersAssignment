// AddTask.tsx
import React, { useState } from "react";
import { Task } from "../Task";

interface AddTaskProps {
  onTaskAdd: (task: Task) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onTaskAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
    };
    onTaskAdd(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="w-[375px] md:w-[475px] p-6 bg-gray-100 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Add Task</h2>
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
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
