import { useEffect, useState } from 'react'

import { Prefecture } from '../pages/api/prefecture'
import layout from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import CheckBox from './CheckBox'
import Header from './Header'
import PopulationChart from './PopulationChart'

const App = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [selectedPrefecturesData, setSelectedPrefecturesData] = useState<
    Prefecture[]
  >([])

  useEffect(() => {
    const getPrefecturesData = async () => {
      try {
        const response = await fetch('/api/prefecture')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const prefecturesData = await response.json()
        prefecturesData && setPrefectures(prefecturesData)
      } catch (error) {
        console.error(error)
      }
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
