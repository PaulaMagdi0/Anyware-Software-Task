import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

interface Props {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}

const HomePage = ({ mode, setMode }: Props) => {
  return (
    <>
      <Navbar mode={mode} setMode={setMode} />
      <Hero />
      <Footer />
    </>
  );
};

export default HomePage;
