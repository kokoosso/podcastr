import Image from 'next/image';
import { useContext, useRef, useEffect } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

export function Player() {
  const audioReference = useRef<HTMLAudioElement>(null)
  const { episodeList, currentEpisodeIndex, isPlaying, togglePlay, setPlayingState } = useContext(PlayerContext)
  useEffect(() => {
    if (!audioReference.current) {
      return;
    } if (isPlaying) {
      audioReference.current.play();
    } else {
      audioReference.current.pause();
    }

  }, [isPlaying])
  const episode = episodeList[currentEpisodeIndex];


  return (

    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="tocando agora" />
        <strong>Tocando agora</strong>
      </header>


      { episode ?
        (
          <div className={styles.currentEpisode}>
            <Image
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit='cover'
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ) :
        (
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        )}


      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>

            {episode ?
              (
                <Slider
                  trackStyle={{ backgroundColor: '#04d361' }}
                  railStyle={{ backgroundColor: '#9f75ff' }}
                  handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                />
              ) :
              (<div className={styles.emptySlider} />)}
          </div>
          <span>00:00</span>
        </div>
        {
          episode && (
            <audio
              src={episode.url}
              ref={audioReference}
              autoPlay
            />
          )}

        <div className={styles.buttons}>

          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          >
            {isPlaying ? (<img src="/pause.svg" alt="pausar" />) :
              (<img src="/play.svg" alt="Tocar" />)}
          </button>



          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Proxima" />
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>

        </div>
      </footer>
    </div >
  );
}