import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>; //tipo para el formulario, submit
interface ITask {
    //interface que define lo que van a ser cada uno de los task
    name: string;
    done: boolean;
}

function App() {
    const [newTask, setNewTask] = useState<string>("");
    const [tasks, setTasks] = useState<ITask[]>([]);
    const taskInput = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();
        addTask(newTask);
        setNewTask("");
        taskInput.current?.focus();
    };

    const addTask = (name: string) => {
        const newTasks: ITask[] = [...tasks, { name: name, done: false }];
        setTasks(newTasks);
    };

    const toggleDoneTask = (i: number) => {
        const newTasks: ITask[] = [...tasks];
        newTasks[i].done = !newTasks[i].done;
        setTasks(newTasks);
        console.log("toggled");
    };

    const deleteTask = (i: number) => {
        let newTasks: ITask[] = tasks.filter((task, index) => index !== i);
        console.log(newTasks);
        setTasks(newTasks);
        console.log(i);
        console.log(tasks);
    };

    return (
        <div className="container p-4">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    onChange={e => setNewTask(e.target.value)}
                                    value={newTask}
                                    className="form-control"
                                    ref={taskInput}
                                />
                                <button
                                    className="btn btn-success btn-block mt-2"
                                    autoFocus
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                    {tasks.map((t: ITask, i: number) => (
                        <div className="card card-body mt-2" key={i}>
                            <h2
                                style={{
                                    textDecoration: t.done ? "line-through" : ""
                                }}
                                onClick={() => toggleDoneTask(i)}
                            >
                                {t.name}
                            </h2>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteTask(i)}
                            >
                                🗑 Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
