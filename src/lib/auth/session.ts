import { createSupabaseServerClient } from '../supabase/server';

export async function getServerUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.warn('Error fetching user:', error.message);
    return null;
  }
  return data.user ?? null;
}
