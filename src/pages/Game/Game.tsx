import Card from '../../components/card/Card';
import { ALL_CARDS } from '../../constants/cards';
import { classNames, getFractionLogo } from '../../helpers';
import { useGameStore } from '../../store/game/game.store';

import styles from './Game.module.scss';

export const Game = () => {
  const { player, enemy } = useGameStore();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={classNames(styles.userInfo, styles.enemy)}>
          <img
            className={styles.fractionIcon}
            src={getFractionLogo(enemy.fraction)}
          />
          <div className={styles.column}>
            <h1 className={styles.role}>Enemy</h1>
            <p className={styles.points}>{enemy.points} points</p>
          </div>
        </div>
        <div className={classNames(styles.userInfo, styles.player)}>
          <img
            className={styles.fractionIcon}
            src={getFractionLogo(player.fraction)}
          />
          <div className={styles.column}>
            <h1 className={styles.role}>Player</h1>
            <p className={styles.points}>{player.points} points</p>
          </div>
        </div>

        <p>player - {player.fraction}</p>
        <p>enemy - {enemy.fraction}</p>

        <div className={classNames(styles.cards, styles.enemy)}>
          {ALL_CARDS.map((card, id) => (
            <Card key={id} card={card} />
          ))}
        </div>

        <div className={classNames(styles.cards, styles.player)}>
          {ALL_CARDS.map((card, id) => (
            <Card key={id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};
