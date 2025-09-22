import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from 'astro:env/server';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    flowType: 'pkce',
  },
});

export { supabase };
