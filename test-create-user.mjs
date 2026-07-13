const SUPABASE_URL = "https://quubhddtekisbprqvbyj.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dWJoZGR0ZWtpc2JwcnF2YnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzAwNDEyMSwiZXhwIjoyMDk4NTgwMTIxfQ.NHwFuvIDrNA0tfIHiBfUQywuDSrlJB1v6d25j6q7WG4";

async function testCreateUser() {
  const body = JSON.stringify({
    email: "test-create-long@example.com",
    password: "TestPass123!",
    email_confirm: true,
    user_metadata: { role: "admin", name: "Test User", username: "nivicybersolutions1234" }
  });

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: "POST",
      headers: {
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: body,
    });

    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
    
    if (res.ok) {
        const user = JSON.parse(text);
        if (user.id) {
            await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${user.id}`, {
            method: "DELETE",
            headers: {
                "apikey": SERVICE_ROLE_KEY,
                "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
            },
            });
        }
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}

testCreateUser();
