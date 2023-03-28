import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en-GB">
      <Head>
        {/* title and viewport on head-content.js*/}
        <meta name="description" content="" />

        {/* Temp, removes error during development */}
        <link rel="icon" href="data:," />

        {/* 32x32 */}
        {/* <link rel="shortcut icon" sizes="any" href="./fav/favicon.ico" /> */}
        {/* <link rel="icon" type="image/svg+xml" href="./fav/favicon.svg" /> */}
        {/* 180×180 */}
        {/* <link rel="apple-touch-icon" href="./fav/apple-touch-icon.png" /> */}

        {/* <!-- Social Sharing --> */}
        {/* <meta property="og:image" content="" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="533" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
