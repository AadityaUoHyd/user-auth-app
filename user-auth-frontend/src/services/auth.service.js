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

// PENDING TASK
// Update user profile
export const updateUserProfile = async (payload) => {
  const res = await api.put("/auth/update-user-profile", payload); // adjust endpoint if different
  return res.data;
};

// Change password
export const changePassword = async (payload) => {
  const res = await api.post("/auth/change-password", payload); // adjust endpoint
  return res.data;
};

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
    { id: 1, name: "Project Alpha", description: "First project" },
    { id: 2, name: "Project Beta", description: "Second project" },
  ];
}

// Mock function to create a new project
export async function createProject(project) {
  // Normally you'd call a backend API here
  console.log("Creating project:", project);
  return { id: Math.floor(Math.random() * 1000), ...project };
}

// Mock users list
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
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