function findLastElement(arr) {
  // 마지막 요소가 배열이라면, 재귀적으로 함수를 다시 호출합니다.
  if (Array.isArray(arr[arr.length - 1])) {
    return findLastElement(arr[arr.length - 1]);
  } else {
    // 마지막 요소가 더 이상 배열이 아니라면, 그 값을 반환합니다.
    return arr[arr.length - 1] ?? 0;
  }
}
