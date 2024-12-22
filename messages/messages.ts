export const startMessage: string = [
  "Thanks for using the SUTD Printer Status Bot!",
  "",
  "Commands:",
  "/start - View commands",
  "/status - View statuses for all printers in SUTD",
  "/submit - Submit the current status of a printer you're using",
].join("\n");

export const statusMessage = (): string => {
  return "status table here";
};
