import layout from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'

const Header = () => {
  return (
    <header>
      <h1 className={`${utilStyles.headingL} ${layout.header}`}>
        都道府県別の総人口推移グラフ
      </h1>
    </header>
  )
}

export default Header
