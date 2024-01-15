import { useEffect, useState } from 'react'

import CheckBox from './components/CheckBox'
import Header from './components/Header'
import utilStyles from './styles/utils.module.css'

type Prefectures = {
  prefCode: number
  prefName: string
}

const App = () => {
  const [prefectures, setPrefectures] = useState<Prefectures[]>([])

  useEffect(() => {
    const getPrefectures = async () => {
      await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: {
          'X-API-KEY': `${process.env.REACT_APP_API_X_API_KEY}`,
        },
      })
        .then((res) => res.json())
        .then((prefecture) => setPrefectures(prefecture.result))
    }
    getPrefectures()
  }, [])
  return (
    <>
      <div className="App">
        <Header />
        <main>
          <h2 className={utilStyles.headingM}>都道府県</h2>
          {prefectures &&
            prefectures.map((prefecture) => (
              <CheckBox key={prefecture.prefCode} label={prefecture.prefName} />
            ))}
        </main>
      </div>
    </>
  )
}

export default App
