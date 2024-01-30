import Head from 'next/head'

import layout from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'

const Header = () => {
  return (
    <>
      <Head>
        <title>都道府県別人口グラフ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={`${utilStyles.headingL} ${layout.header}`}>
        都道府県別の総人口推移グラフ
      </h1>
    </>
  )
}

export default Header
