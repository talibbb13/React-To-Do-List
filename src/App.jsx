import { useState, useEffect } from "react";
import { ToDoContextProvider } from "./context/ToDoContext";
import ToDoForm from "./components/ToDoForm";
import ToDoItem from "./components/ToDoItem";

function App() {
  const [allToDo, setAllToDo] = useState([]);

  const addToDo = (toDo) => {
    setAllToDo((prev) => [
      { id: Date.now(), ...toDo, completed: false },
      ...prev,
    ]);
  };

  const editToDo = (id, toDo) => {
    setAllToDo((prev) =>
      prev.map((toDoItem) => (toDoItem.id === id ? toDo : toDoItem))
    );
  };

  const toDoComplete = (id) => {
    setAllToDo((prev) =>
      prev.map((toDoItem) =>
        toDoItem.id === id
          ? { ...toDoItem, completed: !toDoItem.completed }
          : toDoItem
      )
    );
  };

  const toDoDel = (id) => {
    setAllToDo((prev) => prev.filter((toDoItem) => toDoItem.id != id));
  };

  useEffect(() => {
   const localToDo = JSON.parse(localStorage.getItem("localToDo"));

    if (localToDo && localToDo.length > 0) {
      setAllToDo(localToDo)
    }
  }, [])

    useEffect(() => {
     localStorage.setItem("localToDo", JSON.stringify(allToDo))
    }, [allToDo]);

  return (
    <ToDoContextProvider
      value={{ allToDo, addToDo, editToDo, toDoComplete, toDoDel }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Add a to-do-list 😀
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <ToDoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add To-do Item here */}
            {allToDo.map((toDoItem) => {
             return <div key={toDoItem.id} className="w-full">
                <ToDoItem todo={toDoItem} />
              </div>;
            })}
          </div>
        </div>
      </div>
    </ToDoContextProvider>
  );
}

export default App;
