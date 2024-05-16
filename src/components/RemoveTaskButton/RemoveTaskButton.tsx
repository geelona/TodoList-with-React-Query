import "./RemoveTaskButton.scss";
import { useMutation, useQueryClient } from "react-query";

async function removeTask(taskId: string) {
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos = todos.filter((todo: any) => todo.id !== taskId);
    localStorage.setItem("todos", JSON.stringify(todos));
}

export default function RemoveTaskButton(props: {
    icon: string;
    taskId: string;
}) {
    const queryClient = useQueryClient();

    const removeTaskMutation = useMutation({
        mutationFn: (taskId: string) => {
            return removeTask(taskId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("todoData");
        },
    });

    function clickHandler() {
        removeTaskMutation.mutate(props.taskId);
    }

    return (
        <>
            <button className="remove-todo-button" onClick={clickHandler}>
                <img src={props.icon} />
            </button>
        </>
    );
}
