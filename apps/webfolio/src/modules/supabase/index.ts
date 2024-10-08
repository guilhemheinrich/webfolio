import { createClient } from '@supabase/supabase-js';
import { Config } from 'src/modules/configuration';
import { Database } from 'supabase-types';

export const supabase = createClient<Database>(
  Config.SUPABASE_URL,
  Config.ADMIN ? Config.SUPABASE_SERVICE_KEY : Config.SUPABASE_ANON_KEY,
);
