const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(file));
      } else {
        if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
          results.push(file);
        }
      }
    });
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.error(e);
    }
  }
  return results;
}

const files = walk('app');
let changedFiles = [];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match `from '../../lib/supabase'` or any amount of `../` before `lib/supabase`
  // Also match inside single or double quotes
  // We use regex to carefully grab the import
  const newContent = content.replace(/from\s+['"](?:\.\.\/)+lib\/supabase['"]/g, "from '@/lib/supabase'");

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedFiles.push(file);
  }
});

console.log('Updated the following files:\n' + changedFiles.join('\n'));
