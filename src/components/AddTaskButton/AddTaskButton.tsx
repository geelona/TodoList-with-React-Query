import "./AddTaskButton.scss";
import { useMutation, useQueryClient } from "react-query";

async function addNewTask(newTask: any) {
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.push(newTask);
    localStorage.setItem("todos", JSON.stringify(todos));
}

export default function ButtonWithIcon(props: {
    icon: string;
    text: string;
    value: string;
    setValue: any;
}) {
    const queryClient = useQueryClient();

    const newTodo = {
        id: crypto.randomUUID(),
        title: props.value,
        completed: false,
        EditOn: false,
    };

    const newTodoMutation = useMutation({
        mutationFn: (todo: any) => {
            return addNewTask(todo);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("todoData");
        },
    });

    const clickHandler = () => {
        if (props.value.length !== 0) {
            newTodoMutation.mutate(newTodo);
            props.setValue("");
        }
    };
    return (
        <button className="add-task-button" onClick={clickHandler}>
            <img src={props.icon} />
            <p>{props.text}</p>
        </button>
    );
}
