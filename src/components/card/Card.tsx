import { FC } from 'react';

import { classNames, getFractionIcons } from '../../helpers';
import { Card as CardType } from '../../types/general';

import styles from './Card.module.scss';

interface CardProps {
  card: CardType;
}

const Card: FC<CardProps> = ({ card }) => {
  const { points, cost, back } = getFractionIcons(card.fraction);

  return (
    <div className={styles.cardContainer}>
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
