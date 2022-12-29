export function ask_question (name: string, message: string, type?: string, choices?: string[]) {
  return {
    name,
    message,
    type: type || 'input',
    choices,
  };
};