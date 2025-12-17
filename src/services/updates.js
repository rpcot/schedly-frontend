import axios from "axios";

import { API_BASE, API_ENDPOINTS } from "../constants/appConfig";

export async function fetchUpdates() {
  try {
    const response = await axios.get(`${API_BASE}${API_ENDPOINTS.fetchUpdates}`, {
      timeout: 5000,
    });

    if (response.status !== 200)
      throw new Error(`Ошибка API: ${response.status}`);

    const { data } = response;

    if (!data?.ok)
      throw new Error(`Ошибка API: ${data.status}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUpdate(id) {
  try {
    const response = await axios.get(`${API_BASE}${API_ENDPOINTS.fetchUpdates}/${id}`, {
      timeout: 5000,
    });

    if (response.status !== 200)
      throw new Error(`Ошибка API: ${response.status}`);

    const { data } = response;

    if (!data?.ok)
      throw new Error(`Ошибка API: ${data.status}`);

    return data;
  } catch (error) {
    if (error.status === 404) {
      return null;
    } else {
      throw error;
    }
  }
}