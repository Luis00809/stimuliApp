import { useState, useEffect } from "react";
import CreateUser from "../components/Forms/CreateUser";
import CreateClient from "../components/Forms/CreateClient";

const Dashboard = () => {
    return (
        <div>
            <CreateUser />
            <CreateClient />
        </div>
    )
}

export default Dashboard;