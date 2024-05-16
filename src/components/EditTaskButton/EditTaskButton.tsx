import "./EditTaskButton.scss";
import { useMutation, useQueryClient } from "react-query";

export default function EditTaskButton(props: {
    icon: string;
    elementId: number;
}) {
    const queryClient = useQueryClient();

    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    const currentTodo = todos.find((task: any) => task.id === props.elementId);

    async function EditOn(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.target as HTMLElement;
        const currentTitle = target.parentElement?.parentElement?.querySelector(
            ".todo-container__title-handler p"
        );

        const inputElement = document.createElement("input");
        inputElement.value = currentTitle?.textContent || "";
        currentTitle?.replaceWith(inputElement);
        setEditMode(true);
        inputElement.focus();

        inputElement.addEventListener("blur", () => {
            editTodoMutationOff.mutate({
                activeInput: inputElement,
                newTitle: inputElement.value,
            });
        });
    }

    async function EditOff(activeInput: HTMLInputElement, newTitle: string) {
        let pElement = document.createElement("p");
        pElement.textContent = newTitle;
        activeInput.replaceWith(pElement);

        currentTodo.title = newTitle;
        setEditMode(false);
    }

    function setEditMode(state: boolean) {
        currentTodo.EditOn = state;
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const editTodoMutationOn = useMutation({
        mutationFn: (e: any) => {
            return EditOn(e);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("todoData");
        },
    });

    const editTodoMutationOff = useMutation({
        mutationFn: ({
            activeInput,
            newTitle,
        }: {
            activeInput: HTMLInputElement;
            newTitle: string;
        }) => {
            return EditOff(activeInput, newTitle);
        },
        onSuccess: () => {
            queryClient.invalidateQueries("todoData");
        },
    });

    return (
        <button
            className="edit-todo-button"
            onClick={editTodoMutationOn.mutate}
        >
            <img src={props.icon} />
        </button>
    );
}
