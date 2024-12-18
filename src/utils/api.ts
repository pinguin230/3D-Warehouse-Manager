import axios from 'axios';

export const fetchAllReports = async () => {
    try {
        const response = await axios.get('http://localhost:3001/reports');
        return response.data;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};
