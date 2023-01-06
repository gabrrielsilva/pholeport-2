export default function get_error_message (error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}