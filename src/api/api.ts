/**
 * 都道府県に関する都道府県データを返します
 * @returns PrefectureData[] 都道府県データの配列
 * @property prefCode 都道府県コード
 * @property prefName 都道府県名
 */
export const getPrefectures = async () => {
  try {
    const response = await fetch(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      {
        headers: {
          'X-API-KEY': `${process.env.REACT_APP_API_X_API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const prefecturesData = await response.json()
    return prefecturesData.result
  } catch (error) {
    alert('データの取得に失敗しました')
    return null
  }
}
