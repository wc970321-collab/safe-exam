import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// 1. 导出标准客户端（给登录和进度同步用）
export const supabase = createClient(supabaseUrl, supabaseKey)

// 2. 保留你原来的线索提交逻辑（适配旧代码）
export interface Lead {
  name: string;
  contact: string;
  subject: string;
  intent: string;
  note: string;
}

export async function submitLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: "功能暂未开放" };
  }

  // 使用新导出的客户端重写，更简洁
  const { error } = await supabase.from('leads').insert([lead])
  
  if (error) return { success: false, error: error.message };
  return { success: true };
}
