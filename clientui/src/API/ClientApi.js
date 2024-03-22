export const getClients = () => {
    return fetch('/api/Client', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}


export const getClient = (clientId) => {
    return fetch(`/api/Client/${clientId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

export const createClient = async (newClient) => {
    try {
        const response = await fetch('/api/Client', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newClient)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log("error creating client", error);
    }
}

export const getClientsStimSets = async (clientId) => {
    try {
        const response = await fetch(`/api/client/${clientId}/sets`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log("error getting users clients", error);
    }
}

export const addSetToClient = async (clientId, setId) => {
    try {
        const response = await fetch(`/api/client/${clientId}/addset/${setId}`, {
            method: "PUT"
        });
        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(errorMessage);        
        }

        return true;
    } catch (error) {
        throw error;
    }
}

export const removeSetFromClient = async (clientId, setId) => {
    try {
        const request = await fetch(`/api/client/${clientId}/removeset/${setId}`, {
            method: "DELETE",
        });

        if (!request.ok) {
            throw new Error(`HTTP error! status: ${request.status}`);
        }

        return request.ok;
        
    } catch (error) {
        console.log("error removing set from client: ", error);
    }
}