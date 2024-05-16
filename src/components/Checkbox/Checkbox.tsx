import "./Checkbox.scss";
import { useMutation, useQueryClient } from "react-query";

export default function Checkbox(props: { elementId: number }) {
    const queryClient = useQueryClient();

    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const currentTodo = todos.find((task: any) => task.id === props.elementId);
    const currentTodoChecked = currentTodo.completed;

    async function checkHandler(e: any) {
        currentTodo.completed = e.target.checked;
        currentTodo.EditOn = false;
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const checkTodoMutation = useMutation({
        mutationFn: (e: any) => {
            return checkHandler(e);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("todoData");
        },
    });

    return (
        <div className="checkbox-container">
            <input
                id="checkbox"
                type="checkbox"
                onClick={(e) => {
                    checkTodoMutation.mutate(e);
                }}
                defaultChecked={currentTodoChecked}
            />
            <img src="./assets/Checkbox/check.png" />
        </div>
    );
}
