import { Header } from '../components/Header/index';
import { Player } from '../components/Player/index';

import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { PlayerContext } from '../contexts/PlayerContext';
import { useState } from 'react';


function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
  function playEpisode(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }
  function togglePlay() {
    setIsPlaying(!isPlaying)
  }
  function setPlayingState(state: boolean) {
    setPlayingState(state)
  }
  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, playEpisode, isPlaying, togglePlay, setPlayingState }}>
      <div className={styles.appWrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
