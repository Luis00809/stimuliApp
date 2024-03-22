import { useState, useEffect } from "react";
import CreateUser from "../components/Forms/CreateUser";
import CreateClient from "../components/Forms/CreateClient";
import DisplayUsers from "../components/Accordion/Users";

const Dashboard = () => {
    return (
        <div>
            <CreateUser />
            <CreateClient />
            <DisplayUsers />
        </div>
    )
}

export default Dashboard;