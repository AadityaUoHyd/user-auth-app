import api from "@/utils/ApiClient";

export const signup = async (payload) => {
  // payload: { name, email, password }
  const res = await api.post("/auth/register", payload);
  return res.data; // only return data, not the whole response
};

export const login = async (payload) => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

//refresh new access token using refresh token
export const refreshToken = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};

export const verifyRegistration = async (data) => {
  try {
    const response = await api.post("/auth/verify-otp", data);
    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.data) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

export async function sendResetOtp(email) {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error sending reset OTP:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to send OTP. Please try again."
    };
  }
}

export async function resetPassword(email, otp, newPassword) {
  try {
    const response = await api.post("/auth/reset-password", {
      email,
      otp,
      newPassword
    });
    return {
      success: true,
      data: response.data,
      message: "Password has been reset successfully. You can now log in with your new password."
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    const errorMessage = error.response?.data?.message ||
      error.message ||
      "Failed to reset password. Please try again.";
    return {
      success: false,
      error: errorMessage
    };
  }
}
export async function changePassword({ oldPassword, newPassword }) {
  const res = await api.post("/auth/change-password", {
    oldPassword,
    newPassword,
  });
  return res.data;
}


export async function updateUserProfile(data) {
  const res = await api.put("/auth/update-user-profile", data);
  return res.data;
}

// PENDING TASK
// Get billing info for current user
export const getBillingInfo = async () => {
  const res = await api.get("/billing"); // adjust endpoint if different
  return res.data;
};

// Upgrade user's plan
export const upgradePlan = async (planId) => {
  const res = await api.post("/billing/upgrade", { planId }); // adjust endpoint if different
  return res.data;
};

// Delete current user account
export const deleteAccount = async () => {
  return api.delete("/auth/delete-account");
};

// Update user settings
export const updateSettings = async (settings) => {
  // `settings` can be an object: { theme, notifications, etc. }
  const res = await api.put("/settings", settings);
  return res.data;
};

// Example mock function
export async function getAnalyticsData() {
  // Mock data
  return {
    users: [
      { date: "2025-12-01", count: 10 },
      { date: "2025-12-02", count: 15 },
      { date: "2025-12-03", count: 7 },
    ],
  };
}

// Mock function to get projects
export async function getProjects() {
  return [
    { id: 1, name: "Project Knight", description: "First project" },
    { id: 2, name: "Soya Plus", description: "Second project" },
  ];
}

// Mock function to create a new project
export async function createProject(project) {
  // Normally you'd call a backend API here
  return { id: Math.floor(Math.random() * 1000), ...project };
}

// Mock users list
let users = [
  { id: 1, name: "Amit", email: "amit@example.com" },
  { id: 2, name: "Bobby", email: "bobby@example.com" },
];

// Get all users
export async function getUsers() {
  // Simulate an async API call
  return [...users];
}

// Delete a user by id
export async function deleteUser(userId) {
  users = users.filter(user => user.id !== userId);
  return { success: true };
}
