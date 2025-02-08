import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="resume generator" />
      </Head>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          padding: "4rem 1rem",
          fontFamily: "sans-serif",
          color: "#333",
          background: "#f9f9f9",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <section id="hero">
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Placeholder
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <form>
              <input />
              <submit>generate</submit>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
