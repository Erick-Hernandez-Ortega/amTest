import Image from "next/image";
import styles from "./styles.module.css"
import React, { useState } from "react";
import { Character } from "../../types/character.types";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../../store/favoritesSlice";
import ModalAddComponent from "../modal-add/modal-add";


interface FavoriteProps {

}

const FavoriteComponent = (): React.ReactElement<FavoriteProps> => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [modalAddIsOpen, setModalAddIsOpen] = useState<boolean>(false);
    const favorites: Character[] = useSelector((state: any) => state.favorites.items);
    const dispatch = useDispatch();

    const handleFavoriteRemove = (id: string) => {
        dispatch(removeFavorite(id));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={styles.container}>
                <div className={styles.option} onClick={() => setModalIsOpen(!modalIsOpen)}>
                    <p className={styles.text}>Favoritos</p>
                    <Image src="/icons/favorite-saved.svg" alt="favorite-icon" width={20} height={22} />
                </div>
                <div className={styles.option} onClick={() => setModalAddIsOpen(!modalAddIsOpen)}>
                    <p className={styles.text}>Agregar</p>
                    <Image src="/icons/user-add.svg" alt="user-add-icon" width={20} height={22} />
                </div>
            </div>
            {(modalIsOpen && favorites.length > 0) &&
                <div className={styles.modal}>
                    {favorites.map((favorite: Character) => (
                        <div key={favorite.id} className={styles.favorite}>
                            <Image src={favorite.image} className={styles.image} alt="profile" width={34} height={34} />
                            <p>{favorite.name}</p>
                            <Image src='/icons/trash.svg' onClick={() => handleFavoriteRemove(favorite.id)} style={{ marginLeft: 'auto' }} alt="delete" width={24} height={24} />
                        </div>
                    ))}
                </div>
            }
            {modalAddIsOpen && <ModalAddComponent onClose={() => setModalAddIsOpen(!modalAddIsOpen)} />}
        </div>
    );
};

export default FavoriteComponent;