import { createContext, useContext } from "react";

export const ToDoContext = createContext({
  allToDo: [
    {
      id: 1,
      todo: "todo msg",
      completed: false,
    },
  ],
  addToDo: (toDo) => {},
  editToDo: (id, toDo) => {},
  toDoComplete: (id) => {},
  toDoDel: (id) => {},
});

export const useToDoContext = () => {
    return useContext(ToDoContext)
}

export const ToDoContextProvider = ToDoContext.Provider