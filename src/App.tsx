import "./App.scss";
import InputBar from "./components/InputBar/InputBar";
import Tasks from "./components/Tasks/Tasks";
import ClearData from "./components/ClearData/ClearData";
import React from "react";

function App() {
    return (
        <>
            <div className="container">
                <InputBar />
                <div className="container-todos">
                    <Tasks />
                </div>
                <ClearData />
            </div>
        </>
    );
}

export default App;
