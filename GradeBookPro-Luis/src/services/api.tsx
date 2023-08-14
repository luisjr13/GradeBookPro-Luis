import { createClient } from "@supabase/supabase-js";
import { Columns, DatabaseType } from "./types";

export const supabase = createClient<DatabaseType>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const getStudents = async (): Promise<any> => {
  let { data: GradeBookPro, error } = await supabase
    .from("GradeBookPro")
    .select("*");

  return { GradeBookPro, error };
};
export const insertSchoolGrades = async (value: any): Promise<any> => {
  const { data, error } = await supabase
    .from("GradeBookPro")
    .insert([value])
    .select("*");

  return { data, error };
};
export const updateSchoolGrades = async (
  id: number,
  column: Columns,
  value: unknown
): Promise<any> => {
  const { data: GradeBookPro, error } = await supabase
    .from("GradeBookPro")
    .update({ [column]: value })
    .eq("id", id)
    .select("*");

  return { GradeBookPro, error };
};
export const deleteStudents = async (id: number): Promise<any> => {
  const { error } = await supabase.from("GradeBookPro").delete().eq("id", id);

  return { error };
};

export default supabase;
