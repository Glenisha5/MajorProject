const fs = require('fs');
const path = require('path');

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('Removed', dir);
  } catch (err) {
    console.error('Failed to remove', dir, err.message);
    process.exitCode = 1;
  }
}

const repoRoot = path.resolve(__dirname, '..');
const nextDir = path.join(repoRoot, '.next');

// If .next exists, remove it to avoid stale/invalid artifacts
rmDir(nextDir);

// Also remove any .next in subprojects (common with monorepos)
const subNext = path.join(repoRoot, 'ai-house-project', '.next');
rmDir(subNext);

// Exit 0 so predev doesn't block the dev server unnecessarily
process.exitCode = 0;
