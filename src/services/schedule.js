import axios from "axios";

import { API_BASE, API_ENDPOINTS } from "../constants/appConfig";

export async function fetchWeeksData() {
  try {
    const response = await axios.get(`${API_BASE}${API_ENDPOINTS.fetchWeeks}`, {
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

export async function fetchScheduleData(weekNumber) {
  try {
    const response = await axios.get(`${API_BASE}${API_ENDPOINTS.fetchSchedule}?weekNumber=${weekNumber}`, {
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