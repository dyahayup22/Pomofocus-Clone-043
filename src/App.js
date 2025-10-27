import Header from "./components/Header";
import classes from "./App.module.css";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import { useSelector } from "react-redux";
import clsx from "clsx";

function App() {
  const mode = useSelector((state) => state.timer.mode);

  return (
    <div className={clsx(classes.container, classes[mode])}>
      <Header />
      <div className={classes.content}>
        <Timer />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
