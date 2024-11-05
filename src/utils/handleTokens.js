import Cookies from 'js-cookie';

const handleTokens = () => {
    const clearTokens = () => {
        localStorage.clear('refreshToken');
        Cookies.remove('accessToken');
    }

    const updateTokens = (accessToken, refreshToken, rememberUser = true) => {
        clearTokens();
        Cookies.set('accessToken', accessToken, {
            expires: rememberUser ? 30 : 60 / 1440, // 60 mins from BE
            secure: true,
            sameSite: 'Strict',
        });
        localStorage.setItem('refreshToken', refreshToken);
    }
    const getAccessToken = () => {
        return Cookies.get('accessToken');
    }

    const getRefreshToken = () => {
        return localStorage.getItem('refreshToken');
    }
    return { accessToken: getAccessToken(), refreshToken: getRefreshToken(), clearTokens, updateTokens }
}

export default handleTokens;