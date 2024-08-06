import Image from "next/image";
import styles from "./styles.module.css"
import React, { useState } from "react";

interface FavoriteProps {

}

const FavoriteComponent = (): React.ReactElement<FavoriteProps> => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={styles.container}>
                <div className={styles.option} onClick={() => setModalIsOpen(!modalIsOpen)}>
                    <p className={styles.text}>Favoritos</p>
                    <Image src="/icons/favorite-saved.svg" alt="favorite-icon" width={20} height={22} />
                </div>
                <div className={styles.option}>
                    <p className={styles.text}>Agregar</p>
                    <Image src="/icons/user-add.svg" alt="user-add-icon" width={20} height={22} />
                </div>
            </div>
            {modalIsOpen &&
                <div className={styles.modal}>
                    Modal
                </div>
            }
        </div>
    );
};

export default FavoriteComponent;