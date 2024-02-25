import { useEffect } from "react";
import { getClients, getClient } from "../API/ClientApi";
import { getAllStimuli, getAStimuli } from "../API/StimuliApit";
import { getStimSet, getOneStimSet } from "../API/StimSetApi";
import { getUsers, getOneUser } from "../API/UserApi";



const Dashboard = () => {

    const getAllClients = async () => {
        try {
            const clients = await getClients();
            console.log(clients);
        } catch (error) {
            console.log("Error fetching clients: ", error);
        }
    };

    const getAClient = async () => {
        try {
            const clients = await getClient(5);
            console.log(clients);
        } catch (error) {
            console.log("Error fetching clients: ", error);
        }
    }

    const getStim = async () => {
        try {
            const clients = await getAllStimuli();
            console.log(clients);
        } catch (error) {
            console.log("Error fetching clients: ", error);
        }
    }

    const getOneStim = async () => {
        try {
            const clients = await getAStimuli(3);
            console.log(clients);
        } catch (error) {
            console.log("Error fetching clients: ", error);
        }
    }

    const getAllUsers = async () => {
        try {
            const clients = await getUsers();
            console.log(clients);
        } catch (error) {
            console.log("Error fetching clients: ", error);
        }
    }

    const getAUser = async () => {
        try {
            const clients = await getOneUser(3);
            console.log(clients);
        } catch (error) {
            console.log("Error fetching clients: ", error);
        }
    }

    getAllClients();
    getAClient();
    getStim();
    getOneStim();
    getAllUsers();
    getAUser();

    return (
        <div>
            <h2>Dashboard page</h2>
        </div>
    )
}

export default Dashboard;