export const getItems = async () => {
    try {
        const response = await fetch("/api/item", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log("error getting all items: ", error);
    }
}

export const getItemById = async (id) => {
    try {
        const response = await fetch(`/api/item/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log("error getting item by id: ", error);
    }
}

export const createItem = async (item) => {
    try {
        const response = await fetch('/api/item/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log("error creating item: ", error);
    }
}

export const updateItem = async (item) => {
    try {
        const response = await fetch(`/api/item/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(item)
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log("error updating  item: ", error);
    }
}

export const deleteItem = async (id) => {
    try {
        const response = await fetch(`/api/item/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log("error deleting item: ", error);
    }
}

export const groupStimuli = async (id, stimId) => {
    try {
        const response = await fetch(`/api/item/${id}/addstimuli/${stimId}`, {
            method: "PUT"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log("error grouping stimuli: ", error);
    }
}

export const removeStimuliFromItem = async (id, stimId) => {
    try {
        const response = await fetch(`/api/item/${id}/removestimuli/${stimId}`, {
            method: "delete"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log("error removing stimuli from item: ", error);
    }
}