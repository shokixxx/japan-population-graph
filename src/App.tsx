import { useEffect, useState } from 'react'

import { getPopulationCompositionByPrefectures, getPrefectures } from './api/api'
import CheckBox from './components/CheckBox'
import Header from './components/Header'
// import PopulationChart from './components/PopulationChart'
import layout from './styles/layout.module.css'
import utilStyles from './styles/utils.module.css'

export type Prefectures = {
  prefCode: number
  prefName: string
}

export type PopulationDataByPrefectures = {
  label: string
  data: {
    year: number
    value: number
    rate: number
  }[]
}

const App = () => {
  const [prefectures, setPrefectures] = useState<Prefectures[]>([])
  const [selectedPrefData, setSelectedPrefData] = useState<Prefectures[]>([])

  useEffect(() => {
    const getPrefecturesData = async () => {
      const prefecturesData = await getPrefectures()
      prefecturesData && setPrefectures(prefecturesData)
    }
    getPrefecturesData()
  }, [])

  const handleCheckBoxChange = (
    prefCode: number,
    prefName: string,
    isChecked: boolean
  ) => {
    setSelectedPrefData((prevSelectedPrefData) => {
      if (isChecked) {
        return [...prevSelectedPrefData, { prefCode, prefName }]
      } else {
        return prevSelectedPrefData.filter(
          (prevSelectedPref) => prevSelectedPref.prefCode !== prefCode
        )
      }
    })
  }

  return (
    <>
      <Header />
      <div className={layout.container}>
        <main>
          <h2 className={`${utilStyles.headingM} ${utilStyles.headingBox}`}>
            都道府県
          </h2>
          <div className={layout.prefecture}>
            {prefectures &&
              prefectures.map((prefecture) => (
                <CheckBox
                  key={prefecture.prefCode}
                  prefCode={prefecture.prefCode}
                  prefName={prefecture.prefName}
                  isChecked={selectedPrefData
                    .map((pref) => pref.prefCode)
                    .includes(prefecture.prefCode)}
                  onChange={handleCheckBoxChange}
                />
              ))}
          </div>
          {/* <PopulationChart
            populationDataByPrefectures={populationDataByPrefectures}
            selectedPopulationComposition={selectedPopulationComposition}
          /> */}
        </main>
      </div>
    </>
  )
}

export default App
