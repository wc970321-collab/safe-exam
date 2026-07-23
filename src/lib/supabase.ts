import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

// 只有在有真实配置时才真正初始化，防止编译阶段报错
export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Lead {
  name: string;
  contact: string;
  subject: string;
  intent: string;
  note: string;
}

export async function submitLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('leads').insert([lead])
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
