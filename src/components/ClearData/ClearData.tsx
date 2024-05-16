import "./ClearData.scss";
import { useMutation, useQueryClient } from "react-query";

export default function ClearData() {
    const queryClient = useQueryClient();

    async function clearData() {
        localStorage.clear();
    }

    const clearDataMutation = useMutation({
        mutationFn: (e: any) => {
            return clearData();
        },
        onSuccess: () => {
            queryClient.invalidateQueries("todoData");
        },
    });

    return (
        <div className="clear-data-container">
            <button onClick={clearDataMutation.mutate}>
                <img src="/assets/Tasks/bin.png" />
                <p>Clear all tasks</p>
            </button>
        </div>
    );
}
