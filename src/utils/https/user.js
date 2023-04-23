import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export const getDashboard = (token, userId, controller) => {
  const url = `${baseUrl}dashboard/${userId}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getProfile = (token, userId, controller) => {
  const url = `${baseUrl}user/profile/${userId}`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editProfile = (token, userId, body, controller) => {
  const url = `${baseUrl}user/profile/${userId}`;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editPassword = (userId, token, oldPassword, newPassword, confirmPassword, controller) => {
  const url = `${baseUrl}user/password/${userId}`;
  const data = { oldPassword, newPassword, confirmPassword };
  return axios.patch(url, data, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editImage = (token, userId, image, controller) => {
  const formData = new FormData();
  formData.append("image", image);
  const url = `${baseUrl}user/image/${userId}`;
  return axios.patch(url, formData, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};
