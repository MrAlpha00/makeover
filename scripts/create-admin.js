const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Must use service role key for admin user creation

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const email = process.argv[2] || 'admin@slvevents.in';
  const password = process.argv[3] || 'admin1234';

  console.log(`Creating admin user: ${email} ...`);

  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true
  });

  if (error) {
    console.error('Error creating user:', error.message);
  } else {
    console.log('✅ Admin user successfully created!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('You can now log in at /admin/login');
  }
}

createAdminUser();
