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
          'X-API-KEY': `${process.env.X_API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const prefecturesData = await response.json()
    return prefecturesData.result
  } catch (error) {
    alert('都道府県データの取得に失敗しました')
    return null
  }
}

/**
 * 都道府県コードに紐づく人口構成データを返します
 * @returns PopulationCompositionByPrefectures[] 都道府県別人口構成データの配列
 * @property boundaryYear 推計値の区切り年
 * @property data[] {label: 人口データ種類 data[]:{year:年 value:人口 rate:割合(labelが総人口の場合、存在しない)}
 */
export const getPopulationCompositionByPrefectures = async (
  prefCode: number
) => {
  try {
    const response = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
      {
        headers: {
          'X-API-KEY': `${process.env.X_API_KEY}`,
        },
      }
    )

    const populationCompositionByPrefecturesData = await response.json()
    return populationCompositionByPrefecturesData.result
  } catch (error) {
    alert('人口構成データの取得に失敗しました')
    throw error
  }
}
