
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

export const getTrialsByDate = async (date, clientId, setId) => {
    
    try {
        const response = await fetch(`/api/trial/trials?date=${date}&clientId=${clientId}&stimSetId=${setId}`, {
            method: 'GET',
            
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log("error getting trials: ", error);
    }
}

export const getTrialsRange = async (startDate, endDate, clientId, setId) => {
    try {
        const response = await fetch(`/api/trial/trials/date-range?startDate=${startDate}&endDate=${endDate}&clientId=${clientId}&stimSetId=${setId}`, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
        
    } catch (error) {
        throw new error('error getting trials in the date range: ', error)
    }
}