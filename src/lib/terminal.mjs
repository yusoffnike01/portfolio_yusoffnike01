export const COMMANDS = Object.freeze(['help', 'whoami', 'about', 'skills', 'projects', 'experience', 'resume', 'contact', 'clear', 'history', 'theme', 'sudo hire-me']);
export const initialState = Object.freeze({ history: [], output: [], sequence: 0 });
export function executeCommand(state, raw) {
  const parsed = parseCommand(raw);
  if (parsed.status === 'empty') return state;
  const sequence = state.sequence + 1;
  const history = parsed.status === 'too-long' ? state.history : [...state.history, raw].slice(-50);
  if (parsed.command === 'clear') return { history, output: [], sequence };
  const entry = { ...parsed, id: sequence, ...(parsed.command === 'history' ? { history: [...state.history] } : {}) };
  return { history, output: [...state.output, entry].slice(-100), sequence };
}
export function parseCommand(raw) {
  if (raw.length > 200) return { raw, status: 'too-long' };
  const command = raw.trim().toLowerCase();
  if (!command) return { raw, status: 'empty' };
  return { raw, command, status: COMMANDS.includes(command) ? 'ok' : 'unknown' };
}
