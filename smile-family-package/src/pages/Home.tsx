import { Hero } from '@/components/sections/Hero';
import { WhySmileFamily } from '@/components/sections/WhySmileFamily';
import { Treatments } from '@/components/sections/Treatments';
import { Stats } from '@/components/sections/Stats';
import { Partners } from '@/components/sections/Partners';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import { CallToAction } from '@/components/sections/CallToAction';
import { Contacts } from '@/components/sections/Contacts';

interface HomeProps {
  onBook: () => void;
}

/** Página inicial: composição de todas as secções do site institucional. */
export function Home({ onBook }: HomeProps) {
  return (
    <>
      <Hero onBook={onBook} />
      <WhySmileFamily />
      <Treatments onBook={onBook} />
      <Stats />
      <Partners />
      <Gallery />
      <Testimonials />
      <CallToAction onBook={onBook} />
      <Contacts />
    </>
  );
}
