import Image from "next/image";
import styles from "./styles.module.css"
import stylesMain from "../../app/main.module.css";
import React, { useState } from "react";

interface ModalAddProps {
    onClose: () => void;
}

const ModalAddComponent = ({ onClose }): React.ReactElement<ModalAddProps> => {
    const [character, setCharacter] = useState<any>({
        name: '',
        isAlive: true,
        birthDate: '',
        gender: 'female',
        eyesColour: '',
        hairColour: '',
        hogwartsStaff: false,
        hogwartsStudent: true,
        image: '',
        house: ''
    });
    const [errors, setErrors] = useState<any>({});

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setCharacter((prevCharacter: any) => ({
            ...prevCharacter,
            hogwartsStaff: value === 'staff',
            hogwartsStudent: value === 'student'
        }));
    };

    const validate = (): boolean => {
        let tempErrors: any = {};
        if (!character.name) tempErrors.name = "Name is required";
        if (!character.birthDate) tempErrors.birthDate = "Birth date is required";
        if (!character.gender) tempErrors.gender = "Gender is required";
        if (!character.eyesColour) tempErrors.eyesColour = "Eyes colour is required";
        if (!character.hairColour) tempErrors.hairColour = "Hair colour is required";
        if (!character.image) tempErrors.image = "Image is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setCharacter((prevCharacter: any) => ({
            ...prevCharacter,
            gender: value
        }));
    };

    const handleSubmit = () => {
        if (validate()) createNewCharacter();
    };

    const createNewCharacter = async (): Promise<void> => {
        const response: Response = await fetch('http://localhost:4000/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(character),
        });

        if (response.ok) {
            const newCharacter = await response.json();
            console.log('Character added:', newCharacter);
        } else {
            console.error('Failed to add character:', response.statusText);
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.rowHeader}>
                    <h2 className={styles.textAddCharacter}>Agrega un personaje </h2>
                    <Image src="/icons/close-button.svg" alt="close-button-icon" width={34} height={34} onClick={onClose} />
                </div>

                <div className={styles.containerInputs}>
                    <div className={styles.containerInput}>
                        <label htmlFor="name" className={styles.textLabel}>NOMBRE</label>
                        <input className={styles.input} type="text" value={character.name} onChange={(e) => setCharacter({ ...character, name: e.target.value })} />
                        {errors.name && <span className={styles.error}>{errors.name}</span>}
                    </div>
                    <div className={styles.containerInput}>
                        <label htmlFor="date" className={styles.textLabel}>CUMPLEAÑOS</label>
                        <input className={styles.input} type="date" value={character.birthDate} onChange={(e) => setCharacter({ ...character, birthDate: e.target.value })} />
                        {errors.birthDate && <span className={styles.error}>{errors.birthDate}</span>}
                    </div>
                </div>

                <div className={styles.containerInputs}>
                    <div className={styles.containerInput}>
                        <label htmlFor="color-eyes" className={styles.textLabel}>COLOR DE OJOS</label>
                        <input className={styles.input} type="text" value={character.eyesColour} onChange={(e) => setCharacter({ ...character, eyesColour: e.target.value })} />
                        {errors.eyesColour && <span className={styles.error}>{errors.eyesColour}</span>}
                    </div>
                    <div className={styles.containerInput}>
                        <label htmlFor="color-hair" className={styles.textLabel}>COLOR DE PELO</label>
                        <input className={styles.input} type="text" value={character.hairColour} onChange={(e) => setCharacter({ ...character, hairColour: e.target.value })} />
                        {errors.hairColour && <span className={styles.error}>{errors.hairColour}</span>}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p className={styles.textLabel} style={{ marginTop: '20px', marginBottom: '0', flex: '1' }}>GÉNERO</p>
                    <p className={styles.textLabel} style={{ marginTop: '20px', marginBottom: '0', flex: '1' }}>POSICIÓN</p>
                </div>

                <div className={styles.containerInputs}>
                    <div className={styles.containerInputRadio}>
                        <label htmlFor="woman" className={styles.textLabel}>
                            Mujer
                            <input
                                type="radio"
                                id="woman"
                                name="gender"
                                value="female"
                                checked={character.gender === 'female'}
                                onChange={handleGenderChange}
                            />
                        </label>
                        <label htmlFor="male" className={styles.textLabel}>
                            Hombre
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={character.gender === 'male'}
                                onChange={handleGenderChange}
                            />
                        </label>
                    </div>

                    <div className={styles.containerInputRadio}>
                        <label htmlFor="woman" className={styles.textLabel}>
                            Estudiante
                            <input
                                type="radio"
                                id="student"
                                name="role"
                                value="student"
                                checked={character.hogwartsStudent}
                                onChange={handleRoleChange}
                            />
                        </label>
                        <label htmlFor="male" className={styles.textLabel}>
                            Staff
                            <input
                                type="radio"
                                id="staff"
                                name="role"
                                value="staff"
                                checked={character.hogwartsStaff}
                                onChange={handleRoleChange}
                            />
                        </label>
                    </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="input-file" className={styles.textLabel}>FOTOGRAFIA (input type file): </label>
                    <input type="file" value={character.image} onChange={(e) => setCharacter({ ...character, image: e.target.value })} />
                </div>
                {errors.image && <span className={styles.error}>{errors.image}</span>}

                <div className={styles.containerButton}>
                    <button type="button" className={stylesMain.btn} onClick={handleSubmit}>GUARDAR</button>
                </div>
            </div>
        </div>
    );
};

export default ModalAddComponent;