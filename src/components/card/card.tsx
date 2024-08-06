'use client'
import Image from "next/image";
import styles from "./styles.module.css"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";

interface CardProps {
    name: string;
    isAlive: boolean;
    birthDate: string;
    gender: string;
    eyesColour: string;
    hairColour: string;
    isStudent: boolean;
    image: string;
    house?: string;
    id: string;
}

const CardComponent = ({ name, isAlive, birthDate, gender, eyesColour, hairColour, isStudent, image, house, id }): React.ReactElement<CardProps> => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: any) => state.favorites.items);

    const isFavorite = favorites.some(fav => fav.id === id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(removeFavorite(id));
        } else {
            const character: any = { id, name, isAlive, birthDate, gender, eyesColour, hairColour, isStudent, image, house };
            dispatch(addFavorite(character));
        }
    };

    return (
        <article className={isAlive ? styles.card : styles.cardNotAlive}>
            {(house === 'Gryffindor' || house === '') &&
                <div className={styles.containerImageGryffindor}>
                    <Image src={image} className={styles.image} alt="profile" width={165} height={165} />
                </div>
            }
            {house === 'Slytherin' &&
                <div className={styles.containerImageSlytherin}>
                    <Image src={image} className={styles.image} alt="profile" width={165} height={165} />
                </div>
            }
            {house === 'Hufflepuff' &&
                <div className={styles.containerImageHufflepuff}>
                    <Image src={image} className={styles.image} alt="profile" width={165} height={165} />
                </div>
            }
            {house === 'Ravenclaw' &&
                <div className={styles.containerImageRavenclaw}>
                    <Image src={image} className={styles.image} alt="profile" width={165} height={165} />
                </div>
            }

            <div className={styles.containerText}>
                <div className={styles.headerCard}>
                    <p className={styles.textTop}>{isAlive ? "VIVO" : "FINADO"} / {isStudent ? "ESTUDIANTE" : "STAFF"}</p>
                    {isFavorite ?
                        <Image src="/icons/favorite-fill.svg" alt="favorite-icon" width={20} height={22} onClick={handleFavoriteToggle} />
                        :
                        <Image src="/icons/favorite.svg" alt="favorite-icon" width={20} height={22} onClick={handleFavoriteToggle} />
                    }
                </div>
                <h4 className={styles.textName}>{!isAlive ? "+" : null} {name}</h4>
                <div className={styles.row}>
                    <span className={styles.textProperty}>Cumpleaños:</span>
                    <span className={styles.textValue}>{birthDate !== '' ? birthDate : 'N/A'}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.textProperty}>Genero: </span>
                    <span className={styles.textValue}>{gender}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.textProperty}>Color de ojos: </span>
                    <span className={styles.textValue}>{eyesColour !== '' ? eyesColour : 'N/A'}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.textProperty}>Color de pelo: </span>
                    <span className={styles.textValue}>{hairColour}</span>
                </div>
            </div>
        </article>
    );
};

export default CardComponent;