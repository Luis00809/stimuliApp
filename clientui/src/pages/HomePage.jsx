import React, { useState, useEffect } from 'react';
import ClientCard from '../components/Cards/ClientCard';
import { getUsersClients } from '../API/UserApi';
import auth from "../API/auth";

const Homepage = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const userId = await auth.getUserId();
                if (userId) {
                    const usersClients = await getUsersClients(userId);
                    setClients(usersClients); // Set the state with fetched clients
                } else {
                    console.log("error getting user id");
                }
            } catch (error) {
                console.log("error getting users clients: ", error);
            }
        };

        fetchClients();
    }, []); // Empty dependency array means this effect runs once on component mount

    return (
        <div>
            <h2> Welcome to stimuli App!</h2>
            <h2>My clients:</h2>
            {clients.map(client => (
                <ClientCard key={client.id} name={client.name} clientId={client.id} />
            ))}
        </div>
    );
}

export default Homepage;
