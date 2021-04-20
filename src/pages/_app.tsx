import { Header } from '../components/Header/index';
import { Player } from '../components/Player/index';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';


function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.appWrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>

  )
}

export default MyApp
