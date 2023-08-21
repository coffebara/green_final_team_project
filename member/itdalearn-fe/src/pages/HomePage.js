import Banner1 from "../components/home/Banner1";
import Banner3 from "../components/home/Banner3";
import Banner2 from "../components/home/Banner2";
import Nav from "../common/Nav";
import Footer from "../common/Footer";
import "../styles/Banner.css";

export default function HomePage() {
  //여기서부터

  return (
    <>
      <Nav />
      <Banner1 />
      <Banner2 />
      <Banner3 />
      <Footer />
    </>
  );
}
