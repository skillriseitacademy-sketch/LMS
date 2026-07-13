import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://quubhddtekisbprqvbyj.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dWJoZGR0ZWtpc2JwcnF2YnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzAwNDEyMSwiZXhwIjoyMDk4NTgwMTIxfQ.NHwFuvIDrNA0tfIHiBfUQywuDSrlJB1v6d25j6q7WG4";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function resetOnboarding() {
  const { data, error } = await supabase
    .from("profiles")
    .update({ onboarding_complete: false })
    .neq("role", "admin"); 

  if (error) {
    console.error("Error resetting onboarding:", error);
  } else {
    console.log("Successfully reset onboarding for all users!");
  }
}

resetOnboarding();
