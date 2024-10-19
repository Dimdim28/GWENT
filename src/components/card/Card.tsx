import { Dispatch, FC, SetStateAction } from 'react';

import {
  classNames,
  getFractionIcons,
  getRandomCardHoverAudio,
} from '../../helpers';
import { useGameStore } from '../../store/game/game.store';
import { GameCard } from '../../types/general';

import styles from './Card.module.scss';

interface CardProps {
  card: GameCard;
  cardIndex: number;
  total: number;
  isEnemy: boolean;
  activeCard?: GameCard | null;
  setActiveCard?: Dispatch<SetStateAction<GameCard | null>>;
}

const getTranslateIndex = (index: number, total: number) => {
  const middle = total / 2;

  if (total % 2 === 0) {
    return index - middle + 0.5;
  } else {
    return index - Math.floor(middle);
  }
};

const getTransformOrigin = (index: number, total: number, isEnemy: boolean) => {
  const middle = Math.floor(total / 2);

  if (total % 2 === 0) {
    if (isEnemy) {
      return index < middle ? 'right bottom' : 'left bottom';
    } else {
      return index < middle ? 'left bottom' : 'right bottom';
    }
  } else {
    if (index === middle) return 'center';

    if (isEnemy) {
      return index < middle ? 'right bottom' : 'left bottom';
    } else {
      return index < middle ? 'left bottom' : 'right bottom';
    }
  }
};

const getCardRotation = (
  index: number,
  total: number,
  status: GameCard['status'],
) => {
  const translationIndex = getTranslateIndex(total - index - 1, total);

  if (status === 'inHand') {
    return { transform: `rotate(${translationIndex * 6}deg)` };
  }
};

const getCardPosition = (
  isEnemy: boolean,
  index: number,
  total: number,
  status: GameCard['status'],
) => {
  const translationIndex = getTranslateIndex(index, total);

  if (status === 'inDeck') {
    if (isEnemy) {
      return {
        top: `calc(var(--vwh) * 0.5)`,
        left: `calc(var(--vwh) * 0.5)`,
      };
    } else {
      return {
        bottom: `calc(var(--vwh) * 0.5)`,
        right: `calc(var(--vwh) * 0.5)`,
      };
    }
  } else if (status === 'inHand') {
    let verticalOffset = 0;

    if (index === 0) {
      verticalOffset = 0.25;
    } else if (index === 1) {
      verticalOffset = 0.08;
    } else if (index === total - 2) {
      verticalOffset = 0.08;
    } else if (index === total - 1) {
      verticalOffset = 0.25;
    }

    if (isEnemy) {
      return {
        top: `calc(${-4 - 4 * verticalOffset} * var(--vwh))`,
        left: `calc(50% - var(--vwh) * 3 + ${translationIndex * 3} * var(--vwh))`,
      };
    } else {
      return {
        bottom: `calc(${-4 - 4 * verticalOffset} * var(--vwh) )`,
        right: `calc(50% - var(--vwh) * 3 + ${translationIndex * 3} * var(--vwh))`,
      };
    }
  } else if (status === 'onTable') {
    if (isEnemy) {
      return {
        top: `calc(50% - var(--vwh) * 9.5)`,
        left: `calc(50% - var(--vwh) * 3 + ${translationIndex * 7} * var(--vwh) )`,
      };
    } else {
      return {
        bottom: `calc(50% - var(--vwh) * 9.5)`,
        right: `calc(50% - var(--vwh) * 3 - ${translationIndex * 7} * var(--vwh) )`,
      };
    }
  } else {
    if (isEnemy) {
      return {
        top: `calc(-9* var(--vwh))`,
        left: `calc(100% + var(--vwh) * 6)`,
      };
    } else {
      return {
        bottom: `calc(-9 * var(--vwh))`,
        right: `calc(100% + var(--vwh) * 6)`,
      };
    }
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Card: FC<CardProps> = ({
  card,
  cardIndex,
  total,
  isEnemy,
  activeCard,
  setActiveCard,
}) => {
  const { playCard, currentTurn, attackCard, setAttackedCard, attackedCard } =
    useGameStore();
  const { points, cost, back } = getFractionIcons(card.fraction);

  const getCardStatusClassName = (status: GameCard['status']) => {
    switch (status) {
      case 'inDeck': {
        return styles.deck;
      }
      case 'inGrave': {
        return styles.grave;
      }

      case 'inHand': {
        return styles.hand;
      }

      case 'onTable': {
        return styles.board;
      }

      default: {
        break;
      }
    }
  };

  const handleOnClick = async () => {
    if (isEnemy) {
      switch (card.status) {
        case 'onTable':
          if (activeCard && setActiveCard) {
            if (activeCard.isCanAttack) {
              setAttackedCard(null);

              await delay(300);

              setAttackedCard({
                isEnemy: true,
                id: card.id,
                decreasedPointsOn: Math.min(card.value, activeCard.value),
              });
            }
            attackCard(activeCard.id, card.id);
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
              setActiveCard(card);
            }

            break;
          default:
            break;
        }
      }
    }
  };

  const onHoverCard = () => {
    const audio = new Audio();
    audio.src = getRandomCardHoverAudio();
    audio.preload = 'auto';
    audio.play();
  };

  return (
    <div
      onMouseEnter={onHoverCard}
      onClick={handleOnClick}
      className={classNames(
        styles.cardContainer,
        isEnemy ? styles.enemyCard : styles.playerCard,
        getCardStatusClassName(card.status),
        card.isCanAttack ? styles.canAttack : undefined,
        activeCard ? styles.activeCardSelected : undefined,
        activeCard?.id === card.id && !isEnemy
          ? styles.isActiveCard
          : undefined,
      )}
      style={{
        ...getCardPosition(isEnemy, cardIndex, total, card.status),
        ...getCardRotation(cardIndex, total, card.status),
        transformOrigin: getTransformOrigin(cardIndex, total, isEnemy),
      }}
    >
      {['onTable', 'inGrave'].includes(card.status) &&
      attackedCard &&
      isEnemy === attackedCard.isEnemy &&
      card.id === attackedCard.id ? (
        <div className={styles.decreasePointsOn}>
          -{attackedCard.decreasedPointsOn}
        </div>
      ) : null}

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
