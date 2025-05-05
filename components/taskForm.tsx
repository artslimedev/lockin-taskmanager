import { useState } from "react";
import { createTask } from "@/server";
import Button from "./button";

type Props = {
  formTitle: string;
  task?: {};
  isEditing?: boolean;
  handleTaskForm: () => void;
};

interface Task {
  title: string;
  description: string;
  status: TaskStatus;
}

type TaskStatus = "Open" | "In Progress" | "Completed";

const TaskForm = (props: Props) => {
  const { formTitle, isEditing, handleTaskForm } = props;
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "Open",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      console.log("editing form");
    }
    console.log("submitting form");
    await createTask(formValues);
    setFormValues({
      title: "",
      description: "",
      status: "Open",
    });
    handleTaskForm();
    console.log("success");
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{formTitle}</h2>
      <form
        id="taskForm"
        name="taskForm"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-1/3"
      >
        <input
          className="border-1 rounded p-1"
          type="text"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          placeholder="Task Title"
        />
        <textarea
          className="border-1 rounded p-1"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <select
          defaultValue={"Status"}
          onChange={handleChange}
          className="border-1 rounded p-1"
        >
          <option value={"Open"}>Open</option>
          <option value={"In Progress"}>In Progress</option>
          <option value={"Closed"}>Closed</option>
        </select>
        <div className="flex gap-4 w-96 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Add Task
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-black hover:bg-gray-500 text-white rounded"
            onClick={handleTaskForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
