import Image from "next/image";
import styles from"./main.module.css"

const Page = (): JSX.Element => {
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
    </main>
  );
};

export default Page;