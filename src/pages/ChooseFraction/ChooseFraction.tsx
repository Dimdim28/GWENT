import { FRACTIONS } from '../../constants/fractions';
import { getRandomBackground } from '../../helpers';
import { useGameStore } from '../../store/game/game.store';

import styles from './ChooseFraction.module.scss';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ChooseFraction = () => {
  const { startGame, setUserFraction, setEnemyFraction } = useGameStore();

  const getRandomFraction = () =>
    FRACTIONS[getRandomInt(0, FRACTIONS.length - 1)].name;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.bgImage}
        style={{
          backgroundImage: `url(${getRandomBackground()})`,
        }}
      ></div>
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
  );
};
