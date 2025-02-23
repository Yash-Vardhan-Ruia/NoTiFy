import { supabase } from "../../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

// GET notes by user_id (passed as query param)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ notes: data || [] });
}

// POST a new note
export async function POST(request) {
  const { user_id, content } = await request.json();
  const note_id = uuidv4();
  const { data, error } = await supabase
    .from("notes")
    .insert([{ id: note_id, user_id, content }]);
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ note: data[0] || null });
}
