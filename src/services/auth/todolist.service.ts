import { supabase } from "../../supabaseClient";

export const addTask = async (userId: string, task: string, dueDate: Date) => {
  const { error } = await supabase
    .from("tasks")
    .insert([{ user_id: userId, task, due_date: dueDate }]);

  if (error) {
    console.error("Error adding task:", error);
    return false;
  }

  return true;
};

export const fetchTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  return data || [];
};

export const updateTaskStarStatus = async (
  userId: string,
  taskId: string,
  isStarred: boolean
) => {
  const { error } = await supabase
    .from("tasks")
    .update({ is_starred: isStarred })
    .eq("task_id", taskId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error updating task star status:", error);
    return false;
  }

  return true;
};

export const deleteTask = async (userId: string, taskId: string) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("task_id", taskId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting task:", error);
    return false;
  }

  return true;
};
