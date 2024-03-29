import Head from 'next/head';
import Index from '../components/Index'
import { DAppProvider, ChainId } from "@usedapp/core";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Crypto Income Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <DAppProvider config={{
          supportedChains: [
            ChainId.Mainnet, ChainId.Harmony, ChainId.Fantom
          ]
        }}>
          <Index />
        </DAppProvider>
      </main>
    </div>
  )
}
