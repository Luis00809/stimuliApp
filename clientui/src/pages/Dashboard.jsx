import { useEffect } from "react";
import { getClients } from "../API/ClientApi";

const Dashboard = () => {

    const getAllClients = async () => {
        try {
            const clients = await getClients();
            console.log(clients);
        } catch (error) {
            console.log("Error fetching clients: ", error);
        }
    };

    getAllClients();

    return (
        <div>
            <h2>Dashboard page</h2>
        </div>
    )
}

export default Dashboard;