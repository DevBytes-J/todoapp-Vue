export interface Todo {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: Category;
  completed: boolean;
  created_at: string;
}

export type Category = "Personal" | "Work" | "Shopping" | "Health" | "Other";
export type FilterType = "all" | "active" | "completed";
