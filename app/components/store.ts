import { create } from "zustand";

type TaskStore = {
  edit: boolean;
  message: {
    set: boolean;
    text: string;
    type: string;
  };
  showAddBtn: {
    set: boolean;
    text: string;
  };
  setAddBtn: () => void;
  setEdit: () => void;
  loaded: () => void;
  added: () => void;
  reset: () => void;
  updated: () => void;
  deleted: () => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  showAddBtn: {
    set: false,
    text: "Show",
  },
  setAddBtn: () =>
    set((state) => ({ showAddBtn: { set: !state.showAddBtn.set, text: "" } })),
  edit: false,
  setEdit: () => set((state) => ({ edit: !state.edit })),
  message: {
    set: false,
    text: "",
    type: "",
  },
  added: () => {
    set({
      message: { set: true, text: "Task added successfully", type: "Success" },
    });
  },
  loaded: () => {
    set({
      message: {
        set: true,
        text: "All tasks have been loaded",
        type: "Success",
      },
    });
  },
  reset: () => {
    set({
      message: { set: false, text: "", type: "" },
    });
  },
  updated: () => {
    set({
      message: {
        set: true,
        text: "Task updated successfully",
        type: "Success",
      },
    });
  },
  deleted: () => {
    set({
      message: {
        set: true,
        text: "Task deleted successfully",
        type: "Success",
      },
    });
  },
}));
