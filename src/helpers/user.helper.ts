export const getInitials = (name: string, maxChar: number) => {
  return name
    .split(/\s/)
    .map(word => word[0])
    .join("")
    .substr(0, maxChar)
    .toUpperCase();
};
