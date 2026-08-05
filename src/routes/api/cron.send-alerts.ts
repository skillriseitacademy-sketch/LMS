import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email.server";

export const Route = createFileRoute("/api/cron/send-alerts" as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const sc = createClient(
          process.env.VITE_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
        );

        // 1. Get active job alerts
        const { data: alerts, error: alertsError } = await sc
          .from("job_alerts")
          .select("*, profiles:user_id(email, name)")
          .eq("is_active", true);

        if (alertsError) {
          console.error("Failed to fetch alerts", alertsError);
          return new Response(JSON.stringify({ error: alertsError.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }

        // 2. Get jobs from the last 24 hours
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const { data: recentJobs, error: jobsError } = await sc
          .from("job_listings")
          .select("*")
          .gte("created_at", yesterday.toISOString());

        if (jobsError) {
          console.error("Failed to fetch recent jobs", jobsError);
          return new Response(JSON.stringify({ error: jobsError.message }), { status: 500, headers: { "Content-Type": "application/json" } });
        }

        const emailsSent = [];

        // 3. Match jobs to alerts
        if (alerts && recentJobs) {
          for (const alert of alerts) {
            const matchingJobs = recentJobs.filter((job) => {
              const roleMatch = job.title.toLowerCase().includes(alert.role_keyword.toLowerCase());
              const locationMatch = !alert.location_keyword || (job.location && job.location.toLowerCase().includes(alert.location_keyword.toLowerCase()));
              return roleMatch && locationMatch;
            });

            if (matchingJobs.length > 0 && alert.profiles?.email) {
              const userName = alert.profiles.name || 'there';
              
              const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              let html = `
<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #F7F8FC; }
  table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  a { text-decoration: none; }
</style>
</head>
<body style="background-color: #F7F8FC; padding: 40px 20px; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #191932;">
  <div style="max-width: 800px; margin: 0 auto; background-color: #FFFFFF; border-radius: 24px; padding: 40px; box-shadow: 0 10px 30px rgba(30,40,90,0.08);">
    
    <!-- HEADER -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 40px;">
      <tr>
        <td align="left" valign="middle">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div style="background-color: #191932; padding: 12px 24px; border-radius: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                  <img src="https://pub-481b0427a8aa499d808884386271d393.r2.dev/email-assets/nivi-logo.png" height="48" alt="Nivi Cyber Solutions" style="display: block; max-height: 48px;" />
                </div>
              </td>
            </tr>
          </table>
        </td>
        <td align="right" valign="middle">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-right: 12px;">
                <div style="width: 40px; height: 40px; border-radius: 10px; border: 1px solid #ECECF4; background: #FFFFFF; text-align: center; line-height: 40px;">
                  <img src="https://cdn-icons-png.flaticon.com/512/2838/2838779.png" width="20" height="20" alt="Calendar" style="vertical-align: middle; filter: invert(28%) sepia(91%) saturate(2329%) hue-rotate(242deg) brightness(97%) contrast(92%);" />
                </div>
              </td>
              <td align="right">
                <div style="font-weight: 700; font-size: 13px; color: #5B4CF0; letter-spacing: 0.5px;">DAILY JOB ALERT</div>
                <div style="font-size: 13px; color: #666; margin-top: 2px;">${currentDate}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- HERO SECTION -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #191932 0%, #30267a 50%, #5B4CF0 100%); border-radius: 20px; margin-bottom: 30px;">
      <tr>
        <td style="padding: 40px;" width="60%" valign="middle">
          <div style="color: rgba(255,255,255,0.8); font-size: 16px; margin-bottom: 8px;">Daily Job Alerts for</div>
          <div style="color: #FFFFFF; font-size: 36px; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; margin-bottom: 24px; line-height: 1.2;">${alert.role_keyword}</div>
          <div style="width: 40px; height: 3px; background-color: #7C4DFF; margin-bottom: 24px; border-radius: 2px;"></div>
          <div style="color: #FFFFFF; font-size: 18px; font-weight: 600; margin-bottom: 8px;">Hi ${userName},</div>
          <div style="color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.5;">We found ${matchingJobs.length} new jobs matching your search today.</div>
        </td>
        <td width="40%" valign="middle" align="center" style="padding: 20px;">
          <!-- 3D Envelope -->
          <img src="https://pub-481b0427a8aa499d808884386271d393.r2.dev/email-assets/3d-envelope.png" alt="Job Alert Envelope" width="240" style="display: block; max-width: 100%;" onerror="this.src='https://placehold.co/400x300/191932/FFFFFF?text=3D+Envelope'" />
        </td>
      </tr>
    </table>

    <!-- JOB CARDS -->
    <div style="margin-bottom: 30px;">
      ${matchingJobs.map(job => `
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #FFFFFF; border-radius: 18px; border: 1px solid #ECECF4; box-shadow: 0 4px 12px rgba(30,40,90,0.03); margin-bottom: 16px; overflow: hidden;">
        <tr>
          <td width="4" style="background-color: #5B4CF0;"></td>
          <td style="padding: 24px;" valign="middle">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="64" valign="middle">
                  <div style="width: 48px; height: 48px; border-radius: 12px; border: 1px solid #ECECF4; background: #F8F9FD; text-align: center; line-height: 48px; overflow: hidden;">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=ffffff&color=5B4CF0&size=48&bold=true" width="48" height="48" style="display: block; border: none;" />
                  </div>
                </td>
                <td valign="middle" style="padding-right: 16px;">
                  <div style="font-size: 18px; font-weight: 700; color: #191932; margin-bottom: 4px; font-family: 'Plus Jakarta Sans', sans-serif;">${job.title}</div>
                  <div style="font-size: 14px; color: #5B4CF0; font-weight: 600;">${job.company} <span style="color: #999; font-weight: 400; margin: 0 4px;">&bull;</span> <span style="color: #666; font-weight: 400;">${job.location || 'Remote'}</span></div>
                </td>
                <td align="right" valign="middle" width="140">
                  <a href="${job.url}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(90deg, #7C4DFF 0%, #5B4CF0 100%); color: #FFFFFF; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(91,76,240,0.3);">Apply Now &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      `).join('')}
    </div>

    <!-- FOOTER ALERT -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #F0EEFF; border-radius: 16px; margin-bottom: 40px;">
      <tr>
        <td style="padding: 16px 24px;" valign="middle">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="32" valign="middle">
                <div style="width: 24px; height: 24px; border-radius: 50%; background: #5B4CF0; text-align: center; line-height: 24px;">
                  <img src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png" width="12" height="12" style="filter: brightness(0) invert(1); vertical-align: middle;" />
                </div>
              </td>
              <td valign="middle">
                <div style="font-size: 13px; color: #30267a; font-weight: 500;">You are receiving this email because you subscribed to daily job alerts on PlacePro LMS.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- BOTTOM FOOTER -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="bottom" width="50%">
          <div style="font-size: 13px; color: #666; margin-bottom: 12px; font-weight: 500;">Stay connected with us</div>
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-right: 16px;">
                <a href="#" style="display: inline-block; width: 48px; height: 48px; background: #5B4CF0; border-radius: 50%; text-align: center; line-height: 48px; box-shadow: 0 6px 12px rgba(91,76,240,0.25);">
                  <img src="https://pub-481b0427a8aa499d808884386271d393.r2.dev/email-assets/custom-linkedin.png" width="48" height="48" style="vertical-align: middle; border-radius: 50%;" alt="LinkedIn" />
                </a>
              </td>
              <td style="padding-right: 16px;">
                <a href="#" style="display: inline-block; width: 48px; height: 48px; background: #5B4CF0; border-radius: 50%; text-align: center; line-height: 48px; box-shadow: 0 6px 12px rgba(91,76,240,0.25);">
                  <img src="https://pub-481b0427a8aa499d808884386271d393.r2.dev/email-assets/custom-youtube.png" width="48" height="48" style="vertical-align: middle; border-radius: 50%;" alt="YouTube" />
                </a>
              </td>
              <td>
                <a href="#" style="display: inline-block; width: 48px; height: 48px; background: #5B4CF0; border-radius: 50%; text-align: center; line-height: 48px; box-shadow: 0 6px 12px rgba(91,76,240,0.25);">
                  <img src="https://pub-481b0427a8aa499d808884386271d393.r2.dev/email-assets/custom-website.png" width="48" height="48" style="vertical-align: middle; border-radius: 50%;" alt="Website" />
                </a>
              </td>
            </tr>
          </table>
        </td>
        <td valign="bottom" align="right" width="50%">
          <div style="font-family: 'Caveat', 'Dancing Script', cursive; font-size: 24px; color: #5B4CF0; line-height: 1.2; transform: rotate(-2deg); display: inline-block;">
            Build your future.<br/>We'll help you get there.
          </div>
        </td>
      </tr>
    </table>

  </div>
</body>
</html>
`;

              const success = await sendEmail({
                to: alert.profiles.email,
                subject: `[Daily Alert] ${matchingJobs.length} new jobs for ${alert.role_keyword}`,
                html,
              });

              if (success) {
                emailsSent.push(alert.profiles.email);
              }
            }
          }
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: `Sent ${emailsSent.length} alert emails.`,
            emails: emailsSent
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      },
    },
  },
});
