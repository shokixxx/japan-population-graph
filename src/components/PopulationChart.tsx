import React, { useEffect, useState } from 'react'
import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'

import { PopulationCompositionByPrefectures } from '../pages/api/population/[prefCode]'
import { Prefecture } from '../pages/api/prefecture'
import layout from '../styles/layout.module.css'
import CheckBox from './CheckBox'

type PopulationChartProps = {
  selectedPrefecturesData: Prefecture[]
}

const PopulationChart: React.FC<PopulationChartProps> = ({
  selectedPrefecturesData,
}) => {
  const [populationDataByPrefecturesData, setPopulationDataByPrefecturesData] =
    useState<PopulationCompositionByPrefectures[]>([])

  useEffect(() => {
    const getPopulationCompositionByPrefecturesData = async () => {
      if (selectedPrefecturesData.length > 0) {
        const promises = selectedPrefecturesData.map((selectedPrefectureData) =>
          fetch(`/api/population/${selectedPrefectureData.prefCode}`).then(
            (response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch data')
              }
              return response.json()
            }
          )
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

  const populationCompositions = new Set<string>()

  if (populationDataByPrefecturesData.length > 0) {
    populationDataByPrefecturesData.forEach((composition) => {
      composition.data.forEach((populationData) => {
        populationCompositions.add(populationData.label)
      })
    })
  }

  const uniquePopulationCompositions = Array.from(populationCompositions)

  const [selectedPopulationComposition, setSelectedPopulationComposition] =
    useState<string>()

  return (
    <>
      <div className={layout.populationComposition}>
        {uniquePopulationCompositions?.map((composition, index) => (
          <CheckBox
            key={index}
            label={composition}
            isChecked={composition === selectedPopulationComposition}
            onChange={(checked) => {
              if (checked) {
                setSelectedPopulationComposition(composition)
              }
            }}
          />
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400} minWidth={300}>
        <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" allowDuplicatedCategory={false} />
          <YAxis dataKey="value" width={70} />
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
      </ResponsiveContainer>
    </>
  )
}

export default PopulationChart
