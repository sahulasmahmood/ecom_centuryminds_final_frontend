import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PopularProducts from '@/components/PopularProducts';
import DealsSection from '@/components/DealsSection';
import MidBannerCategory from '@/components/MidBannerCategory';
import TrendingProducts from '@/components/TrendingProducts';
import Footer01 from '@/components/Footer01';
import Footer02 from '@/components/Footer02';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <PopularProducts />
      <DealsSection />
      <MidBannerCategory />
      <TrendingProducts />
      <Footer01 />
      <Footer02 />
    </div>
  );
}
