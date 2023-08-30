import { useState } from "react";
import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";

export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  /** Comparison function options:
   * 1. Use useMemo
   * 2. Use filter function only with 'shallow' or with own comparison function
   * Otherwise the array/object will be always rendered - because it doesn't compare
   * particular attributes of the array/object
  // OPTION 1
  const tasks = useStore((store) => store.tasks);
  const filtered = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );

  // OPTION 2
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  // OPTION 3
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    (prev, next) => {
      const longest = prev.length > next.length ? prev.length : next.length;
      for (let i = 0; i < longest; i++) {
        if (!prev[i] || !next[i]) return false;
        if (prev[i] !== next[i]) return false;
      }
    }
  );
    */
  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  const addTask = useStore((store) => store.addTask);

  return (
    <div className="column">
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContent">
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
