import { createClient } from "@supabase/supabase-js";


const supabase_url:string = "https://cwmipjwjsvxdhwivmdtb.supabase.co"
const supabase_anon_key:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bWlwandqc3Z4ZGh3aXZtZHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3ODAwMzQsImV4cCI6MjA1MjM1NjAzNH0.GgXqLC-zKzmOnItib2Alq63VnCx7iarmNY_HOk3oKDE"
const supabase = createClient(supabase_url, supabase_anon_key)

export default supabase