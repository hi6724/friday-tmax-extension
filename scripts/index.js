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
      // header 변경
      if (i === 0) {
        const tdElement = tr.querySelectorAll('td');
        tdElement[17].innerText = '업보';
        if (tr.childElementCount == 20) return;
        const newTd = document.createElement('td');
        newTd.innerText = '업보스택';
        tr.insertBefore(newTd, tr.children[18]);
        return;
      }

      const prevTdElement = trList[i - 1].querySelectorAll('td');
      const tdElement = tr.querySelectorAll('td');

      if (!tdElement) return;
      const prevDate = prevTdElement[7].innerText;
      const date = tdElement[7].innerText;

      if (!date || !prevDate) return;
      const startTime = tdElement[9].innerText;
      const endTime = tdElement[12].innerText;
      const isHoliday = tdElement[15].innerText;

      const workTime = getWorkTime(startTime, endTime, isHoliday);
      tdElement[14].innerText = convertMinutesToHHMM(workTime);

      // 첫 element
      if (i === 1) sumList.push([]);
      else if (!areDatesInSameWeek(date, prevDate)) {
        sumList.push([]);
        appendIndexList.push(appendIndexList.length + i - 1);
      }
      sumList[sumList.length - 1].push(workTime + findLastElement(sumList));
      if (i === trList.length - 1)
        appendIndexList.push(appendIndexList.length + trList.length - 1);

      // 오늘의 업보
      tdElement[17].innerText = calculateUpBo(workTime, 1);
      // 업보스택
      if (tr.childElementCount == 24) {
        const upboStack = document.createElement('td');
        upboStack.innerText = calculateUpBo(
          findLastElement(sumList),
          sumList[sumList.length - 1].length
        );
        tr.insertBefore(upboStack, tr.children[18]);
      }
    });

    // 누적 시간 행 추가 로직
    appendIndexList.forEach((index, idx) => {
      const newTr = createNewTr(sumList[idx][sumList[idx].length - 1]);
      listTable.children[1].insertBefore(
        newTr,
        listTable.children[1].children[index]
      );
    });
  }, 500);
}
main();
