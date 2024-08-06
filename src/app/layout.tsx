import Head from "next/head"

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
            <body>{children}</body>
        </html>
    )
}