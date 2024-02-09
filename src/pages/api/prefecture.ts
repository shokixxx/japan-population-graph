import type { NextApiRequest, NextApiResponse } from 'next'

type PrefectureResponse = {
  message: string | null
  result: Prefecture[]
}

export type Prefecture = {
  prefCode: number
  prefName: string
}

/**
 * 都道府県に関する都道府県データを返します
 * @returns PrefectureData[] 都道府県データの配列
 * @property prefCode 都道府県コード
 * @property prefName 都道府県名
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prefecture[]>
) {
  const apiKey = process.env.X_API_KEY
  if (apiKey === undefined) {
    res.status(500)
    return
  }

  const resusRes = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
      },
    }
  )

  if (!resusRes.ok) {
    res.status(resusRes.status)
    return
  }

  const prefecturesData: PrefectureResponse = await resusRes.json()
  res.status(200).json(prefecturesData.result)
}
