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

export const updateStimuli = async (id, updatedStim, file) => {
    try {
        const formData = new FormData();

        formData.append('StimName', updatedStim.name);

        if (file) {
            formData.append('file', file);
        }

        const response = await fetch(`/api/stimuli/${id}/update`, {
            method: 'PUT',
            body: formData, 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
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

export const createStimuli = async (newStim, file) => {
    try {
        const formData = new FormData();
        formData.append('StimName', newStim.name);
        formData.append('ItemId', newStim.itemId);        
        
        if (file) {
            formData.append('file', file);
        }


        const response = await fetch(`/api/stimuli/`, {
            method: 'POST',
            body: formData, 
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseBody = await response.json();
        console.log("Response body:", responseBody);

        return responseBody;
    } catch (error) {
        console.error('Error creating stimuli:', error);
    }
}


export const addStimuliToSet = async (stimId, stimSetId) => {
    try {
        
        const response = await fetch(`/api/Stimuli/${stimId}/addstimset/${stimSetId}`,{
        method: 'PUT',
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