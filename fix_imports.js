const fs = require('fs');
const path = require('path');

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          if (file.endsWith('.js') || file.endsWith('.jsx')) {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
}

walk('app', function(err, results) {
  if (err) throw err;
  
  let modifiedFiles = [];
  results.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    
    // Server components -> import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
    // Match exact string: import { createServerSupabaseClient } from '@/lib/supabase';
    if (content.includes("import { createServerSupabaseClient } from '@/lib/supabase';")) {
      content = content.replace(
        "import { createServerSupabaseClient } from '@/lib/supabase';",
        "import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';"
      );
      hasChanges = true;
    }
    
    // Client components -> import { createClient } from '@/lib/supabaseClient';
    // Match exact string: import { createClient } from '@/lib/supabase';
    if (content.includes("import { createClient } from '@/lib/supabase';")) {
      content = content.replace(
        "import { createClient } from '@/lib/supabase';",
        "import { createClient } from '@/lib/supabaseClient';"
      );
      hasChanges = true;
    }
    
    if (hasChanges) {
      fs.writeFileSync(file, content);
      modifiedFiles.push(file);
      console.log('Modified:', path.relative(process.cwd(), file));
    }
  });

  console.log('Total modified:', modifiedFiles.length);
});
