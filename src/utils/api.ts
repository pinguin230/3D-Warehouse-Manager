import axios from 'axios';

export const fetchCoffeeData = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/coffee`);
        return response.data;
    } catch (error) {
        throw new Error(`HTTP error! ${error}`);
    }
};

export const fetchSelectedCoffeeData = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/selected-coffee`);
        return response.data;
    } catch (error) {
        throw new Error(`HTTP error! ${error}`);
    }
};

export const fetchContainerData = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/container`);
        return response.data;
    } catch (error) {
        throw new Error(`HTTP error! ${error}`);
    }
};

export const fetchSelectedContainerData = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/selected-container`);
        return response.data;
    } catch (error) {
        throw new Error(`HTTP error! ${error}`);
    }
};


export const deleteCoffee = (id: string, fetchCoffees: () => void) => {
    axios.delete(`http://localhost:3001/coffee/${id}`)
        .then(() => {
            fetchCoffees();
        })
        .catch(error => {
            console.error('Error while deleting coffee:', error);
            alert('Failed to delete coffee');
        });
};

export const deleteFromFavorites = (id: string, fetchCoffees: () => void) => {
    axios.delete(`http://localhost:3001/selected-coffee/${id}`)
        .then(() => {
            fetchCoffees();
        })
        .catch(error => {
            console.error('Error while deleting from selected:', error);
            alert('Failed to delete');
        });
};

export const addToSelected = (id: string, updateFavoritesCoffees?: () => void) => {
    axios.post(`http://localhost:3001/selected-coffee/add/${id}`)
        .then(response => {
            console.log("Added to selected:", response.data);
            if (updateFavoritesCoffees) updateFavoritesCoffees();
        })
        .catch(error => {
            if (error.response && error.response.status === 400) {
                alert('Coffee with this name already exists');
            } else {
                console.error('Error while adding to selected:', error);
                alert('Failed to add to selected');
            }
        });
};

export const deleteContainer = (id: string, fetchContainer: () => void) => {
    axios.delete(`http://localhost:3001/container/${id}`)
        .then(() => {
            fetchContainer();
        })
        .catch(error => {
            console.error('Error while deleting container:', error);
            alert('Failed to delete container');
        });
};

export const deleteFromFavoritesContainer = (id: string, fetchContainer: () => void) => {
    axios.delete(`http://localhost:3001/selected-container/${id}`)
        .then(() => {
            fetchContainer();
        })
        .catch(error => {
            console.error('Error while deleting from selected:', error);
            alert('Failed to delete');
        });
};

export const addToSelectedContainer = (id: string, updateFavoriteContainer?: () => void) => {
    axios.post(`http://localhost:3001/selected-container/add/${id}`)
        .then(response => {
            console.log("Added to selected:", response.data);
            if (updateFavoriteContainer) updateFavoriteContainer();
        })
        .catch(error => {
            console.error('Error while adding to selected:', error);
            alert('Failed to add to selected');
        });
};

export const patchContainer = (id: string, data: any, fetchContainer: () => void, closePopup: () => void) => {
    axios.patch(`http://localhost:3001/container/${id}`, data)
        .then(() => {
            fetchContainer();
            closePopup();
        })
        .catch(error => {
            console.error('Error while editing container:', error);
            alert('Failed to edit container');
        });
};

export const fetchAllReports = async () => {
    try {
        const response = await axios.get('http://localhost:3001/reports');
        return response.data;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};
