import "./Tasks.scss";
import { useQuery } from "react-query";
import { useEffect } from "react";
import Checkbox from "../Checkbox/Checkbox";
import RemoveTaskButton from "../RemoveTaskButton/RemoveTaskButton";
import EditTaskButton from "../EditTaskButton/EditTaskButton";
import EditDoneButton from "../EditDoneButton/EditDoneButton";

import { resetEditOnReload } from "../../utils/resetEditOnReload";

function getTodos() {
    let todos = localStorage.getItem("todos");
    return JSON.parse(todos || "[]");
}

export default function Tasks() {
    useEffect(() => {
        resetEditOnReload();
    }, []);

    const postsQuery = useQuery({
        queryKey: ["todoData"],
        queryFn: getTodos,
    });

    if (postsQuery.isLoading) return "Loading...";
    if (postsQuery.isError)
        return "An error has occurred: " + (postsQuery.error as Error).message;

    return (
        <>
            {postsQuery.data.map((todo: any) => (
                <div
                    key={todo.id}
                    className={
                        "todo-container" +
                        (todo.EditOn ? " todo-container--edit-mode" : "")
                    }
                >
                    <Checkbox elementId={todo.id} />
                    <div
                        className={
                            "todo-container__title-handler" +
                            (todo.completed
                                ? " todo-container__title-handler--checked"
                                : "")
                        }
                    >
                        <p>{todo.title}</p>
                    </div>
                    <div className="todo-container__actions">
                        {todo.EditOn ? (
                            <EditDoneButton
                                icon="/assets/Tasks/check.png"
                                elementId={todo.id}
                            />
                        ) : null}
                        {!todo.EditOn && !todo.completed ? (
                            <EditTaskButton
                                icon="./assets/Tasks/edit.png"
                                elementId={todo.id}
                            />
                        ) : null}

                        {todo.EditOn ? null : (
                            <RemoveTaskButton
                                icon="./assets/Tasks/bin.png"
                                taskId={todo.id}
                            />
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}
