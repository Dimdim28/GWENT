import { FC } from 'react';

import { classNames, getFractionIcons } from '../../helpers';
import { GameCard } from '../../types/general';

import styles from './Card.module.scss';

interface CardProps {
  card: GameCard;
  cardIndex?: number;
  total?: number;
  isEnemy?: boolean;
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
    return index < middle ? 'left bottom' : 'right bottom';
  } else {
    return index === middle
      ? 'center'
      : index < middle
        ? 'left bottom'
        : 'right bottom';
  }
};

const Card: FC<CardProps> = ({ card, cardIndex, total, isEnemy }) => {
  const { points, cost, back } = getFractionIcons(card.fraction);

  return (
    <div
      className={classNames(
        styles.cardContainer,
        card.status === 'onTable' ? styles.board : '',
        card.status === 'inDeck' ? styles.deck : '',
        card.status === 'inHand' ? styles.hand : '',
        card.status === 'inGrave' ? styles.grave : '',
      )}
      style={{
        ...(cardIndex !== undefined && total
          ? {
              transform: `translateX(${getRotationIndex(cardIndex, total) * 40}px)
                          rotate(${getRotationIndex(cardIndex, total) * 5}deg)`,
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
