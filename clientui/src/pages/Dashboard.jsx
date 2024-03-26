import { useState, useEffect } from "react";
import CreateUser from "../components/Forms/CreateUser";
import CreateClient from "../components/Forms/CreateClient";
import DisplayUsers from "../components/Accordion/Users";
import DisplayClients from "../components/Accordion/Clients";

const Dashboard = () => {
    


    return (
        <div>
            <CreateUser />
            <CreateClient />
            <DisplayUsers />
            <DisplayClients />
        </div>
    )
}

export default Dashboard;