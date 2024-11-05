import axiosAPI from "../API/axiosAPI";
import { getAccessToken } from "../utils/handleTokens";
import { convertToJson } from "../utils/helpers";

const API_URL = import.meta.env.VITE_API_URL

export async function login({ workId, password, rememberUser }) {
    const response = await axiosAPI.post(`${API_URL}/identity/login`, {
        workId,
        password
    }).catch(() => { throw new Error('Invalid credentials') })

    const data = response.data
    return { data, rememberUser };
}

export async function resetPassword(workId, token, newPassword) {
    const response = await axiosAPI.post(`${API_URL}/identity/reset-forgotten-password`, {
        workId,
        token,
        newPassword
    })

    return response;
}

export async function forgotPassword(workId) {
    return await axiosAPI.post(`${API_URL}/identity/forgot-password`, { workId })
}

export async function fetchUser() {
    const accessToken = getAccessToken();
    const user = convertToJson(accessToken)
    return await axiosAPI.get(`${API_URL}/identity/users/${user?.id}`)
}


export async function getCurrentUser() {
    const accessToken = getAccessToken();

    if (!accessToken) return null;

    const response = await fetchUser()

    console.log(response);

    if (response.status !== 200) {
        return null;
    }

    return response.data;
}