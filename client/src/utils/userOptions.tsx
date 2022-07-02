
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

const register = (email: string, password: string, rePassword: string) => {
    return {
        url: `${REACT_APP_BASE_URL}/users/register`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            rePassword
        })
    }
};

const logout = () => {
    return { url: `${REACT_APP_BASE_URL}/users/logout` };
};

const verify = () => {
    return { url: `${REACT_APP_BASE_URL}/users/verify` }
}

const userOptions = {
    login,
    register,
    logout,
    verify
}

export default userOptions;