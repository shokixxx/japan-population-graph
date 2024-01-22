import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

import { PopulationDataByPrefectures } from '../App'

type PopulationChartProps = {
  populationDataByPrefectures: PopulationDataByPrefectures[]
  selectedPopulationComposition: string
}

const PopulationChart: React.FC<PopulationChartProps> = ({
  populationDataByPrefectures,
  selectedPopulationComposition,
}) => {
  const selectedData =
    populationDataByPrefectures
      ?.flat()
      .find((data) => data.label === selectedPopulationComposition)?.data || []
  return (
    <LineChart
      width={1000}
      height={400}
      data={selectedData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" name="総人口" stroke="#8884d8" />
    </LineChart>
  )
}

export default PopulationChart
