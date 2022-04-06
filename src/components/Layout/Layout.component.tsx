import Footer from '../Footer/Footer.component'
import Navbar from '../Navbar/Navbar.component'
import styles from './Layout.component.module.css'

type Props = {}

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.root}>
      <Navbar />

      <div className={styles.wrapper}>
        <main className={styles.main}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout