// utils/api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function get<T>(url: string): Promise<AxiosResponse<T>> {
    try {
        const response = await api.get(url);
        return response;
    } catch (error) {
        console.error('Error making GET request:', error);
        throw error;
    }
}

export async function post<T>(url: string, data: T): Promise<AxiosResponse<T>> {
    try {
        const response = await api.post(url, data);
        return response;
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error;
    }
}

export async function put<T>(url: string, data: T): Promise<AxiosResponse<T>> {
    try {
        const response = await api.put(url, data);
        return response;
    } catch (error) {
        console.error('Error making PUT request:', error);
        throw error;
    }
}