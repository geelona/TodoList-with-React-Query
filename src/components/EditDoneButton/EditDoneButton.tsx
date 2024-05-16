import "./EditDoneButton.scss";
import { useMutation, useQueryClient } from "react-query";

export default function EditDoneButton(props: {
    icon: string;
    elementId: number;
}) {
    const queryClient = useQueryClient();

    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const currentTodo = todos.find((task: any) => task.id === props.elementId);

    async function editDone() {
        currentTodo.EditOn = false;
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const editDoneMutation = useMutation({
        mutationFn: () => {
            return editDone();
        },
        onSuccess: () => {
            queryClient.invalidateQueries("todoData");
        },
    });

    return (
        <button
            className="edit-done-todo-button"
            onClick={() => {
                editDoneMutation.mutate();
            }}
        >
            <img src={props.icon} />
        </button>
    );
}
