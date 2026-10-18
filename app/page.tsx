import { About } from '@/components/About';
import { Catalog } from '@/components/Catalog';
import { Delivery } from '@/components/Delivery';
import { Footer } from '@/components/Footer';
import { Freshness } from '@/components/Freshness';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { OrderSection } from '@/components/OrderSection';
import { Subscription } from '@/components/Subscription';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Freshness />
        <Catalog />
        <Subscription />
        <Delivery />
        <About />
        <OrderSection />
      </main>
      <Footer />
    </>
  );
}
