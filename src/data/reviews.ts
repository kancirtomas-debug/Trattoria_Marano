export interface Review {
  id: number
  name: string
  rating: number
  timeAgo: string
  text: string
  isLocal?: boolean
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Natália Miramá Vendelová",
    rating: 5,
    timeAgo: "pred 3 mesiacmi",
    text: "Oľga je úžasná terapeutka, už 9 rokov sprevádza mňa a mojich blízkych cez rozmanité ťažkosti dospelých a detí. Ponúka komplexnú liečbu a dôkladné zmapovanie rozhovorom, ktorý nemá obdobu v spôsobe akým sa pýta — ide k jadru prežívania a osobnej ťažkosti. Teda okrem diagnózy klient/ka môže o sebe veľa pochopiť. Oľga mi dodáva vieru v našu schopnosť tela a človeka sa vyliečiť v jemnosti a v porozumení psychosomatiky. Odporúčam všetkým tým, ktorí chcú zmenu zdravia a kvality života!",
  },
  {
    id: 2,
    name: "Denisa Bogdaňová",
    rating: 5,
    timeAgo: "pred 3 mesiacmi",
    text: "Začala som chodiť na kurz homeopatie pre laikov k Olinke a som veľmi spokojná. Teší ma, že sa učím veci, ktoré mi pomôžu lepšie reagovať na rôzne akútne situácie v rodine. Olinka má príjemný a zrozumiteľný spôsob vysvetľovania a zároveň ma inšpiruje pozerať sa na život s väčším nadhľadom a myslieť pozitívne. Som vďačná, že som ju mohla spoznať a kurz určite odporúčam.",
  },
  {
    id: 3,
    name: "Dusana Vostrovska",
    rating: 5,
    timeAgo: "pred 3 mesiacmi",
    text: "O homeopatii, alternatívnej metóde liečby, som veľa počula a niečo už aj vedela. Rozhodla som sa prehlbovať svoje vedomosti práve u pani Olinky a za túto možnosť som nesmierne vďačná. Stretnutie s pani Olinkou pre mňa znamená otvorenie nových možností pre zdravší a radostnejší život. Ďakujem zo srdca.",
  },
  {
    id: 4,
    name: "Alena Kaščáková",
    rating: 5,
    timeAgo: "pred 10 mesiacmi",
    isLocal: true,
    text: "Ďakujem Olinke za 6 rokov úžasnej pomoci, trpezlivosti, neuveriteľnej ochoty... aj za to, že ma vždy vie správne povzbudiť. Dcéra dostala vysoké teploty, CRP 185, lekár predpísal antibiotiká. Zavolala som Olinke — poradila Belladonu a iné homeopatiká. Do troch dní bola dcéra zdravá bez ATB. Ľudia, skúste homeopatiu, stojí to naozaj za to! Olinke ešte raz ďakujem.",
  },
  {
    id: 5,
    name: "Denisa",
    rating: 5,
    timeAgo: "pred rokom",
    text: "Ďakujem, že som mohla spoznať takúto krásnu, vedomú, múdru, odvážnu, silnú, veselú a hravú svietiacu Olinku na jej víkendovom pobyte — Telo ako zrkadlo duše. Toto víkendové stretnutie mi otvorilo oči a srdce. Každý jeden moment bol plný inšpirácií a poznania. Vrelo odporúčam všetkým, ktorí hľadajú cestu k sebe.",
  },
  {
    id: 6,
    name: "Dagmar Tragalova",
    rating: 5,
    timeAgo: "pred rokom",
    text: "Bola som na pobyte iba jeden deň, kedy som absolvovala prednášku o prepojení tela a duše. Aj keď som čakala niečo iné, tých pár AHA efektov stálo zato. Olinka je východniarka, tak o to viac temperamentu do toho vloží. Odporúčam každému, kto sa zaujíma o svoje vnútro a zdravie.",
  },
  {
    id: 7,
    name: "Helena Turzíková",
    rating: 5,
    timeAgo: "pred 2 rokmi",
    text: "Niekedy v novembri 2022 som bola smutná, nešťastná, chorľavá... Olinka mi pomohla tak, že v 72 rokoch vyzerám max. na 60 a cítim sa skvelo. Jej prístup, empatia a odbornosť nemajú konkurenciu. Pekne Vám ďakujem, pani Olinka, a prajem veľa spokojných klientov. Helenka Turzíková z Prievidze.",
  },
  {
    id: 8,
    name: "Richard",
    rating: 5,
    timeAgo: "pred 2 rokmi",
    text: "Z klienta a terapeuta sa stalo priateľstvo, lebo dôvera je veľmi dôležitá. Olinka je empatická, odborná a vždy vie, ako pomôcť. Vrelo doporučujem Olinku každému, kto hľadá skutočnú pomoc.",
  },
  {
    id: 9,
    name: "Janka Bednarova",
    rating: 5,
    timeAgo: "pred 3 rokmi",
    text: "Zo všetkých mojich skúseností, kedy som sa zverila do rúk terapeutovi, si dovolím napísať o pani Olinke iba to najlepšie. Jej prístup je profesionálny, citlivý a skutočne pomáha. Vrelo pani homeopatku odporúčam.",
  },
  {
    id: 10,
    name: "Andrea Sahulova",
    rating: 5,
    timeAgo: "pred 3 rokmi",
    isLocal: true,
    text: "Som skeptik a nikdy by som neverila, že mi homeopatiká pomôžu... Pani Olga je jedna úžasná žena, ktorá je empatická, trpezlivá a veľmi odborná. Jej pomoc bola pre mňa prekvapujúco účinná. Ďakujem!",
  },
  {
    id: 11,
    name: "Anonym",
    rating: 5,
    timeAgo: "pred 4 rokmi",
    text: "Mám výbornú skúsenosť s pani Kancírovou. Skvelá odborníčka, príjemná, dôsledná a vždy ochotná poradiť. Vrelo ju odporúčam všetkým, ktorí hľadajú alternatívnu cestu k zdraviu.",
  },
  {
    id: 12,
    name: "Veronika Semanova",
    rating: 5,
    timeAgo: "pred 5 rokmi",
    text: "Olinka mi zachránila manželstvo tým, že mi pomohla so ženským problémom, ktorý trval 8 rokov a nikto mi s ním nevedel pomôcť. Po homeopatickom lieku nastala dlho očakávaná zmena. Ďakujem Olinka!",
  },
]

export const featuredReviews = reviews.slice(0, 3)
