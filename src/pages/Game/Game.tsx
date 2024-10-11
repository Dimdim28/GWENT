// import Card from '../../components/card/Card';

import { useGameStore } from '../../store/game/game.store';

export const Game = () => {
  const { player, enemy } = useGameStore();

  return (
    <div>
      <p>player - {player.fraction}</p>
      <p>enemy - {enemy.fraction}</p>
    </div>
  );
};
