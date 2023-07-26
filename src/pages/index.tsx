import Head from "next/head";
import { Dashboard } from "~/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lumi - Dashboard</title>
      </Head>
      <Dashboard />
    </>
  );
}
