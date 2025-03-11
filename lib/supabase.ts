import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra as { 
  supabaseUrl: string; 
  supabaseAnonKey: string; 
} | undefined;

if (!extra || !extra.supabaseUrl || !extra.supabaseAnonKey) {
  throw new Error(
    "Missing Supabase URL and/or anon key. Please check your .env and app.config.js configuration."
  );
}

const supabase = createClient(extra.supabaseUrl, extra.supabaseAnonKey);

export default supabase;
