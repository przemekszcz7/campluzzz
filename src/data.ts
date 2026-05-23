// Dane dla strony Campluzzz Tawerna

export interface PhotoItem {
  url: string;
  title: string;
  category: 'camp' | 'tawerna' | 'chill';
  description: string;
}

export interface ReviewItem {
  text: string;
  author: string;
  ratingValue: number;
  badge?: string;
  date: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic mapped lucide react icon
  section: 'camp' | 'tawerna' | 'chill' | 'all';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const photos: PhotoItem[] = [
  {
    url: "https://i.ibb.co/k2Vp2bMv/469523818-1088482783285469-1861038172125315290-n.jpg",
    title: "Tawerna letnia o zmierzchu",
    category: "tawerna",
    description: "Nasz taras rozświetlony girlandami, tętniący letnim życiem i zapachem dobrego jedzenia."
  },
  {
    url: "https://i.ibb.co/CDL9tyP/468048820-1078395714294176-4905819204522895538-n.jpg",
    title: "Kajaki i sporty wodne",
    category: "chill",
    description: "Bezpośredni dostęp do jeziora umożliwia spływy, kąpiele i urokliwe popołudnia na wodzie."
  },
  {
    url: "https://i.ibb.co/RT9XMDNt/468187384-1078395930960821-8169934564082485103-n.jpg",
    title: "Wieczorne oświetlenie i chillout",
    category: "chill",
    description: "Magiczne, ciepłe światełka tworzą niepowtarzalną atmosferę sprzyjającą nocnym rozmowom."
  },
  {
    url: "https://i.ibb.co/0RQDnRkb/116432785-109858707490037-9053045796288312579-n.jpg",
    title: "Radosne chwile z przyjaciółmi",
    category: "chill",
    description: "Miejsce pełne uśmiechu i niezapomnianych wspomnień tworzonych wspólnie na świeżym powietrzu."
  },
  {
    url: "https://i.ibb.co/mrZGR1YM/116431757-109858550823386-5826199722785868490-n.jpg",
    title: "Widok na pole campingowe",
    category: "camp",
    description: "Zielona oaza spokoju tuż przy tafli jeziora, doskonale wyposażona na nocleg pod gwiazdami."
  },
  {
    url: "https://i.ibb.co/TDwkTHZQ/117035685-109799497495958-97771989685140707-n.jpg",
    title: "Ciepłe wnętrze naszej tawerny",
    category: "tawerna",
    description: "Miejsce spotkań z klimatycznym kominkiem, doskonałe również na chłodniejsze wieczory."
  },
  {
    url: "https://i.ibb.co/HTBSy66Q/490540640-1196697592463987-4612412222347235568-n.jpg",
    title: "Orzeźwiające koktajle i desery",
    category: "tawerna",
    description: "Nasze kolorowe, letnie napoje i słodkości, które idealnie smakują po całym dniu plażowania."
  },
  {
    url: "https://i.ibb.co/DPj2YJ3N/490497952-1196697322464014-4240192653679967540-n.jpg",
    title: "Pyszna, świeża rybka",
    category: "tawerna",
    description: "Nasza duma – przygotowana według tajnej receptury, chrupiąca i pożywna rybka z frytkami."
  },
  {
    url: "https://i.ibb.co/Y4dJgS4k/486672606-1178516674282079-675605599474580592-n.jpg",
    title: "Złota godzina na campingu",
    category: "camp",
    description: "Spektakularne zachody słońca malujące niebo nad Jeziorem Żywieckim bezpośrednio z pola."
  },
  {
    url: "https://i.ibb.co/G3JdsNHG/491433017-1194821489318264-182481411448942257-n-1.jpg",
    title: "Biesiadowanie na świeżym powietrzu",
    category: "tawerna",
    description: "Ciepłe posiłki i zimne napoje serwowane na tarasie z niepowtarzalnym widokiem na góry i wodę."
  },
  {
    url: "https://i.ibb.co/7dqc6hBK/486728693-1177329031067510-7052365344870366935-n.jpg",
    title: "Zwierzęta mile widziane",
    category: "chill",
    description: "Campluzzz to miejsce w pełni przyjazne dla czworonogów. Twój pupil również zasługuje na relaks!"
  },
  {
    url: "https://i.ibb.co/323YK3D/486602925-1176955467771533-4956283950723247243-n.jpg",
    title: "Poranny blask nad jeziorem",
    category: "camp",
    description: "Aura poranka, która wita naszych gości budzących się w namiotach i camperach."
  }
];

export const reviews: ReviewItem[] = [
  {
    text: "Cudowne miejsce z malowniczymi widokami 🥰 Świetna i bardzo pomocna obsługa która wprowadza wspaniałą atmosferę. Jesteśmy zachwyceni tym wyjątkowym miejscem i napewno wrócimy! ❤️",
    author: "Zadowolona Klientka",
    ratingValue: 5,
    badge: "Szczera rekomendacja",
    date: "Lipiec 2025"
  },
  {
    text: "Piękne miejsce, wspaniali ludzie, widoki sztoss, rodzinna atmosfera obsługa na najwyższym poziomie.",
    author: "Krzysztof",
    ratingValue: 5,
    badge: "Rewolucyjny klimat",
    date: "Sierpień 2025"
  },
  {
    text: "Polecam 🙂 Bardzo sympatyczne miejsce:)",
    author: "Anna",
    ratingValue: 5,
    badge: "Świetna lokalizacja",
    date: "Czerwiec 2025"
  }
];

export const amenities: Amenity[] = [
  {
    id: "amenity-1",
    title: "Bezpośrednio przy jeziorze",
    description: "Połóż się na leżaku i słuchaj szumu wody. Prywatne zejście do lini brzegowej.",
    iconName: "Waves",
    section: "camp"
  },
  {
    id: "amenity-2",
    title: "Pyszna gastronomia",
    description: "Nasza autorska tawerna serwuje pyszną rybkę, chłodne piwo, letnie drinki i desery.",
    iconName: "Utensils",
    section: "tawerna"
  },
  {
    id: "amenity-3",
    title: "Media na polu",
    description: "Podłączenia do prądu dla przyczep/camperów oraz ogólnodostępna stacja ładowania.",
    iconName: "Zap",
    section: "camp"
  },
  {
    id: "amenity-4",
    title: "Sanitariaty premium",
    description: "Nowoczesne toalety i gorące prysznice utrzymywane w nienagannej czystości przez całą dobę.",
    iconName: "ShowerHead",
    section: "camp"
  },
  {
    id: "amenity-5",
    title: "Atmosfera chilloutu",
    description: "Muzyka w tle, leżaki pod żaglem przeciwsłonecznym, girlandy świetlne i hamaki.",
    iconName: "Compass",
    section: "chill"
  },
  {
    id: "amenity-6",
    title: "Przyjaźni pupilom",
    description: "Zabierz swojego psa na urlop! Mamy duży teren i kochamy wszystkie czworonogi.",
    iconName: "Heart",
    section: "chill"
  },
  {
    id: "amenity-7",
    title: "Wieczorne ogniska",
    description: "Zorganizowane miejsce na klimatyczne ognisko i spotkanie przy gitarze.",
    iconName: "Flame",
    section: "camp"
  },
  {
    id: "amenity-8",
    title: "Kajaki i SUP-y",
    description: "Wypożyczalnia sprzętu sportowego umożliwia aktywności na Jeziorze Żywieckim.",
    iconName: "Compass",
    section: "chill"
  }
];

export const faqs: FaqItem[] = [
  {
    question: "Czy trzeba rezerwować miejsce namiotowe lub na campera z wyprzedzeniem?",
    answer: "Zalecamy wcześniejszy kontakt telefoniczny (501 009 722) w szczycie sezonu letniego. W pozostałych miesiącach zazwyczaj mamy wolne stanowiska – wystarczy przyjechać i wybrać najlepsze miejsce dla siebie!"
  },
  {
    question: "W jakich godzinach czynna jest Tawerna?",
    answer: "Nasza tawerna działa w sezonie letnim od rana do późnego wieczora. Serwujemy śniadania, obiady (nasza słynna świeża rybka), orzeźwiające napoje oraz autorskie słodkie desery."
  },
  {
    question: "Czy na polu campingowym jest dostęp do Wi-Fi i prądu?",
    answer: "Tak! Dla naszych gości przygotowaliśmy stabilne łącze Wi-Fi na terenie tawerny oraz przyłącza elektryczne w strategicznych miejscach pola campingowego."
  },
  {
    question: "Czy akceptujecie płatność kartą?",
    answer: "Oczywiście. Zarówno w tawernie, jak i na recepcji pola campingowego zapłacisz wygodnie kartą, telefonem lub gotówką."
  }
];

export const pricingConfig = {
  personAdult: { label: "Osoba dorosła", pricePln: 25 },
  personChild: { label: "Dziecko (do lat 12)", pricePln: 15 },
  tentSmall: { label: "Mały namiot (1-2 os.)", pricePln: 20 },
  tentLarge: { label: "Duży namiot (3+ os.)", pricePln: 30 },
  camper: { label: "Camper / Autodom", pricePln: 45 },
  caravan: { label: "Przyczepa campingowa", pricePln: 40 },
  car: { label: "Samochód osobowy", pricePln: 15 },
  electricity: { label: "Przyłącze prądu", pricePln: 20 },
  dog: { label: "Pies / Pupil", pricePln: 10 }
};
