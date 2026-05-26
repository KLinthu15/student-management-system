import axios from "axios";

const API_URL =
  "http://localhost:5001/api/assignments";

export const getAssignments =
  async () => {
    return axios.get(API_URL);
  };

export const createAssignment =
  async (data) => {
    return axios.post(
      API_URL,
      data
    );
  };

export const updateAssignment =
  async (id, data) => {
    return axios.put(
      `${API_URL}/${id}`,
      data
    );
  };

export const deleteAssignment =
  async (id) => {
    return axios.delete(
      `${API_URL}/${id}`
    );
  };