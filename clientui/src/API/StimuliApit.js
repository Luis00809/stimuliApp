export const getAllStimuli = () => {
    return fetch('/api/Stimuli', {
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


export const getAStimuli = (stimId) => {
    return fetch(`/api/Stimuli/${stimId}`, {
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

export const updateStimuli = async (id, updatedStim) => {
   try {
    const response = await fetch(`/api/stimuli/${id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStim),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.ok;
   } catch (error) {
    console.log('error updating stimuli: ', error);
   }
}

export const deleteStimuli = async (id) => {
    try {
        const response = await fetch(`/api/stimuli/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        };
        
    } catch (error) {
        console.log("error deleting stimuli: ", error);
    }
}

export const createStimuli = async (newStim) => {
    try {
        const request = await fetch (`/api/stimuli/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStim),
        })
        if (!request.ok) {
            throw new Error(`HTTP error! status: ${request.status}`);
        };

        return request.json();

    } catch (error) {
        console.log("error creating stimuli: ", error);
    }
}


export const addStimuliToSet = async (stimId, stimSetId) => {
    try {
        
        const request = await fetch(`/api/Stimuli/${stimId}/addstimset/${stimSetId}`,{
        method: 'PUT',
        });

        if (!request.ok) {
            throw new Error('Network response was not ok');
        }
    
        return request.ok;
    } catch (error) {
        console.log("error adding stimuli to set: ", error);
    }
}