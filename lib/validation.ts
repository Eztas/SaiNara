export const parseCoords = (value: string | null | undefined, defaultValue: number): number => {
    if (!value) return defaultValue;
    const parsed = parseFloat(value);

    return Number.isNaN(parsed) ? defaultValue : parsed;
}

export const parseTime = (time: string | null | undefined, defaultTime: string = "1800"): string => {
  if (!time) return defaultTime;

  // 正規表現でチェック
  // ^       : 先頭
  // (       : 時のグループ
  //   [01]  : 0または1から始まり
  //   [0-9] : 次に0-9が来る (00時～19時)
  //   |     : または
  //   2     : 2から始まり
  //   [0-3] : 次に0-3が来る (20時～23時)
  // )
  // [0-5]   : 分の十の位は0-5 (00分～59分)
  // [0-9]   : 分の一の位は0-9
  // $       : 末尾
  const timeRegex = /^([01][0-9]|2[0-3])[0-5][0-9]$/;

  return timeRegex.test(time) ? time : defaultTime;
};
