
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rxlrpeyjquspzyuujthg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bHJwZXlqcXVzcHp5dXVqdGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2OTcwMDMsImV4cCI6MjAzMTI3MzAwM30.PgJgI7Fw1gXdyEzzz443SUoGuMP9_1PH_cBN_PHcFM0'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
