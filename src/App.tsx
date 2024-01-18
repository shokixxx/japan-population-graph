import { useEffect, useState } from 'react'

import { getPrefectures } from './api/api'
import CheckBox from './components/CheckBox'
import Header from './components/Header'
import layout from './styles/layout.module.css'
import utilStyles from './styles/utils.module.css'

type Prefectures = {
  prefCode: number
  prefName: string
}

const App = () => {
  const [prefectures, setPrefectures] = useState<Prefectures[]>([])
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([])

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
        </main>
      </div>
    </>
  )
}

export default App
