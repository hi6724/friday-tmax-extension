function createNewTr(time) {
  const newTr = document.createElement('tr');
  newTr.innerHTML = `
      <tr class="td01_data_C odd" style="cursor:default; line-height: 1.6;">
        <td class="testClass">-1</td>
        <td align="left"></td>
        <td align="left"></td>
        <td align="center"></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>총 ${convertMinutesToHHMM(time)}</td>
        <td>퇴근까지 ${convertMinutesToHHMM(
          calculateTimeDifference(convertMinutesToHHMM(time), '40:00')
        )}</td>
        <td></td>
        <td></td>
        <td align="left"><div class="wrap"><textarea placeholder="비고란을 입력하세요." onkeyup="textareaResize(this)" style="width: 99%; height: auto;" value="" onchange="fn_update_remark(2,this.value)"></textarea></div></td>
        <input type="hidden" name="statusEmp" id="statusEmp" value="2023602">
        <input type="hidden" name="statusDate" id="statusDate" value="20231212">
        <input type="hidden" name="statusKind" id="statusKind" value="01">
        <input type="hidden" name="empCls_2" id="empCls_2" value="01">
        <input type="hidden" id="rowIdx2" name="rowIdx">
      </tr>
    `;
  return newTr;
}
