import api from "./index";
const API = `/admin`;


export const adminRegister = async (credentials) => {
  try {
    const response = await api.post(`${API}/register`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong in admin register' };
  }
};

export const adminLogin = async (credentials) => {
  try {
    const response = await api.post(`${API}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong in admin login' };
  }
};

export const adminLogout = async () => {
  try {
    const response = await api.post(`${API}/logout`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong in admin logout' };
  }
};

export const getAdminProfile = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.get(`${API}/profile`);
    if (response.data.success) {
      localStorage.setItem(
        "adminProfile",
        JSON.stringify(response.data.data)
      );
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    throw error.response?.data || { message: "Something went wrong in admin profile fetch" };
  }
};

// export const updateAdminProfile = async (profileData) => {
//   try {
//     let response;
//     if (profileData.profileImage instanceof File) {
//       const formData = new FormData();

//       Object.keys(profileData).forEach((key) => {
//         formData.append(key, profileData[key]);
//       });
//       response = await api.put(`${API}/profile`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     } else {
//       response = await api.put(`${API}/profile`, profileData);
//     }

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Something went wrong" };
//   }
// };

// export const forgotPassword = async (email) => {
//   if (!email) throw { message: "Email is required" };

//   try {
//     const response = await api.post('/auth/forgot-password', { email });
//     return response.data;
//   } catch (error) {
//     console.error("Forgot password API error:", error);
//     throw error.response?.data || { message: 'Something went wrong' };
//   }
// };

// export const resetPassword = async (token, newPassword) => {
//   try {
//     const response = await api.post(`/auth/reset-password/${token}`, { newPassword });
//     return response.data;
//   } catch (error) {
//     console.error("Reset password API error:", error);
//     throw error.response?.data || { message: "Something went wrong" };
//   }
// };