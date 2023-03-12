import '@/src/styles/globals.css'
import Site from '../lib/Site.jsx'

const App = ({ Component, pageProps }) =>
  <Site Component={Component} pageProps={pageProps}/>

export default App
