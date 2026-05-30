function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateWeekDates() {
  const dates = [];
  for (let i = -4; i <= 6; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    dates.push({
      urlDate: `${day}${month}${year}`,
      dbDate: `${year}-${month}-${day}`
    });
  }
  return dates;
}

module.exports = { sleep, generateWeekDates };
