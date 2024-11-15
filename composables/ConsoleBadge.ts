export const ConsoleBadge = (label: string, color: string = '#7f8c8d') => {
  const style = `
      background: ${color};
      border-radius: 0.5em;
      color: white;
      font-weight: bold;
      padding: 2px 0.5em;
    `;

  return [`%c${label}`, style];
};
