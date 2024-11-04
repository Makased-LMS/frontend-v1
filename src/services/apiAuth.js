import { convertToJson } from "../utils/helpers";
import Cookies from 'js-cookie';

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

async function refreshTokenAndRetry(originalRequest) {
    try {
        const response = await fetch(`${API_URL}/identity/refresh-token`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        Cookies.setItem('accessToken', data.accessToken);

        return await originalRequest();
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
}

export async function getCurrentUser() {
    const accessToken = Cookies.get('accessToken');

    if (!accessToken) return null;

    const user = convertToJson(accessToken)

    const response = await fetchUser(user.id, accessToken)

    if (!response.ok) {
        refreshTokenAndRetry(getCurrentUser);
    }

    const data = await response.json();
    return data;
}