import Head from 'next/head'
import Link from 'next/link'

const Home = () =>
  <>
    <Head>
      <title>React Context Generator Example</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <main>
      <h1>React Context Generator Example</h1>
      <p>
        See the <Link href="/products">products page</Link>.
      </p>
    </main>
  </>

export default Home
