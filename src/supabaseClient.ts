// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fmvvdqcbbybhvmbfnbqu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdnZkcWNiYnliaHZtYmZuYnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTY1ODAsImV4cCI6MjA2MTA3MjU4MH0.IXaIFUcl4moUGMIYN-pri5r3OO3KSxuFGATu6cQO_Tk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
