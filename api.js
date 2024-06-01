export const registerUser = async (userData) => {
    try {
        const response = await fetch('http://mongodb+srv://vinothM:mongodb95@cluster1.jhzpo6b.mongodb.net:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
    } catch (error) {
        throw error;
    }
  };
  
  export const getAllUsernames = async () => {
    try {
        const response = await fetch('http://192.168.0.100:5000/api/users');
        if (!response.ok) {
            throw new Error('Failed to fetch usernames');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
  };
  
  export const loginUser = async (userData) => {
    try {
        const response = await fetch('http://192.168.0.100:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to login');
        }
  
        return await response.json();
    } catch (error) {
        throw error;
    }
  };