import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, whatsapp, message } = await req.json();

    // Use Lovable AI to format and log — actual email delivery
    // is handled via the SMTP relay below
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      // Fallback: just log the inquiry (it's already saved in the DB)
      console.log("Contact inquiry received (no email provider configured):", {
        name,
        email,
        phone,
        whatsapp,
        message,
      });
      return new Response(
        JSON.stringify({ success: true, method: "db_only" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification email to the business
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ethiopia Travel Explorer <onboarding@resend.dev>",
        to: ["info@ethiopiatravelexplorer.com"],
        subject: `New Inquiry from ${name}`,
        html: `
          <h2>New Contact Inquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone}</td></tr>` : ""}
            ${whatsapp ? `<tr><td style="padding:8px;font-weight:bold;">WhatsApp</td><td style="padding:8px;">${whatsapp}</td></tr>` : ""}
            <tr><td style="padding:8px;font-weight:bold;">Message</td><td style="padding:8px;">${message}</td></tr>
          </table>
          <p style="margin-top:16px;color:#666;">Reply directly to this email or contact the customer via the details above.</p>
        `,
        reply_to: email,
      }),
    });

    const emailData = await emailResponse.json();
    if (!emailResponse.ok) {
      console.error("Email send failed:", emailData);
    }

    return new Response(
      JSON.stringify({ success: true, method: "email" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-contact-email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
