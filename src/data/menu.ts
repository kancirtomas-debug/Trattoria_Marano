export type MenuItem = {
  id: string
  name: string
  description: { de: string; en: string }
  price: number
  vegetarian?: boolean
  spicy?: boolean
  allergens?: string
}

export type MenuCategory = {
  id: string
  label: { de: string; en: string }
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: "antipasti",
    label: { de: "Antipasti", en: "Starters" },
    items: [
      {
        id: "a1",
        name: "Antipasti misti alla Marano",
        description: {
          de: "Hausgemachte gemischte Vorspeisen nach Art der Trattoria Marano — eine Auswahl feinster Antipasti der Saison",
          en: "House mixed starters in the style of Trattoria Marano — a selection of the finest seasonal antipasti",
        },
        price: 14.90,
        allergens: "7,10,13 / A,B,C,D,F",
      },
      {
        id: "a2",
        name: "Acciughe Grigliate",
        description: {
          de: "Gegrillte Anchovis auf Rucola mit Avocado — frisch und aromatisch",
          en: "Grilled anchovies on a bed of rocket with avocado — fresh and aromatic",
        },
        price: 11.90,
        allergens: "4 / A,C,D",
      },
      {
        id: "a3",
        name: "Bruschetta al pomodoro",
        description: {
          de: "Geröstetes Brot mit frischen Tomaten, Knoblauch und Basilikum",
          en: "Toasted bread topped with fresh tomatoes, garlic and basil",
        },
        price: 7.90,
        vegetarian: true,
        allergens: "1a",
      },
      {
        id: "a4",
        name: "Montanara",
        description: {
          de: "Neapolitanische frittierte Pizzascheibe — knusprig, luftig und unwiderstehlich",
          en: "Neapolitan fried pizza slice — crispy, airy and irresistible",
        },
        price: 7.90,
        allergens: "4 / A,C,D",
      },
      {
        id: "a5",
        name: "Parmigiana di Melanzane",
        description: {
          de: "Überbackene Auberginen mit Tomatensauce, Mozzarella und Parmesan — ein süditalienischer Klassiker",
          en: "Baked aubergines with tomato sauce, mozzarella and parmesan — a southern Italian classic",
        },
        price: 8.90,
        vegetarian: true,
        allergens: "4 / A,C,D",
      },
    ],
  },
  {
    id: "insalate",
    label: { de: "Salate", en: "Salads" },
    items: [
      {
        id: "s1",
        name: "Insalata mista",
        description: {
          de: "Gemischter Salat mit frischem Saisongemüse und Hausdressing",
          en: "Mixed salad with fresh seasonal vegetables and house dressing",
        },
        price: 6.50,
        vegetarian: true,
        allergens: "1a,10,11,13 / A,B,C,D,K",
      },
      {
        id: "s2",
        name: "Insalata Rucola e pomodorini",
        description: {
          de: "Rucola-Salat mit Kirschtomaten, Parmesan und Balsamico-Dressing",
          en: "Rocket salad with cherry tomatoes, parmesan and balsamic dressing",
        },
        price: 6.90,
        vegetarian: true,
        allergens: "6,9,13 / A,B,C,D,K",
      },
      {
        id: "s3",
        name: "Formaggio di Capra alla griglia",
        description: {
          de: "Gegrillter Ziegenkäse auf Blattsalat mit karamellisierten Walnüssen und Honig-Dressing",
          en: "Grilled goat cheese on mixed leaves with caramelised walnuts and honey dressing",
        },
        price: 14.90,
        vegetarian: true,
        allergens: "1a,7,8c / A,B,C,D,(E),K",
      },
      {
        id: "s4",
        name: "Insalata Nizza",
        description: {
          de: "Salade Niçoise mit Thunfisch, grünen Bohnen, Eiern, Oliven und Anchovis-Dressing",
          en: "Salad Niçoise with tuna, green beans, eggs, olives and anchovy dressing",
        },
        price: 16.50,
        allergens: "3,4,10,13 / A,B,C,D,F,H,I,K",
      },
    ],
  },
  {
    id: "zuppe",
    label: { de: "Suppen", en: "Soups" },
    items: [
      {
        id: "z1",
        name: "Zuppa di pomodoro classico",
        description: {
          de: "Klassische Tomatensuppe mit frischen Tomaten, Basilikum und einem Schuss Olivenöl",
          en: "Classic tomato soup made with fresh tomatoes, basil and a drizzle of olive oil",
        },
        price: 7.50,
        vegetarian: true,
        allergens: "1a,7,9 / A,C,D,F",
      },
    ],
  },
  {
    id: "pasta-speciale",
    label: { de: "Pasta Speciale", en: "Pasta Specials" },
    items: [
      {
        id: "ps1",
        name: "Fettuccine vitello e funghi",
        description: {
          de: "Breite Fettuccine mit zartem Kalbfleisch und Waldpilzen in cremiger Sauce",
          en: "Wide fettuccine with tender veal and wild mushrooms in a creamy sauce",
        },
        price: 16.90,
        allergens: "1a,3,7,(9),13 / C,E",
      },
      {
        id: "ps2",
        name: "Cannelloni Ricotta e spinaci fatti in casa",
        description: {
          de: "Hausgemachte Cannelloni gefüllt mit Ricotta und Spinat, überbacken mit Tomatensauce und Béchamel",
          en: "Homemade cannelloni filled with ricotta and spinach, baked with tomato sauce and béchamel",
        },
        price: 12.90,
        vegetarian: true,
        allergens: "1a,3,7 / A,C,E",
      },
      {
        id: "ps3",
        name: "Spaghetti Carbonara alla Trattoria Marano",
        description: {
          de: "Spaghetti nach Art der Trattoria Marano mit Guanciale, Ei-Pecorino-Sauce und schwarzem Pfeffer",
          en: "Spaghetti Trattoria Marano style with guanciale, egg-pecorino sauce and black pepper",
        },
        price: 14.90,
        allergens: "1a,3,7,9 / A,B,C,D,E",
      },
      {
        id: "ps4",
        name: "Gnocchi quatro formaggi",
        description: {
          de: "Hausgemachte Gnocchi in einer cremigen Vier-Käse-Sauce aus Gorgonzola, Taleggio, Parmesan und Fontina",
          en: "Homemade gnocchi in a creamy four-cheese sauce of gorgonzola, taleggio, parmesan and fontina",
        },
        price: 14.90,
        vegetarian: true,
        allergens: "1a,3,7,9 / A,B,C,D,E",
      },
    ],
  },
  {
    id: "pasta-tradizionale",
    label: { de: "Pasta Tradizionale", en: "Classic Pasta" },
    items: [
      {
        id: "pt1",
        name: "Spaghetti Bolognese",
        description: {
          de: "Spaghetti mit klassischer Bolognese aus langsam geschmortem Rinderhackfleisch und Tomaten",
          en: "Spaghetti with classic Bolognese of slow-braised ground beef and tomatoes",
        },
        price: 13.90,
        allergens: "1a,3,7,9,13 / A,C,D,E",
      },
      {
        id: "pt2",
        name: "Penne alla Trattoria Marano",
        description: {
          de: "Penne nach Hausrezept der Trattoria Marano mit aromatischer Tomatensauce und saisonalen Zutaten",
          en: "Penne in the house recipe of Trattoria Marano with aromatic tomato sauce and seasonal ingredients",
        },
        price: 13.90,
        allergens: "1a,3,7,8,13 / A,C,D,E",
      },
      {
        id: "pt3",
        name: "Penne all'arrabbiata",
        description: {
          de: "Penne mit würzig-scharfer Tomatensauce, Knoblauch und Chili",
          en: "Penne with spicy tomato sauce, garlic and chilli",
        },
        price: 10.90,
        vegetarian: true,
        spicy: true,
        allergens: "1a,3,7,13 / A,C,D,K",
      },
    ],
  },
  {
    id: "pizza-classica",
    label: { de: "Pizza Classica", en: "Classic Pizza" },
    items: [
      {
        id: "pc1",
        name: "Margherita",
        description: {
          de: "Der Klassiker: Tomatensauce, Mozzarella und frisches Basilikum",
          en: "The classic: tomato sauce, mozzarella and fresh basil",
        },
        price: 10.90,
        vegetarian: true,
        allergens: "1a,7 / A,D,I",
      },
      {
        id: "pc2",
        name: "Capricciosa",
        description: {
          de: "Tomatensauce, Mozzarella, Schinken, Pilze, Artischocken und Oliven",
          en: "Tomato sauce, mozzarella, ham, mushrooms, artichokes and olives",
        },
        price: 15.90,
        allergens: "1a,7,13 / A,D,I",
      },
      {
        id: "pc3",
        name: "Salami",
        description: {
          de: "Tomatensauce, Mozzarella und würzigem italienischem Salami",
          en: "Tomato sauce, mozzarella and spiced Italian salami",
        },
        price: 12.50,
        allergens: "1a,7,13 / A,D,I",
      },
      {
        id: "pc4",
        name: "Diavola",
        description: {
          de: "Tomatensauce, Mozzarella und scharfer Salami — feurig und intensiv",
          en: "Tomato sauce, mozzarella and hot salami — fiery and intense",
        },
        price: 15.50,
        spicy: true,
        allergens: "1a,7,13 / A,D,I",
      },
      {
        id: "pc5",
        name: "Parma",
        description: {
          de: "Tomatensauce, Mozzarella und hauchdünner Parmaschinken nach dem Backen belegt",
          en: "Tomato sauce, mozzarella and paper-thin Parma ham added after baking",
        },
        price: 17.50,
        allergens: "1a,7,13 / A,D,I",
      },
      {
        id: "pc6",
        name: "Regina",
        description: {
          de: "Tomatensauce, Mozzarella, Schinken und Champignons — die Königin der Pizzen",
          en: "Tomato sauce, mozzarella, ham and mushrooms — the queen of pizzas",
        },
        price: 14.60,
        allergens: "1a,7,13 / A,D,I",
      },
    ],
  },
  {
    id: "pizza-vegetariane",
    label: { de: "Pizza Vegetarisch", en: "Vegetarian Pizza" },
    items: [
      {
        id: "pv1",
        name: "Ortolana",
        description: {
          de: "Tomatensauce, Mozzarella und gegrilltem Gemüse der Saison vom Markt",
          en: "Tomato sauce, mozzarella and grilled seasonal market vegetables",
        },
        price: 15.90,
        vegetarian: true,
        allergens: "1a,7,8c / A,C,D,I",
      },
      {
        id: "pv2",
        name: "Spinaci",
        description: {
          de: "Tomatensauce, Mozzarella und frischem Spinat mit einem Hauch Knoblauch",
          en: "Tomato sauce, mozzarella and fresh spinach with a hint of garlic",
        },
        price: 15.90,
        vegetarian: true,
        allergens: "1a,7,8g,13 / A,C,D",
      },
      {
        id: "pv3",
        name: "Rucola",
        description: {
          de: "Tomatensauce, Mozzarella, frischer Rucola und Parmesanspäne nach dem Backen",
          en: "Tomato sauce, mozzarella, fresh rocket and parmesan shavings added after baking",
        },
        price: 16.50,
        vegetarian: true,
        allergens: "1a,7 / A,C,D,E,G",
      },
      {
        id: "pv4",
        name: "Bufala",
        description: {
          de: "Tomatensauce mit cremigem Büffelmozzarella, frischen Tomaten und Basilikum",
          en: "Tomato sauce with creamy buffalo mozzarella, fresh tomatoes and basil",
        },
        price: 16.50,
        vegetarian: true,
        allergens: "1a,7,13 / A,C,D,E,G",
      },
      {
        id: "pv5",
        name: "Verde",
        description: {
          de: "Tomatensauce, Mozzarella, Zucchini, Paprika und frischen Kräutern",
          en: "Tomato sauce, mozzarella, courgette, peppers and fresh herbs",
        },
        price: 15.50,
        vegetarian: true,
        allergens: "1a,7,13 / A,D,I",
      },
    ],
  },
  {
    id: "pizza-pesce",
    label: { de: "Pizza mit Fisch", en: "Pizza with Fish" },
    items: [
      {
        id: "pf1",
        name: "Tonno",
        description: {
          de: "Tomatensauce, Mozzarella, Thunfisch und Zwiebeln",
          en: "Tomato sauce, mozzarella, tuna and onions",
        },
        price: 14.60,
        allergens: "1a,7,13 / A,D,I",
      },
      {
        id: "pf2",
        name: "Mare",
        description: {
          de: "Tomatensauce mit Meeresfrüchten — Garnelen, Muscheln und Tintenfisch",
          en: "Tomato sauce with seafood — prawns, mussels and squid",
        },
        price: 17.50,
        allergens: "1a,7,2,14 / A,D",
      },
      {
        id: "pf3",
        name: "Napoli",
        description: {
          de: "Tomatensauce, Mozzarella, Anchovis, Kapern und Oregano — der Neapolitaner Klassiker",
          en: "Tomato sauce, mozzarella, anchovies, capers and oregano — the Neapolitan classic",
        },
        price: 14.50,
        allergens: "1a,7,13 / A,C,D",
      },
      {
        id: "pf4",
        name: "Salmone",
        description: {
          de: "Tomatensauce, Mozzarella und geräuchertem Lachs mit einem Hauch Zitrone",
          en: "Tomato sauce, mozzarella and smoked salmon with a hint of lemon",
        },
        price: 16.90,
        allergens: "1a,7,13 / A,B,C,D,E,I",
      },
    ],
  },
  {
    id: "calzoni",
    label: { de: "Calzoni", en: "Folded Pizza" },
    items: [
      {
        id: "ca1",
        name: "Luna",
        description: {
          de: "Gefaltete Pizza gefüllt mit Tomatensauce, Mozzarella und Schinken",
          en: "Folded pizza filled with tomato sauce, mozzarella and ham",
        },
        price: 14.90,
        allergens: "1a,7,13 / A,D,I",
      },
      {
        id: "ca2",
        name: "Luna Speciale",
        description: {
          de: "Calzone-Sonderversion mit Tomatensauce, Mozzarella und einer besonderen Füllung nach Hausrezept",
          en: "Special calzone version with tomato sauce, mozzarella and a special house-recipe filling",
        },
        price: 15.60,
        allergens: "1a,7,13 / A,D",
      },
      {
        id: "ca3",
        name: "Rachetta",
        description: {
          de: "Racchetta-Calzone mit Tomatensauce, Mozzarella, Rucola und Parmesan",
          en: "Racchetta calzone with tomato sauce, mozzarella, rocket and parmesan",
        },
        price: 15.60,
        allergens: "1a,7,13 / A,C,D",
      },
      {
        id: "ca4",
        name: "Cornicione",
        description: {
          de: "Üppiger Calzone mit dickem Rand, gefüllt mit Ricotta, Schinken, Mozzarella und Tomaten",
          en: "Generous calzone with thick crust filled with ricotta, ham, mozzarella and tomatoes",
        },
        price: 16.60,
        allergens: "1a,7,13 / A,B,C,D,E,I",
      },
    ],
  },
  {
    id: "pizza-bianca",
    label: { de: "Pizza Bianca", en: "White Pizza" },
    items: [
      {
        id: "pb1",
        name: "Quattro Formaggi",
        description: {
          de: "Weiße Pizza ohne Tomatensauce mit vier Käsesorten: Mozzarella, Gorgonzola, Parmesan und Fontina",
          en: "White pizza without tomato sauce with four cheeses: mozzarella, gorgonzola, parmesan and fontina",
        },
        price: 15.90,
        vegetarian: true,
        allergens: "1a,7,8c / A,C,D,I",
      },
      {
        id: "pb2",
        name: "Mortadella",
        description: {
          de: "Weiße Pizza mit Mozzarella, delikater Mortadella und einem Hauch Pistazien",
          en: "White pizza with mozzarella, delicate mortadella and a hint of pistachios",
        },
        price: 16.90,
        allergens: "1a,7,8g,13 / A,C,D",
      },
      {
        id: "pb3",
        name: "Tartufo",
        description: {
          de: "Weiße Pizza mit Mozzarella, Trüffelcreme und Parmesan — luxuriös und aromatisch",
          en: "White pizza with mozzarella, truffle cream and parmesan — luxurious and aromatic",
        },
        price: 17.90,
        allergens: "1a,7 / A,C,D,E,G",
      },
      {
        id: "pb4",
        name: "Salsiccia Friarielli",
        description: {
          de: "Weiße Pizza mit italienischer Wurst, neapolitanischem Friarielli-Brokkoli und Mozzarella",
          en: "White pizza with Italian sausage, Neapolitan friarielli broccoli and mozzarella",
        },
        price: 16.50,
        allergens: "1a,7,13 / A,C,D,E,G",
      },
    ],
  },
  {
    id: "pizza-pane",
    label: { de: "Pizzabrot", en: "Pizza Bread" },
    items: [
      {
        id: "pp1",
        name: "Pizza pane timo e rosmarino",
        description: {
          de: "Knuspriges Pizzabrot mit frischem Thymian und Rosmarin, beträufelt mit Olivenöl",
          en: "Crispy pizza bread with fresh thyme and rosemary, drizzled with olive oil",
        },
        price: 7.90,
        vegetarian: true,
        allergens: "1a",
      },
      {
        id: "pp2",
        name: "Pizza pane pomodori e basilico",
        description: {
          de: "Knuspriges Pizzabrot mit frischen Tomaten, Basilikum und Olivenöl",
          en: "Crispy pizza bread with fresh tomatoes, basil and olive oil",
        },
        price: 8.50,
        vegetarian: true,
        allergens: "1a",
      },
    ],
  },
  {
    id: "dolci",
    label: { de: "Desserts", en: "Desserts" },
    items: [
      {
        id: "d1",
        name: "Tortino al Cioccolato",
        description: {
          de: "Warmer Schokoladenkuchen mit flüssigem Kern, serviert mit Vanilleeis",
          en: "Warm chocolate fondant with a liquid centre, served with vanilla ice cream",
        },
        price: 8.90,
        allergens: "1a,3,5,7,8 / A,B,C,D,F,J",
      },
      {
        id: "d2",
        name: "Panna cotta classica",
        description: {
          de: "Klassische Panna cotta mit Vanille und frischem Beerenragout",
          en: "Classic vanilla panna cotta with fresh berry compote",
        },
        price: 7.90,
        allergens: "3,7,8 / A,B,C,D,F,G,J",
      },
      {
        id: "d3",
        name: "Tiramisu Marano — senza uova",
        description: {
          de: "Hausgemachtes Tiramisu nach Art der Trattoria Marano — ohne Eier, mit Löffelbiskuit, Espresso und Mascarpone",
          en: "Homemade tiramisu Trattoria Marano style — egg-free, with ladyfingers, espresso and mascarpone",
        },
        price: 7.90,
        allergens: "1a,5,6,7 / A,B,C,D,F,G",
      },
    ],
  },
  {
    id: "bevande",
    label: { de: "Getränke", en: "Drinks" },
    items: [
      {
        id: "bev1",
        name: "Prosecco Frizzante 0.1 L",
        description: {
          de: "Leicht perlender Prosecco aus dem Veneto — frisch und trocken",
          en: "Lightly sparkling Prosecco from the Veneto — fresh and dry",
        },
        price: 4.70,
        vegetarian: true,
        allergens: "b",
      },
      {
        id: "bev2",
        name: "Prosecco Spumante 0.75 L",
        description: {
          de: "Vollsprudelnder Prosecco Spumante in der Flasche — ideal zum Feiern",
          en: "Fully sparkling Prosecco Spumante by the bottle — ideal for celebrations",
        },
        price: 29.90,
        vegetarian: true,
        allergens: "b",
      },
      {
        id: "bev3",
        name: "Spritz Classico 0.2 L",
        description: {
          de: "Der klassische Aperol Spritz mit Prosecco und einem Spritzer Soda",
          en: "The classic Aperol Spritz with Prosecco and a splash of soda",
        },
        price: 8.90,
        vegetarian: true,
        allergens: "b",
      },
      {
        id: "bev4",
        name: "Hugo 0.2 L",
        description: {
          de: "Erfrischender Hugo mit Holunderblütensirup, Prosecco, Minze und Soda",
          en: "Refreshing Hugo with elderflower syrup, Prosecco, mint and soda",
        },
        price: 8.90,
        vegetarian: true,
        allergens: "3 / b",
      },
      {
        id: "bev5",
        name: "Hauswein 0.2 L",
        description: {
          de: "Hauswein vom Fass — rot oder weiß — ein ehrlicher Begleiter zu jedem Gericht",
          en: "House wine on tap — red or white — an honest companion to any dish",
        },
        price: 6.50,
        vegetarian: true,
      },
      {
        id: "bev6",
        name: "Paulaner Hefe-Weißbier 0.5 L",
        description: {
          de: "Traditionelles bayerisches Hefeweizen von der Paulaner Brauerei",
          en: "Traditional Bavarian wheat beer from the Paulaner brewery",
        },
        price: 5.50,
        allergens: "a",
      },
      {
        id: "bev7",
        name: "Espresso",
        description: {
          de: "Kurzer, kräftiger Espresso aus 100 % arabischer Röstung",
          en: "Short, strong espresso from a 100% arabica roast",
        },
        price: 2.90,
        vegetarian: true,
        allergens: "9",
      },
      {
        id: "bev8",
        name: "Cappuccino",
        description: {
          de: "Cremiger Cappuccino mit aufgeschäumter Vollmilch und feinem Espressoaroma",
          en: "Creamy cappuccino with steamed whole milk and delicate espresso flavour",
        },
        price: 3.90,
        vegetarian: true,
        allergens: "9 / c",
      },
      {
        id: "bev9",
        name: "Latte Macchiato",
        description: {
          de: "Geschichteter Latte Macchiato mit heißer Milch, Milchschaum und einem Espressoshot",
          en: "Layered latte macchiato with hot milk, milk foam and a shot of espresso",
        },
        price: 5.30,
        vegetarian: true,
        allergens: "9 / c",
      },
      {
        id: "bev10",
        name: "Adelholzener 0.25 L",
        description: {
          de: "Bayerisches Mineralwasser aus Adelholzen — still oder mit Kohlensäure",
          en: "Bavarian mineral water from Adelholzen — still or sparkling",
        },
        price: 4.10,
        vegetarian: true,
      },
      {
        id: "bev11",
        name: "Coca Cola / Fanta / Sprite 0.4 L",
        description: {
          de: "Erfrischende Softdrinks: Coca Cola, Fanta oder Sprite — nach Wahl",
          en: "Refreshing soft drinks: Coca Cola, Fanta or Sprite — your choice",
        },
        price: 4.90,
        vegetarian: true,
        allergens: "1,3,9",
      },
    ],
  },
]
