function areDatesInSameWeek(dateString1, dateString2) {
  const getDateOfMonday = (date) => {
    const dayOfWeek = date.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일인 경우 특별 처리
    const monday = new Date(date);
    monday.setDate(monday.getDate() + mondayOffset);
    return monday;
  };

  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // 각 날짜의 해당 주 월요일 구하기
  const monday1 = getDateOfMonday(date1);
  const monday2 = getDateOfMonday(date2);

  // 주 시작 날짜(월요일) 비교
  return (
    monday1.toISOString().split('T')[0] === monday2.toISOString().split('T')[0]
  );
}

function calculateTimeDifference(startTime, endTime, holiday) {
  const MEAL_TIME = 60;
  const HALF_DAY_WORKTIME = 240;
  // 시간과 분을 분리하여 정수로 변환
  const endHours = endTime.split(':').map(Number)[0];

  // 전체 시간을 분으로 변환
  const startTotalMinutes = convertHHMMToMinutes(startTime);
  const endTotalMinutes = convertHHMMToMinutes(endTime);
  let workTime = endTotalMinutes - startTotalMinutes - MEAL_TIME;
  // 20시 이후 퇴근하면 저녁시간 1시간 추가로 제외
  if (endHours >= 20) workTime -= MEAL_TIME;

  // 반차 시간 계산
  if (holiday === '반차(오후)') workTime += HALF_DAY_WORKTIME;
  if (holiday === '반차(오전)') workTime += HALF_DAY_WORKTIME + MEAL_TIME;

  return workTime;
}

function convertMinutesToHHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  // 시간과 분을 HH:MM 형식으로 포맷팅
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = mins.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

function convertHHMMToMinutes(dateString) {
  const [hours, minutes] = dateString.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
}
