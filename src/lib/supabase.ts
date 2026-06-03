// 直接 REST API 方式提交线索，不依赖 Supabase JS 客户端
// 避免 RLS / Data API 权限问题

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export interface Lead {
  name: string;
  contact: string;
  subject: string;
  intent: string;
  note: string;
}

export async function submitLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "线索收集功能暂未开放，敬请期待。" };
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name,
        contact: lead.contact,
        subject: lead.subject,
        intent: lead.intent,
        note: lead.note,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { success: false, error: `提交失败 (${response.status})` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "提交失败，请稍后重试" };
  }
}
