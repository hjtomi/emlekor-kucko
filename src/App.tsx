import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Trust from './components/Trust';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Pricing />
        <Trust />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
