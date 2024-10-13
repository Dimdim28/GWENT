import { useEffect, useState } from 'react';

import Card from '../../components/card/Card';
import { classNames, getFractionLogo } from '../../helpers';
import { useGameStore } from '../../store/game/game.store';

import styles from './Game.module.scss';

export const Game = () => {
  const {
    player,
    enemy,
    takeCard,
    currentTurn,
    endTurn,
    enemyAttackRandomTargets,
    enemyPlayRandomCards,
  } = useGameStore();
  const [activecard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const takeMultipleCards = (numberOfCards: number) => {
      for (let i = 0; i < numberOfCards; i++) {
        setTimeout(() => {
          takeCard('Player');
          takeCard('Opponent');
        }, i * 600);
      }
    };

    const numberOfCardsToTake = 10;
    takeMultipleCards(numberOfCardsToTake);
  }, [takeCard]);

  useEffect(() => {
    if (currentTurn === 'Opponent') {
      enemyPlayRandomCards();
      enemyAttackRandomTargets();
    }
  }, [currentTurn, enemyPlayRandomCards, enemyAttackRandomTargets]);

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
          {enemy.cards
            .filter((card) => card.status === 'onTable')
            .map((card, id) => (
              <Card
                key={id}
                card={card}
                activeCard={activecard}
                isEnemy
                setActiveCard={setActiveCard}
              />
            ))}
        </div>

        <div className={classNames(styles.cards, styles.player)}>
          {player.cards
            .filter((card) => card.status === 'onTable')
            .map((card, id) => (
              <Card
                key={id}
                card={card}
                activeCard={activecard}
                setActiveCard={setActiveCard}
              />
            ))}
        </div>

        <div className={classNames(styles.unUsedCards, styles.player)}>
          {player.cards
            .filter((card) => card.status === 'inDeck')
            .map((card, id) => (
              <Card key={id} card={card} />
            ))}
        </div>

        <div className={classNames(styles.unUsedCards, styles.enemy)}>
          {enemy.cards
            .filter((card) => card.status === 'inDeck')
            .map((card, id) => (
              <Card key={id} card={card} />
            ))}
        </div>

        <div className={classNames(styles.handCards, styles.player)}>
          {player.cards
            .filter((card) => card.status === 'inHand')
            .map((card, id) => (
              <Card
                key={id}
                card={card}
                cardIndex={id}
                total={
                  player.cards.filter((card) => card.status === 'inHand').length
                }
                isEnemy={false}
              />
            ))}
        </div>

        <div className={classNames(styles.handCards, styles.enemy)}>
          {enemy.cards
            .filter((card) => card.status === 'inHand')
            .map((card, id) => (
              <Card
                key={id}
                card={card}
                cardIndex={id}
                total={
                  enemy.cards.filter((card) => card.status === 'inHand').length
                }
                isEnemy={true}
              />
            ))}
        </div>
      </div>
      <div className={styles.divider}></div>
      <div
        className={classNames(
          styles.shadow,
          styles.enemy,
          currentTurn === 'Opponent' ? styles.active : undefined,
        )}
      ></div>
      <div
        className={classNames(
          styles.shadow,
          styles.player,
          currentTurn === 'Player' ? styles.active : undefined,
        )}
      ></div>

      <div className={styles.moneyWrapper}>
        <b>{player.money}</b> <p>coins</p>
      </div>

      <button
        className={styles.movesButton}
        disabled={currentTurn === 'Opponent'}
        onClick={endTurn}
      >
        {currentTurn === 'Player' ? 'End move' : 'Enemy move'}
      </button>
    </div>
  );
};
