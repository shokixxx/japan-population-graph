import { useEffect, useState } from 'react'

import { getPopulationCompositionByPrefectures, getPrefectures } from './api/api'
import CheckBox from './components/CheckBox'
import Header from './components/Header'
import PopulationChart from './components/PopulationChart'
import layout from './styles/layout.module.css'
import utilStyles from './styles/utils.module.css'

export type Prefectures = {
  prefCode: number
  prefName: string
}

const App = () => {
  const [prefectures, setPrefectures] = useState<Prefectures[]>([])
  const [selectedPrefecturesData, setSelectedPrefecturesData] = useState<
    Prefectures[]
  >([])

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
    setSelectedPrefecturesData((prevSelectedPrefecturesData) => {
      if (isChecked) {
        return [...prevSelectedPrefecturesData, { prefCode, prefName }]
      } else {
        return prevSelectedPrefecturesData.filter(
          (prevSelectedPrefectureData) =>
            prevSelectedPrefectureData.prefCode !== prefCode
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
                  label={prefecture.prefName}
                  isChecked={selectedPrefecturesData
                    .map(
                      (selectedPrefectureData) =>
                        selectedPrefectureData.prefCode
                    )
                    .includes(prefecture.prefCode)}
                  onChange={(checked) =>
                    handleCheckBoxChange(
                      prefecture.prefCode,
                      prefecture.prefName,
                      checked
                    )
                  }
                />
              ))}
          </div>
          <PopulationChart selectedPrefecturesData={selectedPrefecturesData} />
        </main>
      </div>
    </>
  )
}

export default App
