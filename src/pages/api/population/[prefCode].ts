import type { NextApiRequest, NextApiResponse } from 'next'

type PopulationCompositionResponse = {
  message: string | null
  result: PopulationCompositionByPrefectures[]
}

export type PopulationCompositionByPrefectures = {
  boundaryYear: number
  data: PopulationDataByPrefectures[]
}

export type PopulationDataByPrefectures = {
  label: string
  data: {
    year: number
    value: number
    rate?: number
  }[]
}

/**
 * 都道府県コードに紐づく人口構成データを返します
 * @returns PopulationCompositionByPrefectures[] 都道府県別人口構成データの配列
 * @property boundaryYear 推計値の区切り年
 * @property data[] {label: 人口データ種類 data[]:{year:年 value:人口 rate:割合(labelが総人口の場合、存在しない)}
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopulationCompositionByPrefectures[]>
) {
  const { prefCode } = req.query
  const apiKey = process.env.X_API_KEY

  if (apiKey === undefined) {
    res.status(500)
    return
  }

  try {
    const populationRes = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode as string}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
        },
      }
    )

    if (!populationRes.ok) {
      res.status(populationRes.status)
      return
    }

    const populationCompositionByPrefecturesData: PopulationCompositionResponse =
      await populationRes.json()
    res.status(200).json(populationCompositionByPrefecturesData.result)
  } catch (error) {
    res.status(500)
  }
}
