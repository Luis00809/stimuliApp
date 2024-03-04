export const getStimSet = () => {
    return fetch('/api/stimset/', {
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

export const getOneStimSet = (setId) => {
    return fetch(`/api/stimset/${setId}`, {
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

export const getStimSetsStimuli = async (setId) => {
    try {
        const response = await fetch(`/api/stimset/${setId}/stimuli`, {
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

export const removeStimuliFromSet = async(stimuliId, setId) => {
    try {
        const response = await fetch(`/api/stimset/${setId}/removeStimuli/${stimuliId}`,{
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log("error removing stimuli from stim set: ", error);
    }
}

export const deleteStimSet = async (id) => {
    try {
        const response = await fetch(`/api/stimset/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        };
        
    } catch (error) {
        console.log("error deleting stimset: ", error);
    }
}


export const updateStimSet = async (id, updatedSet) => {
   try {
    const response = await fetch(`/api/stimset/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSet),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
   } catch (error) {
    console.log("error updating stimset: ", error)
   }
}