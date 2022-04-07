import { useSelector } from 'react-redux'
import Footer from '../Footer/Footer.component'
import LoadingScreen from '../Loading/LoadingScreen/LoadingScreen.component'
import Navbar from '../Navbar/Navbar.component'
import styles from './Layout.component.module.css'

type Props = {}

const Layout: React.FC = ({ children }) => {
  const globalLoading = useSelector((state: any) => state.loading.globalLoading)

  return (
    <div className={styles.root}>
      <Navbar />

      {globalLoading ? (
        <LoadingScreen />
      ) : (
        <div className={styles.wrapper}>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      )}

      <Footer />
    </div >
  )
}

export default Layout