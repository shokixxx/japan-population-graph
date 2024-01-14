import CheckBox from './components/CheckBox'
import Header from './components/Header'

const App = () => {
  const prefectures = ['北海道', '青森県']
  return (
    <>
      <div className="App">
        <Header />
        <main>
          <h2>都道府県</h2>
          {prefectures.map((prefecture, index) => (
            <CheckBox key={index} label={prefecture} />
          ))}
        </main>
      </div>
    </>
  )
}

export default App
