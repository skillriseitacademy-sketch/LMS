const SUPABASE_URL = "https://quubhddtekisbprqvbyj.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dWJoZGR0ZWtpc2JwcnF2YnlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzAwNDEyMSwiZXhwIjoyMDk4NTgwMTIxfQ.NHwFuvIDrNA0tfIHiBfUQywuDSrlJB1v6d25j6q7WG4";

async function testCreateUser() {
  console.log("Testing Supabase admin createUser API...");
  
  const body = JSON.stringify({
    email: "test-create-99999@example.com",
    password: "TestPass123!",
    email_confirm: true,
    user_metadata: { role: "admin", name: "Test User" }
  });

  console.log("Request body:", body);

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

    console.log("Status:", res.status, res.statusText);
    
    const text = await res.text();
    console.log("Response:", text);
    
    if (res.ok) {
      console.log("\n✅ SUCCESS! User creation works.");
      // Clean up - delete the test user
      const user = JSON.parse(text);
      if (user.id) {
        const delRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${user.id}`, {
          method: "DELETE",
          headers: {
            "apikey": SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
          },
        });
        console.log("Cleanup (delete test user):", delRes.status);
      }
    } else {
      console.log("\n❌ FAILED. Error details above.");
    }
  } catch (e) {
    console.error("Network error:", e.message);
  }
}

testCreateUser();
