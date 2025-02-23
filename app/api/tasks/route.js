import { supabase } from "../../../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

// GET tasks by user_id
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ tasks: data || [] });
}

// POST a new task
export async function POST(request) {
  const { user_id, task } = await request.json();
  const task_id = uuidv4();
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ id: task_id, user_id, task }]);
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ task: data[0] || null });
}
