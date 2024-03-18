export const createRound = async (newRound) => {
    try {
        const response = await fetch("/api/round/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRound)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${request.status}`);
        }

        return await response.json();

    } catch (error) {
        console.log("error creating a round: ", error);
    }
}

export const addRoundToTrial = async (trialId, roundIds) => {
    try {
        const response = await fetch(`api/round/${trialId}/insert-rounds`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(roundIds)

        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Rounds added to trial successfully:", data);
    } catch (error) {
        console.log("error adding round to trial: ", error);
    }
}