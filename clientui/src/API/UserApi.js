export const getUsers = () => {
    return fetch('/api/user/', {
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
};

export const getOneUser = (setId) => {
    return fetch(`/api/user/${setId}`, {
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

export const getUsersClients = async (userId) => {
    try {
        const response = await fetch(`/api/user/${userId}/clients`, {
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

export const createUser = async (newUser) => {
    try {
        const response = await fetch('/api/user/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.log("error creating a user: ", error);
    }
}

export const editUser = async (updatedUser, id) => {
    try {
        const response = await fetch(`/api/user/${id}/update`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(updatedUser)
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log("error updating user: ", error);
    }
}

export const addClientToUser = async (clientId, userId) => {
    try {
        const response = await fetch(`/api/user/${userId}/addclient/${clientId}`,{
            method: "PUT",
        })

        if(!response.ok){
            const errorMessage = await response.text(); 
            throw new Error(errorMessage);
        }

    } catch (error) {
        console.log("error adding client: ", error);
    }
}

export const removeClientFromUser = async (clientId, userId) => {
    try {
        const response = await fetch(`/api/user/${userId}/removeclient/${clientId}`,{
            method: "DELETE",
            
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
    } catch (error) {
        console.log("error removing client: ", error);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`/api/user/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log("error deleting user: ", error);
    }
}