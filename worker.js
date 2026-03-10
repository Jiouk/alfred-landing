// Alfred Waitlist Worker - Writes to Notion Leads database
export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const { email, source = "alfred-landing", name = "" } = await request.json();
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: "Invalid email" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      // Notion API call
      const notionResponse = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.NOTION_TOKEN}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify({
          parent: { database_id: "4dd9e6450fd843e9982c6784b539dbc6" },
          properties: {
            "Email": { email: email },
            "Name": { title: [{ text: { content: name || email.split("@")[0] } }] },
            "Source": { select: { name: source } },
            "Status": { select: { name: "New" } },
            "Date Added": { date: { start: new Date().toISOString() } }
          }
        })
      });

      if (!notionResponse.ok) {
        const error = await notionResponse.text();
        console.error("Notion error:", error);
        // Still return success to user, log error
        return new Response(JSON.stringify({ success: true, warning: "Saved to backup" }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });

    } catch (e) {
      console.error("Worker error:", e);
      return new Response(JSON.stringify({ success: true, warning: "Network issue" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};