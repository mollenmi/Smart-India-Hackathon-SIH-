import styles from "./App.module.css";
import Footer from "../components/RoutePage/Footer/Footer";
import { Hero } from "../components/RoutePage/Hero/Hero";
import { Navbar } from "../components/RoutePage/Navbar/Navbar";
import '@fortawesome/fontawesome-free/css/all.css';


function RootPage() {
  return (
    <div className={styles.App}>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default RootPage;