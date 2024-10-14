import { useRef, useState } from 'react';

import audioFile from '../../assets/audio/main_menu.m4a';
import Crown from '../../assets/icons/crown';
import { FRACTIONS } from '../../constants/fractions';
import { classNames } from '../../helpers';
import { useGameStore } from '../../store/game/game.store';

import styles from './ChooseFraction.module.scss';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ChooseFraction = () => {
  const { startGame, setUserFraction, setEnemyFraction } = useGameStore();
  const [isMusicStarted, setIsMusicStarted] = useState(false);

  const getRandomFraction = () =>
    FRACTIONS[getRandomInt(0, FRACTIONS.length - 1)].name;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={audioFile} type="audio/mp3" />
      </audio>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className={styles.title}>Choose Fraction</h2>
          <div className={styles.cards}>
            {FRACTIONS.map((fraction, id) => (
              <div
                key={id}
                className={styles.card}
                onClick={() => {
                  startGame();
                  setUserFraction(fraction.name);
                  setEnemyFraction(getRandomFraction());
                  const audio = audioRef.current;
                  audio?.pause();
                }}
              >
                <img
                  draggable="false"
                  src={fraction.back}
                  width="340"
                  height="475"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className={classNames(
          styles.gameInitiatedWrapper,
          isMusicStarted ? undefined : styles.visible,
        )}
      >
        <div className={styles.gameInitiatedContent}>
          <Crown />
          <h2> Welcome to Gwent Online!</h2>
          <button
            onClick={() => {
              setIsMusicStarted(true);
              const audio = audioRef.current;
              audio?.play();
            }}
          >
            Start Game
          </button>
        </div>
      </div>
    </>
  );
};
