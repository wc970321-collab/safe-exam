// Supabase 客户端 — 懒初始化模式
// 避免在未配置 Supabase 环境变量时模块加载就报错

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export interface Lead {
  name: string;
  contact: string;
  subject: string;
  intent: string;
  note: string;
  created_at?: string;
}

let clientInitialized = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabaseClient: any = null;

function getClient() {
  if (!clientInitialized) {
    if (supabaseUrl && supabaseAnonKey) {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    }
    clientInitialized = true;
  }
  return supabaseClient;
}

export async function submitLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { success: false, error: "线索收集功能暂未开放，敬请期待。" };
  }

  try {
    const client = getClient();
    if (!client) {
      return { success: false, error: "数据库连接未配置。" };
    }
    const { error } = await client.from("leads").insert([lead]);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "提交失败，请稍后重试" };
  }
}
