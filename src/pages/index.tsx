import Head from 'next/head'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <>
      <Head>
        <title>都道府県別人口グラフ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  )
}

export default Home
