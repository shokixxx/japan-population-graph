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

  useEffect(() => {
    const getPrefecturesData = async () => {
      const prefecturesData = await getPrefectures()
      prefecturesData && setPrefectures(prefecturesData)
    }
    getPrefecturesData()
  }, [])
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
                />
              ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default App
