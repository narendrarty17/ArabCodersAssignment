// ViewTask.tsx
import React, { useState } from "react";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import { LoaderFunctionArgs } from "@remix-run/node";

interface Task {
  id: string;
  // other properties of Task
}

function findTaskById(id: string): Task | undefined {
  console.log("Id inside findTaskById: ", id);
  // Retrieve tasks from local storage
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const tasks: Task[] = JSON.parse(storedTasks);
    // Find task with the given id
    return tasks.find((task) => parseInt(task.id) == parseInt(id));
  }
  return undefined; // Return undefined if tasks are not found or storage is empty
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("id inside loader: ", id);
  return id;
}

const TasksDetail: React.FC = () => {
  // extract 'id' query parameter

  const id = useLoaderData<string>();
  console.log("data: ", id);

  return (
    <div className="w-[375px] md:w-[475px] p-6 bg-gray-100 rounded-md">
      <h1>{id}</h1>
    </div>
  );
};

export default TasksDetail;
