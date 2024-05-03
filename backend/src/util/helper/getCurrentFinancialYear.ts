export const getCurrFinancialYear = () => {
  const currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  
  if(currentMonth < 4) currentYear = currentMonth - 1;
  
  const nextYear = currentYear + 1;

  const startDate = `${currentYear}-04-01`;
  const endDate = `${nextYear}-03-31`;

  return { startDate, endDate };
};
