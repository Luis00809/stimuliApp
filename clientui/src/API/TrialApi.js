
export const createTrial = async (newTrial) => {
    try {
        const response = await fetch("/api/Trial/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTrial)
        })

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log("error creating trial: ", error);
    }
}


export const addTrialToClient = async (trialId, clientId) => {
    try {
        const response = await fetch(`/api/trial/${trialId}/addClient/${clientId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },

        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log("error adding trial to client: ", error);
    }
}