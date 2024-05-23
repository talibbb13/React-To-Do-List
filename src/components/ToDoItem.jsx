import { useState } from "react";
import { useToDoContext } from "../context/ToDoContext";

function ToDoItem({ todo }) {
  const [isToDoEditable, setIsToDoEditable] = useState(false);
  const [updatedToDoMsg, setUpdatedToDoMsg] = useState(todo.todo);

  const { editToDo, toDoComplete, toDoDel } = useToDoContext();

  const edit = () => {
    editToDo(todo.id, { ...todo, todo: updatedToDoMsg });
    setIsToDoEditable(false);
  };

  const toDoCompleted = () => {
    toDoComplete(todo.id);
  };


  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={() => toDoComplete(todo.id)}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isToDoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={updatedToDoMsg}
        onChange={(e) => setUpdatedToDoMsg(e.target.value)}
        readOnly={!isToDoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isToDoEditable) {
            edit();
          } else setIsToDoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isToDoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => toDoDel(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default ToDoItem;
