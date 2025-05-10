import React from "react";
import { Task } from "@/types";

type Props = {
  editedTask: Task;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  toggleEdit: () => void;
};

const CardForm = ({
  editedTask,
  handleChange,
  handleSubmit,
  toggleEdit,
}: Props) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full justify-between h-full"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full gap-x-2 justify-between">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded-sm p-1 text-[12px] grow"
          />
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="border rounded-sm p-1 text-xs"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded-sm p-1 text-[12px] max-h-24 min-h-[96px] resize-none overflow-y-auto"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={toggleEdit}
          className="px-4 py-2 bg-black hover:bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CardForm;
