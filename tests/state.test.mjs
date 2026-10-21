import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as terminal from '../src/lib/terminal.mjs';
test('terminal keeps bounded session history, clears only output, and does not record empty input', () => {
  assert.equal(typeof terminal.executeCommand, 'function', 'executeCommand must exist');
  let state = terminal.initialState;
  assert.equal(terminal.executeCommand(state, ' '), state);
  state = terminal.executeCommand(state, '  HELP  ');
  assert.equal(state.history[0], '  HELP  ');
  state = terminal.executeCommand(state, 'history');
  assert.deepEqual(state.output.at(-1).history, ['  HELP  ']);
  state = terminal.executeCommand(state, 'clear');
  assert.equal(state.output.length, 0);
  assert.equal(state.history.length, 3);
  for (let i=0; i<110; i++) state = terminal.executeCommand(state, 'help');
  assert.equal(state.history.length, 50);
  assert.equal(state.output.length, 100);
  state = terminal.executeCommand(state, 'x'.repeat(201));
  assert.equal(state.output.at(-1).status, 'too-long');
  assert.equal(state.history.at(-1), 'help');
  for (const cmd of terminal.COMMANDS) {
    const result = terminal.executeCommand(terminal.initialState, cmd);
    if (cmd !== 'clear') assert.equal(result.output.at(-1).command, cmd);
  }
});
