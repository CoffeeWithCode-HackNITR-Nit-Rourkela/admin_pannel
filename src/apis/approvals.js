import api from "./index";
const API = `/admin`;

export const getPendingDoctors = async () => {
  try {
    const response = await api.get(`${API}/doctors/pending`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong in getting pending doctors' };
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await api.get(`${API}/doctors/all`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong in getting all doctors' };
  }
};

export const approveDoctor = async (doctorId) => {
  try {
    const response = await api.put(`${API}/doctors/${doctorId}/approve`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    throw error.response?.data || { message: "Something went wrong in approving doctor" };
  }
};

export const rejectDoctor = async (doctorId) => {
  try {
    const response = await api.put(`${API}/doctors/${doctorId}/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong in rejecting doctor" };
  }
};
