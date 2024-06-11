const tokenKey = 'jwtToken';

export const getJwt = () => {
    const jwt = localStorage.getItem(tokenKey);

    return jwt;
}