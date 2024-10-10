import styles from "./ChooseFraction.module.scss";

import cardElf from "../../assets/cards-back/elfs.png";
import cardMonster from "../../assets/cards-back/monsters.png";
import cardNilfgaard from "../../assets/cards-back/nilfgaard.png";
import cardSkellige from "../../assets/cards-back/skelige.png";
import cardNorth from "../../assets/cards-back/north.png";



export const ChooseFraction = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h2 className={styles.title}>Choose Fraction</h2>
                <div className={styles.cards}>
                    {
                        [cardElf,
                            cardMonster,
                            cardSkellige,
                            cardNilfgaard,
                            cardNorth].map((el, id) =>
                                <div key={id} className={styles.card} ><img draggable='false' src={el} width="340" height="475" /></div>)
                    }
                </div>
            </div>
        </div>
    )
}

