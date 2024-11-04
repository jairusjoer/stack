export const ConsoleBadge = (label: string) => {
  const style = `
      background: #64f;
      border-radius: 0.5em;
      color: white;
      font-weight: bold;
      padding: 2px 0.5em;
    `;

  return [`%c${label}`, style];
};
