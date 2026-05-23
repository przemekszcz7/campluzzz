import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Waves, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Info,
  Menu,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  photos, 
  reviews, 
  amenities, 
  faqs, 
  pricingConfig,
  PhotoItem,
  FaqItem
} from './data';

export default function App() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'camp' | 'tawerna' | 'chill'>('all');
  
  // Gallery Lightbox state
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Camping calculator values
  const [nights, setNights] = useState(2);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [accommodation, setAccommodation] = useState<'tentSmall' | 'tentLarge' | 'camper' | 'caravan'>('tentSmall');
  const [cars, setCars] = useState(1);
  const [electricity, setElectricity] = useState(false);
  const [dogs, setDogs] = useState(0);

  // Filtered photos based on active tab
  const filteredPhotos = useMemo(() => {
    if (activeTab === 'all') return photos;
    return photos.filter(item => item.category === activeTab);
  }, [activeTab]);

  // Live total price calc
  const totalEstimation = useMemo(() => {
    const adultsCost = adults * pricingConfig.personAdult.pricePln;
    const childrenCost = children * pricingConfig.personChild.pricePln;
    
    let accomCost = 0;
    if (accommodation === 'tentSmall') accomCost = pricingConfig.tentSmall.pricePln;
    else if (accommodation === 'tentLarge') accomCost = pricingConfig.tentLarge.pricePln;
    else if (accommodation === 'camper') accomCost = pricingConfig.camper.pricePln;
    else if (accommodation === 'caravan') accomCost = pricingConfig.caravan.pricePln;

    const carsCost = cars * pricingConfig.car.pricePln;
    const elecCost = electricity ? pricingConfig.electricity.pricePln : 0;
    const dogsCost = dogs * pricingConfig.dog.pricePln;

    const nightPrice = adultsCost + childrenCost + accomCost + carsCost + elecCost + dogsCost;
    return nightPrice * nights;
  }, [nights, adults, children, accommodation, cars, electricity, dogs]);

  const handleInquiryAutoFill = () => {
    const accomWords = {
      tentSmall: 'Mały namiot',
      tentLarge: 'Duży namiot',
      camper: 'Camper',
      caravan: 'Przyczepa'
    };
    const generatedSubject = encodeURIComponent('Zapytanie o rezerwację pola namiotowego Campluzzz');
    const generatedBody = encodeURIComponent(
      `Dzień dobry,\n\nchciał(a)bym zapytać o dostępność terminu.\n\nWycena na podstawie kalkulatora:\n` +
      `- Długość pobytu: ${nights} nocy\n` +
      `- Osoby: ${adults} dorosłe, ${children} dzieci\n` +
      `- Sposób nocowania: ${accomWords[accommodation]}\n` +
      `- Pojazdy (samochody): ${cars}\n` +
      `- Psy: ${dogs}\n` +
      `- Dedykowane przyłącze prądu: ${electricity ? 'Tak' : 'Nie'}\n` +
      `- Szacunkowy koszt: ${totalEstimation} PLN\n\n` +
      `Sugerowany termin pobytu (od - do): \n\nPozdrawiam,`
    );
    window.location.href = `mailto:czulmartyna@gmail.com?subject=${generatedSubject}&body=${generatedBody}`;
  };

  return (
    <div className="bg-light text-dark font-sans antialiased selection:bg-accent selection:text-white">
      
      {/* HEADER / NAVIGATION BAR */}
      <nav className="border-b border-warm sticky top-0 bg-light/90 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
          
          <a href="#" className="flex flex-col group">
            <span className="font-display font-bold text-xl tracking-tight leading-none text-dark">
              Campluzzz <span className="font-light italic text-dark/75">Tawerna</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dark/60 mt-1">
              Zarzecze • Jezioro Żywieckie
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            <a href="#pole" className="text-sm font-medium hover:text-dark/60 transition-colors">O nas</a>
            <a href="#atrakcje" className="text-sm font-medium hover:text-dark/60 transition-colors">Wyposażenie</a>
            <a href="#menu" className="text-sm font-medium hover:text-dark/60 transition-colors">Tawerna</a>
            <a href="#galeria" className="text-sm font-medium hover:text-dark/60 transition-colors">Galeria</a>
            <a href="#ceny" className="text-sm font-medium hover:text-dark/60 transition-colors">Cennik</a>
            <a href="#opinie" className="text-sm font-medium hover:text-dark/60 transition-colors">Opinie</a>
            <a href="#kontakt" className="text-sm font-medium hover:text-dark/60 transition-colors">Kontakt</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+48501009722" className="text-sm font-mono font-medium hover:underline">
              501 009 722
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            id="menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-dark focus:outline-none"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-light border-b border-warm px-6 py-8 space-y-4">
            <a href="#pole" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-display font-medium">O nas</a>
            <a href="#atrakcje" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-display font-medium">Wyposażenie</a>
            <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-display font-medium">Tawerna i Kuchnia</a>
            <a href="#galeria" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-display font-medium">Galeria zdjęć</a>
            <a href="#ceny" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-display font-medium">Kalkulator pobytu</a>
            <a href="#opinie" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-display font-medium">Opinie z Facebooka</a>
            <a href="#kontakt" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-display font-medium">Kontakt i Dojazd</a>
            <div className="pt-6 border-t border-warm space-y-4">
              <a href="tel:+48501009722" className="block text-sm font-mono">
                Zadzwoń: 501 009 722
              </a>
              <a href="mailto:czulmartyna@gmail.com" className="block text-sm text-dark/70">
                czulmartyna@gmail.com
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION - FULL WIDTH DARK ASYMMETRICAL */}
      <header className="bg-dark text-light min-h-[85vh] flex flex-col justify-between py-12 md:py-20 relative overflow-hidden">
        
        {/* Editorial visual subtle background texture */}
        <div className="absolute right-0 bottom-0 w-full md:w-[48%] h-full opacity-20 md:opacity-90 transition-opacity">
          <img 
            src="https://i.ibb.co/Y4dJgS4k/486672606-1178516674282079-675605599474580592-n.jpg"
            alt="Zachód słońca nad polem namiotowym Zarzecze"
            className="w-full h-full object-cover object-[65%_center] md:object-center select-none"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-6xl mx-auto w-full px-6 lg:px-12 z-10 flex-1 flex flex-col justify-end">
          <div className="max-w-2xl text-left space-y-8">
            
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-light/60">
              Pole Campingowe i Kultowa Tawerna
            </div>

            <h1 className="font-display font-light italic text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
              Lato, woda <br />
              oraz <span className="font-bold not-italic text-light">czysty luzz.</span>
            </h1>

            <p className="text-base md:text-lg text-light/80 leading-relaxed max-w-lg font-light">
              Wyjątkowe, zaciszne miejsce spotkań bezpośrednio nad brzegiem Jeziora Żywieckiego. Poczuj autentyczny, letni klimat i radosną atmosferę stworzoną z pasji do natury.
            </p>

            <div className="pt-4 flex flex-wrap gap-6 items-center">
              <a 
                href="#ceny" 
                className="bg-light text-dark border border-transparent font-medium text-sm px-8 py-4 hover:bg-warm transition-colors"
              >
                Zaplanuj i wylicz pobyt
              </a>
              <a 
                href="#pole" 
                className="text-sm font-medium hover:text-light/70 border-b border-light/35 hover:border-light pb-1 transition-all"
              >
                Poznaj naszą historię →
              </a>
            </div>

          </div>
        </div>

        {/* Social shortcuts floating above the edge */}
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-12 mt-12 z-10">
          <div className="border-t border-light/10 pt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-light/40">
              Bądźcie na bieżąco:
            </div>
            <div className="flex gap-6 text-xs font-medium">
              <a 
                href="https://www.instagram.com/campluzzztawerna/?hl=pl&fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExZHRFUUZ5UkJOeUNvNDF6WHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR6s4MW9I4hkodPCni5KmDH1tzWKQpx6YkK2XEh5Dedu0mNINEx02wX0YIeFLA_aem_GfO-2A1H6X5xo8qwjdqtbg" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent transition-colors"
                id="link-instagram"
              >
                Instagram
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100063712715318" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent transition-colors"
                id="link-facebook"
              >
                Facebook
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100063712715318&sk=reviews" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-accent transition-colors"
                id="link-reviews"
              >
                Opinie FB
              </a>
            </div>
          </div>
        </div>

      </header>

      {/* STATE STATEMENT SECTION - SINGLE ACCENT LINE (GOLD RULE ONLY HERE!) */}
      <section className="py-24 md:py-32 bg-light border-b border-warm overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          
          {/* GOLD RULE ACCENT - The one rare, strictly single accent color element on the whole page */}
          <div className="w-16 h-[3px] bg-accent mx-auto opacity-90 mb-12" id="sole-brand-accent-line"></div>

          <h2 className="font-display font-light italic text-2xl md:text-4xl text-dark leading-relaxed max-w-3xl mx-auto">
            &ldquo;Ten rodzinny biznes narodził się z pasji do gastronomii, tworzenia nietuzinkowych wspomnień oraz wspólnie spędzonego czasu na świeżym powietrzu.&rdquo;
          </h2>

          <div className="font-mono text-xs uppercase tracking-[0.2em] text-dark/50">
            — Nasz fundament
          </div>

        </div>
      </section>

      {/* ABOUT SECTION - ASYMMETRICAL COLUMN DESIGNS */}
      <section id="pole" className="py-24 md:py-36 bg-light overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* 55% Text left col */}
            <div className="lg:col-span-7 space-y-10">
              
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-dark/60 block">
                  Nasza tożsamość
                </span>
                <h3 className="font-display font-medium text-4xl md:text-5xl leading-tight">
                  Witaj w Campluzzz. <br />
                  <span className="font-light italic">Prowadzą nas mama i córka.</span>
                </h3>
              </div>

              <div className="space-y-6 text-dark/85 font-light text-base md:text-lg leading-relaxed">
                <p>
                  Razem tworzymy zgrany zespół, który nie tylko dzieli się swoją pasją, ale także inspiruje innych do przeżywania niezapomnianych chwil na campingu. Nasz biznes zrodził się z głębokiej miłości do gościnności, jeziora i uśmiechniętych ludzi.
                </p>
                <p>
                  Campluzzz to wyjątkowe miejsce spotkań, które łączy w sobie wszystko, co najlepsze – wspólnie spędzony rodzinny czas, relaks z przyjaciółmi oraz chwilę wytchnienia od codziennych obowiązków. To przestrzeń, gdzie można się zrelaksować, odpocząć w klimatycznej atmosferze chilloutu, a przy tym rozkoszować się pysznym jedzeniem i niepowtarzalnym widokiem na góry.
                </p>
              </div>

              {/* Minimal bullet list with numbers - NO grid of icons / No cards */}
              <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-warm">
                <div>
                  <div className="font-mono text-xs text-dark/60 mb-1">01 / DLA RODZIN</div>
                  <h4 className="font-display font-bold text-base mb-2">Bezpieczna enklawa relaksu</h4>
                  <p className="text-sm text-dark/70 leading-relaxed font-light">
                    Miejsce na odpoczynek w przyjacielskim gronie nad brzegiem Jeziora Żywieckiego przy ul. Żeglarskiej 1 w Zarzeczu.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-xs text-dark/60 mb-1">02 / ZWIERZĘTA MILE WIDZIANE</div>
                  <h4 className="font-display font-bold text-base mb-2">Pies też ma wakacje</h4>
                  <p className="text-sm text-dark/70 leading-relaxed font-light">
                    W pełni zgadzamy się na pobyt czworonogów. Duża, zielona przestrzeń sprzyja spacerom.
                  </p>
                </div>
              </div>

            </div>

            {/* 45% Empty Space / Image container right col */}
            <div className="lg:col-span-span-5 lg:col-start-9 space-y-12">
              <div className="aspect-[3/4] bg-warm overflow-hidden grayscale contrast-110 hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://i.ibb.co/0RQDnRkb/116432785-109858707490037-9053045796288312579-n.jpg"
                  alt="Uśmiechnięte chwile na pomoście"
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-dark/60 font-mono tracking-wide leading-relaxed">
                * Zarzecze to malownicza wieś z piękną linią brzegową. Na wyciągnięcie ręki czekają u nas spacery przy zachodzie oraz bliskość natury.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* AMENITIES DESIGN SECTION - TYPOGRAPHIC LIST / NO CARD BOXES */}
      <section id="atrakcje" className="py-24 md:py-36 bg-warm">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-2xl mb-20 space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-dark/60 block">
              Infrastruktura
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl">
              Wszystko, czego potrzebujesz na campingu. <br />
              <span className="font-light italic">Bez zbędnego nadmiaru.</span>
            </h2>
          </div>

          {/* Clean lines-separated layout list - NO box containers, NO shadows */}
          <div className="divide-y divide-dark/10 border-t border-b border-dark/10">
            {amenities.map((item, index) => (
              <div key={item.id} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                <div className="md:col-span-1 font-mono text-xs text-dark/40">
                  /{String(index + 1).padStart(2, '0')}
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-display font-medium text-lg text-dark">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-dark/40 mt-1 block">
                    {item.section === 'camp' ? 'Pole campingowe' : item.section === 'tawerna' ? 'Sfera kulinarna' : 'Atmosfera i chillout'}
                  </span>
                </div>

                <div className="md:col-span-7">
                  <p className="text-dark/80 text-sm md:text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOD & THE TAWERNA SECTION - REBUILD AS A TYPOGRAPHIC LIST & TEXT GRID */}
      <section id="menu" className="py-24 md:py-36 bg-light overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side: Authentic details */}
            <div className="lg:col-span-5 space-y-8">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-dark/60 block">
                Z miłości do kuchni
              </span>
              <h2 className="font-display font-medium text-4xl md:text-5xl leading-tight">
                Tawerna z <br /><span className="font-light italic">tradycją i smakiem.</span>
              </h2>
              <p className="text-dark/80 font-light text-base md:text-lg leading-relaxed">
                Naszą specjalnością jest wyjątkowa, pyszna rybka przygotowywana według wyselekcjonowanej receptury. Posiłek na świeżym powietrzu, z widokiem na mieniącą się taflę jeziora i korony drzew, nabiera zupełnie nowego wymiaru.
              </p>
              
              <div className="border-t border-warm pt-8 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-2">Nasze menu letnie</h4>
                  <ul className="space-y-4 font-light text-sm text-dark/80">
                    <li className="flex justify-between items-baseline gap-4 border-b border-warm pb-2">
                      <span>Świeży pstrąg smażony na złoto z ziołami</span>
                      <span className="font-mono font-medium whitespace-nowrap text-right">wg wagi</span>
                    </li>
                    <li className="flex justify-between items-baseline gap-4 border-b border-warm pb-2">
                      <span>Tradycyjny chrupiący sandacz z frytkami i zestawem surówek</span>
                      <span className="font-mono font-medium whitespace-nowrap text-right">Cena na miejscu</span>
                    </li>
                    <li className="flex justify-between items-baseline gap-4 border-b border-warm pb-2">
                      <span>Orzeźwiające kolorowe koktajle i desery słodkie</span>
                      <span className="font-mono font-medium whitespace-nowrap text-right">od 18 PLN</span>
                    </li>
                    <li className="flex justify-between items-baseline gap-4 pb-2">
                      <span>Naleśniki z jagodami z okolicznych lasów</span>
                      <span className="font-mono font-medium whitespace-nowrap text-right">24 PLN</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Right side: Dual large photography showcasing real assets */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-6">
                <div className="aspect-[4/5] bg-warm overflow-hidden">
                  <img 
                    src="https://i.ibb.co/DPj2YJ3N/490497952-1196697322464014-4240192653679967540-n.jpg"
                    alt="Chrupiąca świeża rybka"
                    className="w-full h-full object-cover select-none filter hover:brightness-105 transition-all duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="aspect-square bg-warm overflow-hidden">
                  <img 
                    src="https://i.ibb.co/HTBSy66Q/490540640-1196697592463987-4612412222347235568-n.jpg"
                    alt="Koktajle i desery lodowe"
                    className="w-full h-full object-cover select-none filter hover:brightness-105 transition-all duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-0 sm:pt-12">
                <div className="aspect-square bg-warm overflow-hidden">
                  <img 
                    src="https://i.ibb.co/k2Vp2bMv/469523818-1088482783285469-1861038172125315290-n.jpg"
                    alt="Wieczorna atmosfera tawerny"
                    className="w-full h-full object-cover select-none filter hover:brightness-105 transition-all duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="aspect-[4/5] bg-warm overflow-hidden">
                  <img 
                    src="https://i.ibb.co/TDwkTHZQ/117035685-109799497495958-97771989685140707-n.jpg"
                    alt="Klimatyczna wiejska kuchnia i relaks"
                    className="w-full h-full object-cover select-none filter hover:brightness-105 transition-all duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FILTERABLE GALLERY SHOWCASE - INTENTIONAL BREATHING LAYOUT */}
      <section id="galeria" className="py-24 md:py-36 bg-warm">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-dark/60 block">
                Zapisane na kliszy
              </span>
              <h2 className="font-display font-medium text-4xl md:text-5xl">
                Autentyczne kadry. <br />
                <span className="font-light italic">Nasza oaza relaksu.</span>
              </h2>
            </div>
          </div>

          {/* Simple clean borderless layout for the images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {photos.map((photo, globalIndex) => {
                return (
                  <motion.div
                     layout
                    key={photo.url}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedImageIndex(globalIndex)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-light">
                      <img 
                        src={photo.url} 
                        alt={photo.title}
                        className="w-full h-full object-cover select-none filter saturate-90 group-hover:saturate-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/98 backdrop-blur-md z-50 flex flex-col justify-between p-6 md:p-12 text-light"
          >
            <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-light/40 block">
                  Galeria Campluzzz
                </span>
                <h4 className="font-display text-lg md:text-xl font-light italic mt-1 text-white">
                  {photos[selectedImageIndex].title}
                </h4>
              </div>
              <button 
                onClick={() => setSelectedImageIndex(null)}
                className="p-2 hover:text-accent transition-colors"
                aria-label="Zamknij"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-between gap-6 max-h-[70vh] my-8 max-w-6xl mx-auto w-full">
              <button 
                onClick={() => setSelectedImageIndex(prev => (prev === 0 ? photos.length - 1 : prev! - 1))}
                className="p-3 text-white/50 hover:text-white transition-colors"
                aria-label="Poprzednie"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <div className="flex-1 flex justify-center items-center max-h-[60vh]">
                <img 
                  src={photos[selectedImageIndex].url}
                  alt={photos[selectedImageIndex].title}
                  className="max-h-[60vh] max-w-full object-contain filter brightness-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <button 
                onClick={() => setSelectedImageIndex(prev => (prev === photos.length - 1 ? 0 : prev! + 1))}
                className="p-3 text-white/50 hover:text-white transition-colors"
                aria-label="Następne"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <div className="w-full max-w-3xl mx-auto text-center font-light text-sm text-light/80 pb-6">
              <p>{photos[selectedImageIndex].description}</p>
              <div className="mt-4 flex gap-6 justify-center md:hidden">
                <button 
                  onClick={() => setSelectedImageIndex(prev => (prev === 0 ? photos.length - 1 : prev! - 1))}
                  className="text-xs font-mono tracking-widest uppercase py-2 px-4 border border-white/10"
                >
                  Poprzednie
                </button>
                <button 
                  onClick={() => setSelectedImageIndex(prev => (prev === photos.length - 1 ? 0 : prev! + 1))}
                  className="text-xs font-mono tracking-widest uppercase py-2 px-4 border border-white/10"
                >
                  Następne
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* CALCULATOR & LIVE PRICING TABLE - NO CARD CONTAINER */}
      <section id="ceny" className="py-24 md:py-36 bg-light overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Col - Briefing and Pricing reference */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-dark/60 block">
                  Szczere planowanie
                </span>
                <h2 className="font-display font-medium text-4xl leading-tight">
                  Przejrzysty <br />
                  <span className="font-light italic">nasz cennik.</span>
                </h2>
              </div>

              <p className="text-dark/80 font-light text-sm md:text-base leading-relaxed">
                Wybierz parametry planowanego pobytu po prawej stronie. Kalkulator na bieżąco przedstawi Ci szacunkowy koszt dób na polu campingowym w Zarzeczu. Bez ukrytych opłat i niespodzianek na miejscu.
              </p>

              {/* Little helpful info notice block */}
              <div className="bg-warm p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-dark flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-dark/75 leading-relaxed space-y-1">
                    <p className="font-bold uppercase text-dark">INFORMACJA EXTRA:</p>
                    <p>Założycielki zawsze służą pomocą pod numerem telefonu. Jeśli planujesz dłuższy pobyt lub imprezę rodzinną skontaktuj się bezpośrednio.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Col - Live Interactive Calculator form */}
            <div className="lg:col-span-8 space-y-12">
              
              <div className="border-b border-warm pb-8">
                <h3 className="font-display font-medium text-xl mb-8">Kreator i wyliczenie kosztów</h3>
                
                {/* Inputs stacked clean list without cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                  
                  {/* Nights choice */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-dark/60">
                      Liczba nocy pobytu: {nights}
                    </label>
                    <input 
                      type="range" 
                      min="1" 
                      max="21"
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="w-full accent-dark bg-warm h-1"
                    />
                  </div>

                  {/* Adults count */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-dark/60">
                      Osoby dorosłe: {adults}
                    </label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                        className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center font-mono hover:bg-warm transition-all"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm">{adults}</span>
                      <button 
                        onClick={() => setAdults(prev => prev + 1)}
                        className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center font-mono hover:bg-warm transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children count */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-dark/60">
                      Dzieci (do lat 12): {children}
                    </label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                        className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center font-mono hover:bg-warm transition-all"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm">{children}</span>
                      <button 
                        onClick={() => setChildren(prev => prev + 1)}
                        className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center font-mono hover:bg-warm transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Accommodation type selection */}
                  <div className="space-y-3">
                    <label className="block font-mono text-xs uppercase tracking-wider text-dark/60">
                      Sposób nocowania:
                    </label>
                    <select 
                      value={accommodation}
                      onChange={(e: any) => setAccommodation(e.target.value)}
                      className="bg-warm text-dark py-3 px-4 font-normal text-sm w-full focus:outline-none focus:ring-1 focus:ring-dark"
                    >
                      <option value="tentSmall">Namiot Mały (1-2 osobowy) — {pricingConfig.tentSmall.pricePln}zł/dobę</option>
                      <option value="tentLarge">Namiot Duży (3+ osobowy) — {pricingConfig.tentLarge.pricePln}zł/dobę</option>
                      <option value="camper">Camper / Autodom — {pricingConfig.camper.pricePln}zł/dobę</option>
                      <option value="caravan">Przyczepa campingowa — {pricingConfig.caravan.pricePln}zł/dobę</option>
                    </select>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-dark/60">
                      Samochody osobowe: {cars}
                    </label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setCars(prev => Math.max(0, prev - 1))}
                        className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center font-mono hover:bg-warm transition-all"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm">{cars}</span>
                      <button 
                        onClick={() => setCars(prev => prev + 1)}
                        className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center font-mono hover:bg-warm transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Dogs count */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-dark/60">
                      Liczba psów: {dogs}
                    </label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setDogs(prev => Math.max(0, prev - 1))}
                        className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center font-mono hover:bg-warm transition-all"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm">{dogs}</span>
                      <button 
                        onClick={() => setDogs(prev => prev + 1)}
                        className="w-8 h-8 rounded-full border border-dark/20 flex items-center justify-center font-mono hover:bg-warm transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Electricity option */}
                  <div className="sm:col-span-2 py-2 flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="electricity-checkbox"
                      checked={electricity}
                      onChange={(e) => setElectricity(e.target.checked)}
                      className="w-4 h-4 text-dark bg-warm border-dark/20 rounded accent-dark"
                    />
                    <label htmlFor="electricity-checkbox" className="text-sm font-light select-none cursor-pointer">
                      Potrzebuję dedykowanego przyłącza prądu (+{pricingConfig.electricity.pricePln} PLN / doba)
                    </label>
                  </div>

                </div>
              </div>

              {/* Total output representation in monospace with high contrast */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-2">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-dark/50">
                    Estymowany koszt całkowity:
                  </div>
                  <div className="font-mono text-4xl font-semibold tracking-tight text-dark mt-2">
                    {totalEstimation} <span className="text-xl font-normal text-dark/60">PLN</span>
                  </div>
                  <div className="text-xs text-dark/60 mt-1 font-light">
                    Suma za {nights} noc(y). Przycisk prześle gotowe zapytanie e-mail.
                  </div>
                </div>

                <button 
                  onClick={handleInquiryAutoFill}
                  className="bg-dark text-light px-8 py-4 font-medium text-sm hover:bg-dark/85 transition-all w-full sm:w-auto text-center animate-pulse"
                >
                  Wyślij e-mail z wyceną →
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* REVIEWS SECTION - NOT TRADITIONAL TRIPLE CARDS SIDE-BY-SIDE */}
      <section id="opinie" className="py-24 md:py-36 bg-warm border-t border-light/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-xl space-y-4 mb-20">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-dark/60 block">
              Głos naszych gości
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl">
              Czerpiemy radość z <br /><span className="font-light italic">Waszej obecności.</span>
            </h2>
          </div>

          {/* Staggered text review layout - NO traditional background card boxes / NO shadows */}
          <div className="space-y-16">
            {reviews.map((rev, index) => (
              <div 
                key={index} 
                className={`max-w-3xl space-y-4 ${index % 2 === 1 ? 'ml-auto text-right md:pr-12' : 'mr-auto md:pl-12'}`}
              >
                <div className={`flex items-center gap-1.5 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                  <MessageSquare className="w-4 h-4 text-dark/50" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-dark/40">{rev.badge || 'Opinia z Facebooka'}</span>
                </div>

                {/* Big typography quote */}
                <blockquote className="font-display font-light italic text-xl md:text-2xl lg:text-3xl text-dark leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </blockquote>

                <div className={`text-xs font-mono text-dark/60 flex items-center gap-3 ${index % 2 === 1 ? 'justify-end' : ''}`}>
                  <span className="font-bold uppercase text-dark">{rev.author}</span>
                  <span>•</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center border-t border-dark/10 pt-12">
            <a 
              href="https://www.facebook.com/profile.php?id=100063712715318&sk=reviews" 
              className="text-dark text-xs font-mono uppercase tracking-[0.2em] border-b border-dark pb-1 hover:text-dark/70 transition-colors"
              target="_blank" 
              rel="noreferrer"
            >
              Zobacz opinie bezpośrednio na Facebooku →
            </a>
          </div>

        </div>
      </section>

      {/* FAQ SECTION - MINIMALIST THIN ACCORDION */}
      <section className="py-24 md:py-36 bg-light">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="space-y-4 mb-20 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-dark/60 block animate-pulse">
              Najczęstsze pytania
            </span>
            <h2 className="font-display font-medium text-3xl md:text-4xl">
              Warto wiedzieć przed <span className="font-light italic">przyjazdem.</span>
            </h2>
          </div>

          <div className="divide-y divide-dark/10 border-t border-b border-dark/10">
            {faqs.map((faq, index) => (
              <FaqCard key={index} faq={faq} />
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT & DIRECTIVES - THREE COLUMN DETAILS */}
      <section id="kontakt" className="py-24 md:py-36 bg-warm border-t border-dark/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          
          <div className="space-y-16">
            
            {/* Header */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-dark/60 block">
                Złapmy kontakt
              </span>
              <h2 className="font-display font-medium text-4xl md:text-5xl mt-2">
                Porozmawiajmy. <br />
                <span className="font-light italic">Zapraszamy do Zarzecza.</span>
              </h2>
            </div>

            <div className="space-y-12">
              <p className="leading-relaxed text-base md:text-lg text-dark/90 font-light max-w-3xl">
                Chcesz sprawdzić pogodę na polu? Zapytać o wolne parcele? A może zamówić świeżą smażoną rybkę dla większej grupy? Dzwoń śmiało lub pisz – odpowiadamy sprawnie i rzeczowo.
              </p>

              {/* Clean layout block for numbers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-dark/10">
                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 opacity-70 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-dark/50 block">Telefon:</span>
                    <a href="tel:+48501009722" className="font-mono text-lg font-medium hover:underline">
                      501 009 722
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 opacity-70 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-dark/50 block">E-mail założycielek:</span>
                    <a href="mailto:czulmartyna@gmail.com" className="font-mono text-lg font-medium hover:underline">
                      czulmartyna@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 opacity-70 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-dark/50 block">Adres do nawigacji GPS:</span>
                    <p className="font-medium text-base leading-snug">
                      ul. Żeglarska 1, Zarzecze 34-326
                    </p>
                    <span className="text-xs text-dark/60 block mt-1">
                      Tuż przy tafli Jeziora Żywieckiego, piękne widoki na góry.
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-light/90 py-16 border-t border-light/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start justify-between">
            
            {/* Col 1 */}
            <div className="space-y-4">
              <span className="font-display font-bold text-lg text-white">
                Campluzzz <span className="font-light italic text-light/80">Tawerna</span>
              </span>
              <p className="text-xs text-light/60 font-light leading-relaxed max-w-xs">
                Wyjątkowe, urokliwe pole namiotowe z tawerną letnią w Zarzeczu przy ul. Żeglarskiej 1. Rodzinny biznes mama i córka budowany na pasji do natury.
              </p>
              <div className="pt-2 text-[10px] font-mono tracking-widest text-light/40">
                © {new Date().getFullYear()} Campluzzz. Wszelkie prawa zastrzeżone.
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-4 font-light text-xs">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-light/40">Kontakt & Adres</h4>
              <p className="text-white font-medium">ul. Żeglarska 1, Zarzecze 34-326</p>
              <ul className="space-y-2 text-light/70 font-light">
                <li>Strona gotowa do wdrożenia przez GitHub Pages</li>
                <li>Pytania: <a href="mailto:czulmartyna@gmail.com" className="underline">czulmartyna@gmail.com</a></li>
                <li>Infolinia: <a href="tel:+48501009722" className="underline">501 009 722</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-4 font-light text-xs">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-light/40">Nawigacja i społeczności</h4>
              <div className="flex flex-col gap-2">
                <a href="https://www.instagram.com/campluzzztawerna/?hl=pl" target="_blank" rel="noreferrer" className="underline hover:text-white">
                  Obserwuj nas na Instagramie
                </a>
                <a href="https://www.facebook.com/profile.php?id=100063712715318" target="_blank" rel="noreferrer" className="underline hover:text-white">
                  Polub na Facebooku
                </a>
                <a href="https://www.facebook.com/profile.php?id=100063712715318&sk=reviews" target="_blank" rel="noreferrer" className="underline hover:text-white">
                  Przejrzyj opinie
                </a>
              </div>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}

interface FaqCardProps {
  faq: FaqItem;
  key?: any;
}

// Collapsible FAQ card component
function FaqCard({ faq }: FaqCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex justify-between items-center group"
      >
        <span className="font-display font-medium text-base md:text-lg text-dark group-hover:text-accent transition-colors">
          {faq.question}
        </span>
        <span className="text-lg font-light text-dark/50 transition-transform">
          {isOpen ? '—' : '+'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-xs md:text-sm text-dark/80 leading-relaxed font-light">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
