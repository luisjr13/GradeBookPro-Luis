export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Columns = "created_at" | "fullName" | "grade" | "id" | "state";

export interface ColumnsInsert {
  created_at: string;
  fullName: string;
  grade: number | null;
  id: number;
  state: string | null;
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface DatabaseType {
  created_at: string;
  fullName: string;
  grade: number | null;
  id: number;
  state: string | null;
}
