import Head from "next/head";
import { Dashboard, Historic } from "~/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lumi - Histórico de Faturas</title>
      </Head>
      <Historic />
    </>
  );
}
