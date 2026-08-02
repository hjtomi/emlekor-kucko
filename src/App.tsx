import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Pricing />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
