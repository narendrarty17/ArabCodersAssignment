// ViewTask.tsx
import React from "react";
import { Task } from "../Task";
import { Link } from "@remix-run/react";

interface ViewTaskProps {
  tasks: Task[];
}

function limitLetters(str: string, limit: number) {
  if (str.length <= limit) {
    // If the input string length is less than or equal to the limit, return the original string
    return str;
  } else {
    // If the input string length is greater than the limit, return a substring with the first 'limit' letters
    return str.substring(0, limit);
  }
}

const ViewTasks: React.FC<ViewTaskProps> = ({ tasks }) => {
  return (
    <div className="w-[375px] md:w-[475px] p-6 bg-gray-100 rounded-md">
      <h2 className="text-lg font-semibold mb-4">View Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="mb-2 flex justify-between">
            <h3 className="font-semibold">
              <strong>{index + 1}. </strong> {limitLetters(task.title, 30)}
            </h3>
            <Link className="underline" to={`/taskdetail/${task.id}`}>
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTasks;
