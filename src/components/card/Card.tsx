import styles from './Card.module.scss';

const Card = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={`${styles.side} ${styles.front}`}>
          <div className={styles.character}></div>
          <div className={styles.effect}></div>

          <div className={styles.cost}>
            <p className={styles.costText}>14</p>
          </div>

          <div className={styles.power}>
            <div className={styles.powerEffect}></div>
            <p className={styles.powerText}>4</p>
          </div>
        </div>
        <div className={`${styles.side} ${styles.back}`}></div>
        <div className={`${styles.side} ${styles.right}`}></div>
        <div className={`${styles.side} ${styles.left}`}></div>
        <div className={`${styles.side} ${styles.top}`}></div>
        <div className={`${styles.side} ${styles.bottom}`}></div>
      </div>
    </div>
  );
};

export default Card;
