import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Task } from "~/components/Task";
import Message from "~/components/utils/Message";
import EditTask from "~/components/TaskDetails/EditTask";
import { useTaskStore } from "~/components/store";

function limitLetters(str: string, limit: number) {
  if (str.length <= limit) {
    // If the input string length is less than or equal to the limit, return the original string
    return str;
  } else {
    // If the input string length is greater than the limit, return a substring with the first 'limit' letters
    return str.substring(0, limit);
  }
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

function deleteTaskById(id: string): boolean {
  // Retrieve tasks from local storage
  const tasksJSON = localStorage.getItem("tasks");
  let tasks = [];

  if (tasksJSON) {
    tasks = JSON.parse(tasksJSON);
  }

  // ID of the task you want to delete
  const taskIdToDelete = id;

  // Find the index of the task with the matching ID
  const taskIndexToDelete = tasks.findIndex(
    (task: Task) => task.id === taskIdToDelete
  );

  // If the task exists, remove it from the array
  if (taskIndexToDelete !== -1) {
    tasks.splice(taskIndexToDelete, 1);

    // Save the updated tasks array back to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Task deleted successfully.");
    return true;
  } else {
    console.log("Task not found.");
    return false;
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  return id;
}

export default function TaskDetail() {
  const edit = useTaskStore((state) => state.edit);
  const setEdit = useTaskStore((state) => state.setEdit);
  const message = useTaskStore((state) => state.message);
  const deleted = useTaskStore((state) => state.deleted);

  const id = useLoaderData<typeof loader>();
  const task = id && findTaskById(id);
  const title = task && task.title;
  const description = task && task.description;
  console.log(task);

  return (
    <div className="w-[100%] flex flex-col items-center">
      {message.set && <Message message={message} />}
      <div className="flex flex-col gap-2 justify-start h-[100vh] w-[375px] md:w-[700px] px-6 pt-6 bg-gray-100 rounded-md">
        <h2 className="text-lg font-bold">
          {edit ? "Edit Task" : "Tasks Details"}
        </h2>
        {!edit && !message.set && (
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="font-semibold">Title</h3>
              <span>{title && limitLetters(title, 30)}</span>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <span>{description}</span>
            </div>
          </div>
        )}
        {!edit && (
          <div className="flex gap-5">
            <button
              className="px-4 py-2 w-24 bg-blue-500 text-white rounded-md"
              onClick={() => {
                setEdit();
              }}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 w-24 bg-blue-500 text-white rounded-md"
              onClick={() => {
                deleteTaskById(id);
                deleted();
              }}
            >
              Delete
            </button>
          </div>
        )}
        {edit && task && <EditTask task={task} />}
        {edit && (
          <button
            className="px-4 py-2 w-48 bg-blue-500 text-white rounded-md"
            onClick={() => {
              setEdit();
            }}
          >
            Go Back to Task Detail
          </button>
        )}
        <Link className="underline" to="/">
          Go to Add Task
        </Link>
      </div>
    </div>
  );
}
