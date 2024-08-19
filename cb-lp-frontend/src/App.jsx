import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BannerSection from './components/BannerSection';
import PricingSection from './components/PricingSection';
import Features from './components/Features';
import Footer from './components/Footer';
import FeaturesCards from './components/FeaturesCards';

function App() {
  const styles = {
    padding: { xs: 1 },
  };
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" disableGutters sx={styles}>
        <HeroSection />
        <BannerSection />
        <Features />
        <PricingSection />
        <FeaturesCards />
      </Container>
      <Footer />
    </>
  );
}

export default App;
