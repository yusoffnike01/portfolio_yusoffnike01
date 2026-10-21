import { test } from 'node:test';
import assert from 'node:assert/strict';
const { parseCommand } = await import('../src/lib/terminal.mjs').catch(() => ({}));
test('parser matches allowlisted commands, preserves raw input, rejects code and long input', () => {
  assert.equal(typeof parseCommand, 'function', 'parseCommand must exist');
  assert.deepEqual(parseCommand('  HELP  '), { command: 'help', raw: '  HELP  ', status: 'ok' });
  assert.equal(parseCommand(' ').status, 'empty');
  assert.equal(parseCommand('sudo hire-me').command, 'sudo hire-me');
  for (const input of ['help; clear', 'help | whoami', '<script>alert(1)</script>', 'sudo rm -rf /']) assert.equal(parseCommand(input).status, 'unknown');
  assert.equal(parseCommand('x'.repeat(201)).status, 'too-long');
});
