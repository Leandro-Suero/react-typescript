import React, { Fragment, useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>; //tipo para el formulario, submit
interface ITask {
    //interface que define lo que van a ser cada uno de los task
    name: string;
    done: boolean;
}

function App() {
    const [newTask, setNewTask] = useState<string>("");
    const [tasks, setTasks] = useState<ITask[]>([]);

    const handleSubmit = (e: FormElement) => {
        e.preventDefault();
        addTask(newTask);
        setNewTask("");
    };

    const addTask = (name: string) => {
        const newTasks: ITask[] = [...tasks, { name: name, done: false }];
        setTasks(newTasks);
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={e => setNewTask(e.target.value)}
                    value={newTask}
                />
                <button>Save</button>
            </form>
            {tasks.map((t: ITask, i: number) => {
                return <h2 key={i}>{t.name}</h2>;
            })}
        </Fragment>
    );
}

export default App;
