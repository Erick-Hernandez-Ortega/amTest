'use client'
import Head from "next/head"
import styles from "./globals.module.css"
import { Provider } from "react-redux"
import store from '../store/store';

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
                <Provider store={store}>
                    {children}
                </Provider>
            </body>
        </html>
    )
}