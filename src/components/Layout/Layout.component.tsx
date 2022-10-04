import Footer from '../Footer/Footer.component'
import Navbar from '../Navbar/Navbar.component'
import styles from './Layout.component.module.css'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

  return (
    <div className={styles.root}>
      <Navbar />

      <div className={styles.wrapper}>
        <main className={styles.main}>
          {children}
        </main>
      </div>

      <Footer />
    </div >
  )
}

export default Layout