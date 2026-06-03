function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getBrazilToday() {
  // UTC-3 (Brasília — sem ajuste DST, Brasil aboliu horário de verão em 2019)
  const now = new Date();
  const brt = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  return new Date(Date.UTC(brt.getUTCFullYear(), brt.getUTCMonth(), brt.getUTCDate()));
}

function generateWeekDates() {
  const dates = [];
  for (let i = -4; i <= 6; i++) {
    const d = getBrazilToday();
    d.setUTCDate(d.getUTCDate() + i);

    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();

    dates.push({
      urlDate: `${day}${month}${year}`,
      dbDate: `${year}-${month}-${day}`
    });
  }
  return dates;
}

module.exports = { sleep, generateWeekDates };
