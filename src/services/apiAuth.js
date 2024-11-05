import handleTokens from "../utils/handleTokens";
import { convertToJson } from "../utils/helpers";

const API_URL = import.meta.env.VITE_API_URL

export async function login({ workId, password, rememberUser }) {
    const response = await fetch(`${API_URL}/identity/login`, {
        method: 'POST',
        body: JSON.stringify({
            workId,
            password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    if (!response.ok) throw new Error("Invalid credentials");

    const data = await response.json();

    return { data, rememberUser };
}

export async function resetPassword(workId, token, newPassword) {
    const response = await fetch(`${API_URL}/identity/reset-forgotten-password`, {
        method: 'POST',
        body: JSON.stringify({
            workId,
            token,
            newPassword
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    return response;
}

export async function forgotPassword(workId) {
    return await fetch(`${API_URL}/identity/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({
            workId
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export async function fetchUser(id, accessToken) {

    return await fetch(`${API_URL}/identity/users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-type': 'application/json'
        }
    })
}

async function refreshTokenAndRetry(originalRequest, refreshToken) {
    try {
        const { updateTokens } = handleTokens();
        const response = await fetch(`${API_URL}/identity/refresh-token`, {
            method: 'POST',
            body: JSON.stringify({
                refreshToken
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        updateTokens(data.accessToken, data.refreshToken);

        return await originalRequest();
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
}

export async function getCurrentUser() {
    const { accessToken, refreshToken } = handleTokens()

    if (!accessToken) return null;

    const user = convertToJson(accessToken)

    const response = await fetchUser(user.id, accessToken)

    if (!response.ok) {
        const res = await refreshTokenAndRetry(getCurrentUser, refreshToken);
        return res;
    }

    const data = await response.json();
    return data;
}