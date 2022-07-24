
const { REACT_APP_BASE_URL } = process.env;

const login = (username: string, password: string) => {
    return {
        url: `${REACT_APP_BASE_URL}/user/login`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: [
            encodeURIComponent('username') + '=' + encodeURIComponent(username),
            encodeURIComponent('password') + '=' + encodeURIComponent(password)
        ].join('&')
    }
};

const register = (username: string, email: string, password: string, confirmPassword: string) => {
    return {
        url: `${REACT_APP_BASE_URL}/user/register`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword
        })
    }
};

const logout = (token: string) => {
    return {
        url: `${REACT_APP_BASE_URL}/user/logout`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: token
    };
};

const verify = () => {
    return { url: `${REACT_APP_BASE_URL}/user/verify` }
}

const userOptions = {
    login,
    register,
    logout,
    verify
}

export default userOptions;