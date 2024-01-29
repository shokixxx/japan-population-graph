import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

import { getPopulationCompositionByPrefectures } from '../api/api'
import { Prefectures } from '../App'

type PopulationChartProps = {
  selectedPrefecturesData: Prefectures[]
}

type PopulationComposition = {
  boundaryYear: number
  data: PopulationDataByPrefectures[]
}

type PopulationDataByPrefectures = {
  label: string
  data: {
    year: number
    value: number
    rate: number
  }[]
}

const PopulationChart: React.FC<PopulationChartProps> = ({
  selectedPrefecturesData,
}) => {
  const [populationDataByPrefecturesData, setPopulationDataByPrefecturesData] =
    useState<PopulationComposition[]>([])

  useEffect(() => {
    const getPopulationCompositionByPrefecturesData = async () => {
      if (selectedPrefecturesData.length > 0) {
        const promises = selectedPrefecturesData.map((selectedPrefectureData) =>
          getPopulationCompositionByPrefectures(selectedPrefectureData.prefCode)
        )
        try {
          const resolvedData = await Promise.all(promises)
          setPopulationDataByPrefecturesData(resolvedData)
        } catch (error) {
          alert('人口構成データの取得処理に失敗しました')
        }
      }
    }

    getPopulationCompositionByPrefecturesData()
  }, [selectedPrefecturesData])

  // TODO:選択できるよう修正
  const selectedPopulationComposition = '総人口'

  return (
    <LineChart
      width={1000}
      height={400}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" allowDuplicatedCategory={false} />
      <YAxis dataKey="value" width={100} />
      <Tooltip />
      <Legend />
      {populationDataByPrefecturesData?.length ===
      selectedPrefecturesData.length
        ? populationDataByPrefecturesData.map((populationData, index) => {
            const selectedPopulationData = populationData.data.find(
              (c) => c.label === selectedPopulationComposition
            )?.data

            if (selectedPopulationData) {
              return (
                <Line
                  key={index}
                  type="monotone"
                  dataKey="value"
                  name={selectedPrefecturesData[index].prefName}
                  data={selectedPopulationData}
                  stroke={`hsl(${
                    selectedPrefecturesData[index].prefCode +
                    Math.floor(Math.random() * 101)
                  }, 50%, 50%)`}
                />
              )
            }
          })
        : null}
    </LineChart>
  )
}

export default PopulationChart
