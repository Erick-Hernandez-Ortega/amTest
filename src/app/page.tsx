'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./main.module.css";
import CardComponent from "../components/card/card";
import { Character } from "../types/character.types";

const Page = (): JSX.Element => {
  const [charactersOriginal, setCharactersOriginal] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [activeFilter, setActiveFilter] = useState<'students' | 'staff' | null>(null);

  const fetchCharacters = async () => {
    const response: Response = await fetch('http://localhost:4000/characters');
    const characters: Character[] = await response.json();
    setCharactersOriginal(characters);
    setFilteredCharacters(characters);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const filterCharacters = (areStudents: boolean) => {
    const filtered = areStudents
      ? charactersOriginal.filter(character => character.hogwartsStudent)
      : charactersOriginal.filter(character => character.hogwartsStaff);

    setFilteredCharacters(filtered);
    setActiveFilter(areStudents ? 'students' : 'staff');
  };

  return (
    <main className={styles.container}>
      <section className={styles.header}>
        <Image src="/images/harry-potter.svg" alt="Logo" width={193} height={66} />
        <h2 className={styles.textSelectFilter}>Selecciona tu filtro</h2>
      </section>

      <section className={styles.containerBtns}>
        <button type="button"  className={`${styles.btn} ${activeFilter === 'students' ? styles.btnActive : ''}`} onClick={() => filterCharacters(true)}>ESTUDIANTES</button>
        <button type="button" className={`${styles.btn} ${activeFilter === 'staff' ? styles.btnActive : ''}`}  onClick={() => filterCharacters(false)}>STAFF</button>
      </section>

      <section className={styles.containerCards}>
        {filteredCharacters.map((character) => (
          <CardComponent
            key={character.id}
            name={character.name}
            isAlive={character.alive}
            birthDate={character.dateOfBirth}
            gender={character.gender}
            eyesColour={character.eyeColour}
            hairColour={character.hairColour}
            isStudent={character.hogwartsStudent}
            image={character.image}
            house={character.house}
          />
        ))}
      </section>
    </main>
  );
};

export default Page;
