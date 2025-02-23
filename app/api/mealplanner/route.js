import { supabase } from "../../../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

// GET the most recent meal plan for a user
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const { data, error } = await supabase
    .from("meal_plans")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ mealPlan: (data && data[0]) ? data[0] : null });
}

// POST (save) a meal plan
export async function POST(request) {
  const { user_id, mealPlan } = await request.json(); // mealPlan is any serializable object
  const plan_id = uuidv4();
  const { data, error } = await supabase
    .from("meal_plans")
    .insert([{ id: plan_id, user_id, plan_data: mealPlan }]);
  if (error) return Response.json({ error: error.message }, { status: 400 });
  return Response.json({ mealPlan: data[0] || null });
}
