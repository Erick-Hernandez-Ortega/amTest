import Image from "next/image";
import styles from"./main.module.css"
import CardComponent from "../components/card/card";
import { Character } from "../types/character.types";

const Page = async (): Promise<JSX.Element>  => {
  const response: Response = await fetch('http://localhost:4000/characters');
  const characters: Character[] = await response.json();

  console.log(characters);

  return (
    <main className={styles.container}>
      <section className={styles.header}>
        <Image src="/images/harry-potter.svg" alt="Logo" width={193} height={66} />
        <h2 className={styles.textSelectFilter}>Selecciona tu filtro</h2>
      </section>

      <section className={styles.containerBtns}>
        <button type="button" className={styles.btn}>ESTUDIANTES</button>
        <button type="button" className={styles.btn}>STAFF</button>
      </section>

      <section className={styles.containerCards}>
        {characters.map((character) => (
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