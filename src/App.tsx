import { useEffect, useState } from 'react'

import { getPopulationCompositionByPrefectures, getPrefectures } from './api/api'
import CheckBox from './components/CheckBox'
import Header from './components/Header'
import PopulationChart from './components/PopulationChart'
import layout from './styles/layout.module.css'
import utilStyles from './styles/utils.module.css'

type Prefectures = {
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
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([])
  const [populationDataByPrefectures, setPopulationDataByPrefectures] =
    useState<PopulationDataByPrefectures[]>([])

  // TODO:選択できるよう修正
  const selectedPopulationComposition = '総人口'

  useEffect(() => {
    const getPrefecturesData = async () => {
      const prefecturesData = await getPrefectures()
      prefecturesData && setPrefectures(prefecturesData)
    }
    getPrefecturesData()
  }, [])

  const handleCheckBoxChange = (prefCode: number, isChecked: boolean) => {
    setSelectedPrefCodes((prevSelectedPrefCodes) => {
      if (isChecked) {
        return [...prevSelectedPrefCodes, prefCode]
      } else {
        return prevSelectedPrefCodes.filter(
          (prevSelectedPrefCode) => prevSelectedPrefCode !== prefCode
        )
      }
    })
  }

  useEffect(() => {
    const getPopulationCompositionByPrefecturesData = async () => {
      if (selectedPrefCodes.length > 0) {
        const promises = selectedPrefCodes.map((prefCode) =>
          getPopulationCompositionByPrefectures(prefCode)
        )
        try {
          const populationDataByPrefecturesData = await Promise.all(promises)
          setPopulationDataByPrefectures(populationDataByPrefecturesData)
        } catch (error) {
          alert('人口構成データの取得処理に失敗しました')
        }
      }
    }
    getPopulationCompositionByPrefecturesData()
  }, [selectedPrefCodes])

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
                  isChecked={selectedPrefCodes.includes(prefecture.prefCode)}
                  onChange={handleCheckBoxChange}
                />
              ))}
          </div>
          <PopulationChart
            populationDataByPrefectures={populationDataByPrefectures}
            selectedPopulationComposition={selectedPopulationComposition}
          />
        </main>
      </div>
    </>
  )
}

export default App
