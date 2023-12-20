function main() {
  setInterval(() => {
    const bodyDocument = document.querySelector('#frameBody')?.contentDocument;
    if (!bodyDocument) return;

    const listTable = bodyDocument.getElementById('listTable');
    if (!listTable) return;
    const trList = listTable.querySelectorAll('tr');
    if (!trList) return;

    let sumList = [];
    let appendIndexList = [];

    trList.forEach((tr, i) => {
      if (i === 0) return;
      const prevTdElement = trList[i - 1].querySelectorAll('td');
      const tdElement = tr.querySelectorAll('td');

      if (!tdElement) return;
      const prevDate = prevTdElement[7].innerText;
      const date = tdElement[7].innerText;

      if (!date || !prevDate) return;
      const startTime = tdElement[9].innerText;
      const endTime = tdElement[12].innerText;
      const isHoliday = tdElement[15].innerText;
      const workTime = calculateTimeDifference(startTime, endTime, isHoliday);
      tdElement[14].innerText = convertMinutesToHHMM(workTime);

      // 첫 element
      if (i === 1) sumList.push(0);
      else if (!areDatesInSameWeek(date, prevDate)) {
        sumList.push(0);
        appendIndexList.push(appendIndexList.length + i - 1);
      }
      sumList[sumList.length - 1] += workTime;
      if (i === trList.length - 1)
        appendIndexList.push(appendIndexList.length + trList.length - 1);
    });

    appendIndexList.forEach((index, idx) => {
      const newTr = createNewTr(sumList[idx]);
      listTable.children[1].insertBefore(
        newTr,
        listTable.children[1].children[index]
      );
    });
  }, 500);
}
main();
