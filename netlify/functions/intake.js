export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const data = await req.formData();
  if (data.get("bot-field")) return Response.redirect("/thank-you.html", 302);
  try {
    const nf = new FormData();
    ["form-name","first-name","last-name","phone","email","case-type","county","time-missed","warrant","prior-reset","quoted-fee"].forEach(k => {
      nf.append(k === "form-name" ? k : k, k === "form-name" ? "intake" : (data.get(k.replace(/-([a-z])/g, (_,c) => c.toUpperCase())) || data.get(k) || ""));
    });
    nf.set("form-name", "intake");
    await fetch("https://resetmycourtdate.com/", { method: "POST", body: nf });
  } catch (err) { console.error("Forms error:", err.message); }
  return Response.redirect("/thank-you.html", 302);
};
export const config = { path: "/submit-intake" };
