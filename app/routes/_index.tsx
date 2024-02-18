import type { MetaFunction } from "@remix-run/node";
import TaskManager from "~/components/AddAndView/TaskManager";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <TaskManager />
    </>
  );
}
