import "./App.css";
import User from "./components/Bai3/User";
import { StopWatch } from "./components/Stopwatch ";
import { Todolist } from "./components/TodoList";

function App() {
    return (
        <>
            <Todolist />
            <StopWatch />
            <User />
        </>
    );
}

export default App;
