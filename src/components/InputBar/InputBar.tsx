import "./InputBar.scss";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import Input from "../Input/Input";
import { useState } from "react";

export default function InputBar() {
    const [inputValue, setInputValue] = useState("");
    return (
        <>
            <div className="input-container">
                <Input
                    type="text"
                    placeholder="Type here to add a task..."
                    onChange={setInputValue}
                    value={inputValue}
                />
                <AddTaskButton
                    icon="/assets/InputBar/add-icon.png"
                    text="Add"
                    value={inputValue}
                    setValue={setInputValue}
                />
            </div>
        </>
    );
}
