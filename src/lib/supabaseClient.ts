import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Material = 'anyatej' | 'hajtincs' | 'mindkettő' | 'egyéb';

export interface InquiryInsert {
  name: string;
  email: string;
  phone?: string | null;
  material: Material;
  message?: string | null;
}

export async function submitInquiry(payload: InquiryInsert) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(payload)
    .select('id')
    .maybeSingle();

  if (error) throw error;
  return data;
}
