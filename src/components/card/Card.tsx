import { Dispatch, FC, SetStateAction } from 'react';

import { classNames, getFractionIcons } from '../../helpers';
import { useGameStore } from '../../store/game/game.store';
import { GameCard } from '../../types/general';

import styles from './Card.module.scss';

interface CardProps {
  card: GameCard;
  cardIndex?: number;
  total?: number;
  isEnemy?: boolean;
  activeCard?: number | null;
  setActiveCard?: Dispatch<SetStateAction<number | null>>;
}

const getRotationIndex = (index: number, total: number) => {
  const middle = Math.floor(total / 2);
  if (total % 2 === 0) {
    return index < middle ? index - middle : index - middle + 1;
  } else {
    return index === middle
      ? 0
      : index < middle
        ? index - middle
        : index - middle;
  }
};

const getTransformOrigin = (index: number, total: number) => {
  const middle = Math.floor(total / 2);
  if (total % 2 === 0) {
    return index < middle ? 'right bottom' : 'left bottom';
  } else {
    return index === middle
      ? 'center'
      : index < middle
        ? 'right bottom'
        : 'left bottom';
  }
};

const Card: FC<CardProps> = ({
  card,
  cardIndex,
  total,
  isEnemy,
  activeCard,
  setActiveCard,
}) => {
  const { playCard, currentTurn, attackCard } = useGameStore();
  const { points, cost, back } = getFractionIcons(card.fraction);

  const handleOnClick = () => {
    if (isEnemy) {
      switch (card.status) {
        case 'onTable':
          if (activeCard && setActiveCard) {
            attackCard(activeCard, card.id);
            setActiveCard(null);
          }
          break;
        default:
          break;
      }
    } else {
      if (currentTurn === 'Player') {
        switch (card.status) {
          case 'inHand':
            playCard(card.id);
            break;

          case 'onTable':
            if (setActiveCard) {
              setActiveCard(card.id);
            }

            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className={classNames(
        styles.cardContainer,
        isEnemy ? styles.enemyCard : undefined,
        card.status === 'onTable' ? styles.board : undefined,
        card.status === 'inDeck' ? styles.deck : undefined,
        card.status === 'inHand' ? styles.hand : undefined,
        card.status === 'inGrave' ? styles.grave : undefined,
      )}
      style={{
        ...(cardIndex !== undefined && total
          ? {
              transform: `translateX(${getRotationIndex(cardIndex, total) * 50}px)
                          rotate(${getRotationIndex(cardIndex, total) * 6}deg)`,

              ...(isEnemy !== undefined
                ? {
                    transformOrigin: getTransformOrigin(cardIndex, total),
                  }
                : {}),
            }
          : {}),
      }}
    >
      <div className={styles.card}>
        <div className={classNames(styles.side, styles.front)}>
          <div className={styles.character}>
            <img src={card.image} />
          </div>
          <div className={styles.effect}></div>

          <div className={styles.cost}>
            <img className={styles.costBg} src={cost} />
            <p className={styles.costText}>{card.cost}</p>
          </div>

          <div className={styles.power}>
            <div className={styles.powerEffect}></div>
            <img className={styles.powerBg} src={points} />
            <p className={styles.powerText}>{card.value}</p>
          </div>
        </div>
        <div className={classNames(styles.side, styles.back)}>
          <img src={back} className={styles.backBg} />
        </div>
        <div className={classNames(styles.side, styles.right)}></div>
        <div className={classNames(styles.side, styles.left)}></div>
        <div className={classNames(styles.side, styles.top)}></div>
        <div className={classNames(styles.side, styles.bottom)}></div>
      </div>
    </div>
  );
};

export default Card;
