import classNames from "classnames";
import trashIcon from "../assets/trash.svg";
import { useStore } from "../store";
import "./Task.css";

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div className="task">
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img
            src={trashIcon}
            onClick={() => deleteTask(task.title)}
          />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
