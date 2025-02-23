-- Table for Notes
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT fk_user_notes FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Table for Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  task text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT fk_user_tasks FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Table for Meal Plans
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL,
  plan_data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT fk_user_mealplans FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
