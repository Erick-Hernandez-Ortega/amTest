import Head from "next/head"
import styles from "./globals.module.css"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <Head>
                <title>amTest</title>
            </Head>
            <body className={styles.body}>
                {children}
            </body>
        </html>
    )
}