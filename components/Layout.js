// import Link from 'next/link'
import Footer from './Footer/Footer'
import Header from './Header/Header'

export default function Layout({ children }) {
  return (
    <div className="layout">

      <Header />

      <div className="page-content">
        { children }
      </div>

      <Footer />
    </div>
  )
}
