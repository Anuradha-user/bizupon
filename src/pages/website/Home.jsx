import { useEffect, useState } from "react";
import Preloader from "../../web-components/Preloader";
import HeroSlider from "../../web-components/HeroSlider";
import CarSearchForm from "../../web-components/CarFilterForm";
import TopBrand from "../../web-components/TopBrand";
import WhyUs from "../../web-components/WhyUs";
import HowBuy from "../../web-components/HowBuy";
import TopCategory from "../../web-components/TopCategory";
import ClientFeedback from "../../web-components/ClientFeedback";
import BestQuality from "../../web-components/BestQuality";
import Blogs from "../../web-components/Blogs";

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
      <HeroSlider />
      <CarSearchForm />
      <TopBrand />
      <WhyUs />
      <TopCategory />
      <HowBuy />
      <ClientFeedback />
      <BestQuality />
      <Blogs />
    </>
  );
}

export default Home;
