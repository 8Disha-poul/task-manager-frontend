// Base URL (Railway in production, localhost in local dev)
const BASE_URL = "https://task-manager-production-a47c.up.railway.app";
const API_URL = `${BASE_URL}/tasks`;

// ===== Add task =====
export const addTask = async (taskData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// ===== Get completed tasks =====
export const getCompletedTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/completed`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
  }
};

// ===== Get pending tasks =====
export const getPendingTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/pending`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
  }
};

// ===== Complete task =====
export const completeTask = async (id) => {
  try {
    const response = await fetch(
      `${API_URL}/${id}/complete`,
      { method: "PATCH" }
    );
    return await response.json();
  } catch (error) {
    console.error("Error completing task:", error);
  }
};

// ===== Update task =====
export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(
      `${API_URL}/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

// ===== Delete task =====
export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return await res.json();
};

// ===== Get task statistics (counts) =====
export const getTaskStats = async () => {
  try {
    const completedRes = await fetch(`${API_URL}/completed`);
    const completedData = await completedRes.json();
    const completedCount = completedData.data ? completedData.data.length : 0;

    const pendingRes = await fetch(`${API_URL}/pending`);
    const pendingData = await pendingRes.json();
    const pendingCount = Array.isArray(pendingData) ? pendingData.length : 0;

    const totalCount = completedCount + pendingCount;

    return {
      total: totalCount,
      completed: completedCount,
      pending: pendingCount,
      overdue: 0
    };
  } catch (error) {
    console.error("Error fetching task stats:", error);
    return {
      total: 0,
      completed: 0,
      pending: 0,
      overdue: 0
    };
  }
};

// ===== Get all tasks with stats =====
export const getAllTasksWithStats = async () => {
  try {
    const pendingRes = await fetch(`${API_URL}/pending`);
    const pendingData = await pendingRes.json();
    const pendingTasks = Array.isArray(pendingData) ? pendingData : [];

    const completedRes = await fetch(`${API_URL}/completed`);
    const completedData = await completedRes.json();
    const completedTasks = completedData.data || [];

    const allTasks = [...pendingTasks, ...completedTasks];

    const stats = {
      total: allTasks.length,
      completed: completedTasks.length,
      pending: pendingTasks.length,
      overdue: 0
    };

    return {
      tasks: allTasks,
      stats
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      tasks: [],
      stats: { total: 0, completed: 0, pending: 0, overdue: 0 }
    };
  }
};