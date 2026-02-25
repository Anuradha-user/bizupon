import { useEffect, useState } from "react";
import Header from "../web-components/Header";
import Preloader from "../web-components/Preloader";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // loader time (ms)

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <>
      <Header />
    </>
  );
}

export default Home;
