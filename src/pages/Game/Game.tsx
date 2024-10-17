import { useEffect, useRef, useState } from 'react';

import battleTheme1 from '../../assets/audio/battle_theme1.mp3';
import takeCardAudio from '../../assets/audio/take_card.m4a';
import Crown from '../../assets/icons/crown';
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
    winner,
    isGameReady,
    setIsGameReady,
    endTurn,
    enemyAttackRandomTargets,
    enemyPlayRandomCards,
    endGame,
  } = useGameStore();
  const [activecard, setActiveCard] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const takeMultipleCards = (numberOfCards: number) => {
      setIsGameReady(true);
      for (let i = 0; i < numberOfCards; i++) {
        setTimeout(() => {
          const audio = new Audio();
          audio.src = takeCardAudio;
          audio.preload = 'auto';
          audio.play();

          takeCard('Player');
          takeCard('Opponent');
          if (i === numberOfCards - 1) {
            setIsGameReady(false);
          }
        }, i * 600);
      }
    };

    const numberOfCardsToTake = 8;
    takeMultipleCards(numberOfCardsToTake);
  }, [setIsGameReady, takeCard]);

  useEffect(() => {
    const audio = audioRef?.current;
    if (audio) {
      audio.currentTime = 3;
      audio.volume = 0.2;
      audio.play();
    }
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!winner) return;

    const audio = audioRef?.current;
    if (audio) {
      audio.currentTime = 3;
      audio.pause();
    }
  }, [winner]);

  useEffect(() => {
    if (isGameReady) return;
    if (currentTurn === 'Opponent') {
      async function enemyTurn() {
        await enemyPlayRandomCards();
        await enemyAttackRandomTargets();
      }
      enemyTurn();
    }
  }, [
    currentTurn,
    enemyPlayRandomCards,
    enemyAttackRandomTargets,
    isGameReady,
  ]);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={battleTheme1} type="audio/mp3" />
      </audio>
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
                    player.cards.filter((card) => card.status === 'inHand')
                      .length
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
                    enemy.cards.filter((card) => card.status === 'inHand')
                      .length
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

        <div
          className={classNames(
            styles.gameEndedWrapper,
            winner === 'Player' ? styles.won : styles.lost,
            winner ? styles.visible : undefined,
          )}
        >
          <div className={styles.gameEndedContent}>
            <Crown />
            <h2> {winner === 'Enemy' ? 'Defeated!' : 'Victory'}</h2>
            <button onClick={endGame}>Try Again</button>
          </div>
        </div>

        <div
          className={classNames(
            styles.gameStartsWrapper,
            isGameReady ? styles.visible : undefined,
          )}
        >
          <div className={styles.gameStartsContent}>
            <Crown />
            <h2> {currentTurn === 'Opponent' ? 'Enemy move' : 'Your move'}</h2>
          </div>
        </div>
      </div>
    </>
  );
};
