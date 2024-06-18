import { createClient } from '@supabase/supabase-js';
import { Config } from 'configuration';
import { Database } from 'supabase-types';

export const supabase = createClient<Database>(
  Config.SUPABASE_URL,
  Config.SUPABASE_ANON_KEY
);