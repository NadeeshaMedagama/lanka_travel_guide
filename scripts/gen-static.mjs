// Regenerates the static attractions snapshot from db.json before each build.
// This keeps the deployed (no-backend) data in sync with the json-server source of truth,
// so editing db.json automatically updates what the production site serves.
import fs from 'node:fs';

const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/attractions.json', JSON.stringify(db.attractions));
console.log(`[gen-static] wrote public/attractions.json (${db.attractions.length} attractions)`);
