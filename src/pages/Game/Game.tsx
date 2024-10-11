import Card from '../../components/card/Card';
import { ALL_CARDS } from '../../constants/cards';
import { useGameStore } from '../../store/game/game.store';

import styles from './Game.module.scss';

export const Game = () => {
  const { player, enemy } = useGameStore();

  return (
    <div>
      <p>player - {player.fraction}</p>
      <p>enemy - {enemy.fraction}</p>

      <div className={styles.cards}>
        {ALL_CARDS.map((card, id) => (
          <Card key={id} card={card} />
        ))}
      </div>
    </div>
  );
};
