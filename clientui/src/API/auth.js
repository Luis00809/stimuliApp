import { jwtDecode } from 'jwt-decode';

class AuthService {

    getUserId() {
      const token = this.getToken();
      if (!token) {
          return null; // or throw an error
      }
      const decodedToken = jwtDecode(token);
      return decodedToken.id; 
    }

    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        return token ? true : false;
    }

    getToken() {
        return localStorage.getItem('jwtToken');
    }

    logout() {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    }

    login(userEmail, userPassword) {
        return fetch('/api/user/authenticate', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail, password: userPassword }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Authentication failed');
          }
          return response.json();
        })
        .then(data => {
          if (data.token) {
            localStorage.setItem('jwtToken', data.token);
            return data.token; // Return the token for further use
          }
          throw new Error('Authentication failed');
        })
        .catch(error => console.error('Error during authentication:', error));
      }
    
}

export default new AuthService();
