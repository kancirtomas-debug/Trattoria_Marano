export type MenuItem = {
  id: string
  name: string
  description: { de: string; en: string }
  detailedDescription?: { de: string; en: string }
  price: number
  vegetarian?: boolean
  spicy?: boolean
  allergens?: string
  image?: string
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
          de: "Hausgemachte gemischte Vorspeisen nach Art der Trattoria Marano - eine Auswahl feinster Antipasti der Saison",
          en: "House mixed starters in the style of Trattoria Marano - a selection of the finest seasonal antipasti",
        },
        price: 14.90,
        allergens: "7,10,13 / A,B,C,D,F",
        image: "lieferando-antipasti.jpg",
      },
      {
        id: "a2",
        name: "Acciughe Grigliate",
        description: {
          de: "Gegrillte Anchovis auf Rucola mit Avocado - frisch und aromatisch",
          en: "Grilled anchovies on a bed of rocket with avocado - fresh and aromatic",
        },
        price: 11.90,
        allergens: "4 / A,C,D",
        image: "lieferando-anchovies.jpg",
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
          de: "Neapolitanische frittierte Pizzascheibe - knusprig, luftig und unwiderstehlich",
          en: "Neapolitan fried pizza slice - crispy, airy and irresistible",
        },
        price: 7.90,
        allergens: "4 / A,C,D",
        image: "lieferando-montanara.jpg",
      },
      {
        id: "a5",
        name: "Parmigiana di Melanzane",
        description: {
          de: "Überbackene Auberginen mit Tomatensauce, Mozzarella und Parmesan - ein süditalienischer Klassiker",
          en: "Baked aubergines with tomato sauce, mozzarella and parmesan - a southern Italian classic",
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
        detailedDescription: {
          de: "Frischer Saisonblattsalat mit knackigem Rohkost, hausgemachtem Balsamico-Dressing und gerösteten Sonnenblumenkernen. Leicht, erfrischend und der perfekte Start ins Menü.",
          en: "Fresh seasonal leaves with crisp raw vegetables, house-made balsamic dressing and toasted sunflower seeds. Light, refreshing and the perfect way to start.",
        },
        price: 6.50,
        vegetarian: true,
        allergens: "1a,10,11,13 / A,B,C,D,K",
        image: "70a7a32a1d44d70e3a53289ad2f2aa21_MD5.jpg",
      },
      {
        id: "s2",
        name: "Insalata Rucola e pomodorini",
        description: {
          de: "Rucola-Salat mit Kirschtomaten, Parmesan und Balsamico-Dressing",
          en: "Rocket salad with cherry tomatoes, parmesan and balsamic dressing",
        },
        detailedDescription: {
          de: "Würziger Rucola mit süßen Kirschtomaten und zarten Grana-Padano-Spänen, abgerundet mit einem leichten Balsamico-Dressing. Klassisch, frisch und aromatisch.",
          en: "Peppery rocket with sweet cherry tomatoes and delicate Grana Padano shavings, finished with a light balsamic dressing. Classic, fresh and full of flavour.",
        },
        price: 6.90,
        vegetarian: true,
        allergens: "6,9,13 / A,B,C,D,K",
        image: "3e73a8f15bc8b3daba55a1755555d762_MD5.jpg",
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
        detailedDescription: {
          de: "Salade Niçoise auf unsere Art: knackige Blattsalate mit hochwertigem Thunfisch, hartgekochtem Ei, Kalamata-Oliven, Kapern, roten Zwiebeln und einem würzigen Balsamico-Dressing. Ein vollständiges Gericht.",
          en: "Our take on Salade Niçoise: crisp leaves with premium tuna, hard-boiled egg, Kalamata olives, capers, red onions and a tangy balsamic dressing. A complete meal in itself.",
        },
        price: 16.50,
        allergens: "3,4,10,13 / A,B,C,D,F,H,I,K",
        image: "813a896cb89a27f6b2309469c4495396_MD5.jpg",
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
        image: "lieferando-tomato-soup.jpg",
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
        image: "lieferando-fettuccine-veal.jpg",
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
        image: "lieferando-cannelloni.jpg",
      },
      {
        id: "ps3",
        name: "Spaghetti Carbonara alla Trattoria Marano",
        description: {
          de: "Spaghetti nach Art der Trattoria Marano mit Guanciale, Ei-Pecorino-Sauce und schwarzem Pfeffer",
          en: "Spaghetti Trattoria Marano style with guanciale, egg-pecorino sauce and black pepper",
        },
        detailedDescription: {
          de: "Die echte Carbonara nach römischer Tradition - al-dente Spaghetti mit knusprigem Pancetta-Speck, cremiger Eigelb-Pecorino-Sauce und frisch gemahlenem schwarzem Pfeffer. Kein Sahne, nur Purismus.",
          en: "Authentic Roman carbonara - al-dente spaghetti with crispy pancetta, a creamy egg and pecorino sauce, and freshly ground black pepper. No cream. Just tradition.",
        },
        price: 14.90,
        allergens: "1a,3,7,9 / A,B,C,D,E",
        image: "441670bdae5c0de8ebd88a938b6a3161_MD5.jpg",
      },
      {
        id: "ps4",
        name: "Gnocchi quatro formaggi",
        description: {
          de: "Hausgemachte Gnocchi in einer cremigen Vier-Käse-Sauce aus Gorgonzola, Taleggio, Parmesan und Fontina",
          en: "Homemade gnocchi in a creamy four-cheese sauce of gorgonzola, taleggio, parmesan and fontina",
        },
        detailedDescription: {
          de: "Hausgemachte Kartoffelgnocchi in einer traumhaft cremigen Vier-Käse-Sauce aus Gorgonzola, Taleggio, Parmesan und Fontina. Reichhaltig, wärmend und unwiderstehlich.",
          en: "Homemade potato gnocchi in a dreamily creamy four-cheese sauce of gorgonzola, taleggio, parmesan and fontina. Rich, warming and utterly irresistible.",
        },
        price: 14.90,
        vegetarian: true,
        allergens: "1a,3,7,9 / A,B,C,D,E",
        image: "571c7e8b8e2cd5132893968e3715a412_MD5.jpg",
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
        detailedDescription: {
          de: "Vier Stunden Geduld, ein Bissen Glück. Langsam geschmortes Rinderhackfleisch (100%) mit frischen Tomaten, Saisongemüse, Kräutern und einem Schuss Merlot. Ein echter Klassiker.",
          en: "Four hours of patience, one bite of bliss. Slow-braised ground beef (100%) with fresh tomatoes, seasonal vegetables, herbs and a splash of Merlot. A true Italian classic.",
        },
        price: 13.90,
        allergens: "1a,3,7,9,13 / A,C,D,E",
        image: "7544e92ee6aa490b4174da6f673ec7b1_MD5.jpg",
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
        image: "lieferando-penne-marano.jpg",
      },
      {
        id: "pt3",
        name: "Penne all'arrabbiata",
        description: {
          de: "Penne mit würzig-scharfer Tomatensauce, Knoblauch und Chili",
          en: "Penne with spicy tomato sauce, garlic and chilli",
        },
        detailedDescription: {
          de: "Penne in feuriger Tomaten-Chili-Sauce mit Knoblauch und frischer Petersilie. Erhältlich in mild, mittelscharf oder sehr scharf - für echte Chili-Liebhaber. Vegetarisch und voller Charakter.",
          en: "Penne in a fiery tomato and chilli sauce with garlic and fresh parsley. Available mild, medium or very hot - for true chilli lovers. Vegetarian and full of character.",
        },
        price: 10.90,
        vegetarian: true,
        spicy: true,
        allergens: "1a,3,7,13 / A,C,D,K",
        image: "56428fd0421724478e57f5d084801054_MD5.jpg",
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
        detailedDescription: {
          de: "Der Klassiker aller Klassiker. Knuspriger Teig mit hausgemachter Tomatensauce, cremiger Mozzarella und frischem Basilikum. Unser Teig ruht 48 Stunden für den perfekten Boden. Ca. Ø 33 cm.",
          en: "The classic of all classics. Crispy dough with house-made tomato sauce, creamy mozzarella and fresh basil. Our dough rests for 48 hours for the perfect crust. Approx. Ø 33 cm.",
        },
        price: 10.90,
        vegetarian: true,
        allergens: "1a,7 / A,D,I",
        image: "c9be83e3ac844e63a68f8f0de6224a77_MD5.jpg",
      },
      {
        id: "pc2",
        name: "Capricciosa",
        description: {
          de: "Tomatensauce, Mozzarella, Schinken, Pilze, Artischocken und Oliven",
          en: "Tomato sauce, mozzarella, ham, mushrooms, artichokes and olives",
        },
        detailedDescription: {
          de: "Tomatensauce, Mozzarella, zarter Cotto-Schinken, Champignons, Artischockenherzen und schwarze Oliven. Die launische Pizza - jedes Stück ein anderes Erlebnis.",
          en: "Tomato sauce, mozzarella, tender cooked ham, mushrooms, artichoke hearts and black olives. The capricious pizza - every slice a different experience.",
        },
        price: 15.90,
        allergens: "1a,7,13 / A,D,I",
        image: "2ec75534d6c087d04f19affffda38979_MD5.jpg",
      },
      {
        id: "pc3",
        name: "Salami",
        description: {
          de: "Tomatensauce, Mozzarella und würzigem italienischem Salami",
          en: "Tomato sauce, mozzarella and spiced Italian salami",
        },
        detailedDescription: {
          de: "Tomatensauce, Mozzarella und würzige italienische Salami aus Schweine- und Rindfleisch auf knusprigem 48-Stunden-Teig. Ehrlich, herzhaft und immer ein Treffer.",
          en: "Tomato sauce, mozzarella and spiced Italian salami of pork and beef on crispy 48-hour dough. Honest, hearty and always a hit.",
        },
        price: 12.50,
        allergens: "1a,7,13 / A,D,I",
        image: "6efdeb0d07d6d27b8f0a352eac887281_MD5.jpg",
      },
      {
        id: "pc4",
        name: "Diavola",
        description: {
          de: "Tomatensauce, Mozzarella und scharfer Salami - feurig und intensiv",
          en: "Tomato sauce, mozzarella and hot salami - fiery and intense",
        },
        detailedDescription: {
          de: "Für Mutige: Tomatensauce, Mozzarella und pikante Salami, verfeinert mit hausgemachter Jalapeño-Marmelade. Feurig, intensiv und unvergesslich scharf - nichts für schwache Nerven.",
          en: "For the brave: tomato sauce, mozzarella and hot salami, finished with house-made jalapeño jam. Fiery, intense and unforgettably spicy - not for the faint-hearted.",
        },
        price: 15.50,
        spicy: true,
        allergens: "1a,7,13 / A,D,I",
        image: "73efb73fb3ea39ec16d3348b23083bad_MD5.jpg",
      },
      {
        id: "pc5",
        name: "Parma",
        description: {
          de: "Tomatensauce, Mozzarella und hauchdünner Parmaschinken nach dem Backen belegt",
          en: "Tomato sauce, mozzarella and paper-thin Parma ham added after baking",
        },
        detailedDescription: {
          de: "Elegante Pizza mit Tomatensauce, Mozzarella und hauchdünnem Parmaschinken - nach dem Backen belegt. Dazu frischer Rucola, Parmesanspänen und Kirschtomaten. La dolce vita auf dem Teller.",
          en: "Elegant pizza with tomato sauce, mozzarella and paper-thin Parma ham added after baking, topped with fresh rocket, parmesan shavings and cherry tomatoes. La dolce vita on a plate.",
        },
        price: 17.50,
        allergens: "1a,7,13 / A,D,I",
        image: "92f690ad514f2fb21daa1d880d06a58a_MD5.jpg",
      },
      {
        id: "pc6",
        name: "Regina",
        description: {
          de: "Tomatensauce, Mozzarella, Schinken und Champignons - die Königin der Pizzen",
          en: "Tomato sauce, mozzarella, ham and mushrooms - the queen of pizzas",
        },
        detailedDescription: {
          de: "Die Königin unter den Pizzen: Tomatensauce, Mozzarella, zarter Kochschinken und Champignons in perfekter Harmonie. Zeitlos, ausgewogen und immer befriedigend.",
          en: "The queen of pizzas: tomato sauce, mozzarella, tender cooked ham and mushrooms in perfect harmony. Timeless, balanced and always satisfying.",
        },
        price: 14.60,
        allergens: "1a,7,13 / A,D,I",
        image: "4a8983a5df270949a07f6112935ebc7d_MD5.jpg",
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
        image: "lieferando-ortolana.jpg",
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
        image: "lieferando-spinach-pizza.jpg",
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
        image: "lieferando-rocket-pizza.jpg",
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
        image: "lieferando-pizza-bufala.jpg",
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
        image: "lieferando-pizza-verde.jpg",
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
        image: "lieferando-tonno.jpg",
      },
      {
        id: "pf2",
        name: "Mare",
        description: {
          de: "Tomatensauce mit Meeresfrüchten - Garnelen, Muscheln und Tintenfisch",
          en: "Tomato sauce with seafood - prawns, mussels and squid",
        },
        price: 17.50,
        allergens: "1a,7,2,14 / A,D",
        image: "lieferando-mare.jpg",
      },
      {
        id: "pf3",
        name: "Napoli",
        description: {
          de: "Tomatensauce, Mozzarella, Anchovis, Kapern und Oregano - der Neapolitaner Klassiker",
          en: "Tomato sauce, mozzarella, anchovies, capers and oregano - the Neapolitan classic",
        },
        price: 14.50,
        allergens: "1a,7,13 / A,C,D",
        image: "lieferando-napoli.jpg",
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
        image: "lieferando-salmone.jpg",
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
        detailedDescription: {
          de: "Klassischer Calzone aus dem Ofen: gefüllt mit Tomatensauce, cremiger Mozzarella, Champignons und zarten Schinkenwürfeln. Knusprig außen, saftig und heiß innen.",
          en: "Classic oven-baked calzone filled with tomato sauce, creamy mozzarella, mushrooms and tender diced ham. Crispy outside, juicy and piping hot inside.",
        },
        price: 14.90,
        allergens: "1a,7,13 / A,D,I",
        image: "f36acd21d57fd02355b7482e46a62a81_MD5.jpg",
      },
      {
        id: "ca2",
        name: "Luna Speciale",
        description: {
          de: "Calzone-Sonderversion mit Tomatensauce, Mozzarella und einer besonderen Füllung nach Hausrezept",
          en: "Special calzone version with tomato sauce, mozzarella and a special house-recipe filling",
        },
        detailedDescription: {
          de: "Der besondere Calzone nach Hausrezept: Tomatensauce, Mozzarella, Ricotta, Salami, Schinken und Parmesan. Reichhaltig, schmelzend und unwiderstehlich befriedigend.",
          en: "The special house-recipe calzone: tomato sauce, mozzarella, ricotta, salami, ham and parmesan. Rich, melting and irresistibly satisfying.",
        },
        price: 15.60,
        allergens: "1a,7,13 / A,D",
        image: "5c93b7b434d32614dbd5f766ec547c15_MD5.jpg",
      },
      {
        id: "ca3",
        name: "Rachetta",
        description: {
          de: "Racchetta-Calzone mit Tomatensauce, Mozzarella, Rucola und Parmesan",
          en: "Racchetta calzone with tomato sauce, mozzarella, rocket and parmesan",
        },
        detailedDescription: {
          de: "Calzone ohne Tomatensauce im Inneren - stattdessen saftige Kirschtomaten, pikante Salami, Mozzarella, Ricotta, frischer Rucola und Parmesanspänen. Modern und voller Kontraste.",
          en: "Calzone without tomato sauce inside - instead juicy cherry tomatoes, spicy salami, mozzarella, ricotta, fresh rocket and parmesan shavings. Modern and full of contrast.",
        },
        price: 15.60,
        allergens: "1a,7,13 / A,C,D",
        image: "cc8310942690b24183e17ab8789f5011_MD5.jpg",
      },
      {
        id: "ca4",
        name: "Cornicione",
        description: {
          de: "Üppiger Calzone mit dickem Rand, gefüllt mit Ricotta, Schinken, Mozzarella und Tomaten",
          en: "Generous calzone with thick crust filled with ricotta, ham, mozzarella and tomatoes",
        },
        detailedDescription: {
          de: "Unser üppigster Calzone mit knusprigem, Ricotta-gefülltem Rand: innen Parmaschinken, cremige Mozzarella und frischer Rucola. Jeder Bissen ein Erlebnis - von der Mitte bis zum letzten Stück Rand.",
          en: "Our most generous calzone with a crispy ricotta-stuffed crust: inside, Parma ham, creamy mozzarella and fresh rocket. Every bite an experience - from the centre to the very last bit of crust.",
        },
        price: 16.60,
        allergens: "1a,7,13 / A,B,C,D,E,I",
        image: "0cdd337b49c9d879093a3ee34ef5fb53_MD5.jpg",
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
        detailedDescription: {
          de: "Weiße Pizza ohne Tomatensauce: cremige Mozzarella, würziger Gorgonzola, nussiger Parmesan und buttrige Ricotta, verfeinert mit karamellisierten Walnüssen. Käse-Paradies für Kenner.",
          en: "White pizza without tomato sauce: creamy mozzarella, bold gorgonzola, nutty parmesan and buttery ricotta, finished with caramelised walnuts. A cheese lover's paradise.",
        },
        price: 15.90,
        vegetarian: true,
        allergens: "1a,7,8c / A,C,D,I",
        image: "c75005bb624d65698b8a1efce6943ba4_MD5.jpg",
      },
      {
        id: "pb2",
        name: "Mortadella",
        description: {
          de: "Weiße Pizza mit Mozzarella, delikater Mortadella und einem Hauch Pistazien",
          en: "White pizza with mozzarella, delicate mortadella and a hint of pistachios",
        },
        detailedDescription: {
          de: "Weiße Pizza der Extraklasse: Mozzarella, delikate Mortadella aus Bologna, knackige Pistazien und cremige Burrata. Modern, mutig und köstlich überraschend.",
          en: "A white pizza of the highest order: mozzarella, delicate Mortadella from Bologna, crunchy pistachios and creamy burrata. Modern, bold and deliciously surprising.",
        },
        price: 16.90,
        allergens: "1a,7,8g,13 / A,C,D",
        image: "4c6930b3dbaea4a5af3967b24a93ffd9_MD5.jpg",
      },
      {
        id: "pb3",
        name: "Tartufo",
        description: {
          de: "Weiße Pizza mit Mozzarella, Trüffelcreme und Parmesan - luxuriös und aromatisch",
          en: "White pizza with mozzarella, truffle cream and parmesan - luxurious and aromatic",
        },
        detailedDescription: {
          de: "Luxuriöse weiße Pizza mit Büffelmozzarella, sautierten Pilzen, Tartufocreme aus dem Piemont, frischem Rucola und Parmesanspänen. Ein Trüffeltraum für besondere Momente.",
          en: "A luxurious white pizza with buffalo mozzarella, sautéed mushrooms, Piedmontese truffle cream, fresh rocket and parmesan shavings. A truffle dream for special moments.",
        },
        price: 17.90,
        allergens: "1a,7 / A,C,D,E,G",
        image: "ea99e50a947661713f0327e115be160d_MD5.jpg",
      },
      {
        id: "pb4",
        name: "Salsiccia Friarielli",
        description: {
          de: "Weiße Pizza mit italienischer Wurst, neapolitanischem Friarielli-Brokkoli und Mozzarella",
          en: "White pizza with Italian sausage, Neapolitan friarielli broccoli and mozzarella",
        },
        detailedDescription: {
          de: "Neapolitanisches Original: weiße Pizza mit würziger Salsiccia vom Schwein und Friarielli - dem charakteristischen Brokkolirabe der neapolitanischen Küche. Authentisch, herzhaft und unwiderstehlich.",
          en: "A Neapolitan original: white pizza with spicy pork salsiccia and friarielli - the distinctive broccoli rabe of Neapolitan cuisine. Authentic, hearty and irresistible.",
        },
        price: 16.50,
        allergens: "1a,7,13 / A,C,D,E,G",
        image: "1bd75cc9023d4a752b555f45b1589a25_MD5.jpg",
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
        name: "Tiramisu Marano - senza uova",
        description: {
          de: "Hausgemachtes Tiramisu nach Art der Trattoria Marano - ohne Eier, mit Löffelbiskuit, Espresso und Mascarpone",
          en: "Homemade tiramisu Trattoria Marano style - egg-free, with ladyfingers, espresso and mascarpone",
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
          de: "Leicht perlender Prosecco aus dem Veneto - frisch und trocken",
          en: "Lightly sparkling Prosecco from the Veneto - fresh and dry",
        },
        price: 4.70,
        vegetarian: true,
        allergens: "b",
      },
      {
        id: "bev2",
        name: "Prosecco Spumante 0.75 L",
        description: {
          de: "Vollsprudelnder Prosecco Spumante in der Flasche - ideal zum Feiern",
          en: "Fully sparkling Prosecco Spumante by the bottle - ideal for celebrations",
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
          de: "Hauswein vom Fass - rot oder weiß - ein ehrlicher Begleiter zu jedem Gericht",
          en: "House wine on tap - red or white - an honest companion to any dish",
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
          de: "Bayerisches Mineralwasser aus Adelholzen - still oder mit Kohlensäure",
          en: "Bavarian mineral water from Adelholzen - still or sparkling",
        },
        price: 4.10,
        vegetarian: true,
      },
      {
        id: "bev11",
        name: "Coca Cola / Fanta / Sprite 0.4 L",
        description: {
          de: "Erfrischende Softdrinks: Coca Cola, Fanta oder Sprite - nach Wahl",
          en: "Refreshing soft drinks: Coca Cola, Fanta or Sprite - your choice",
        },
        price: 4.90,
        vegetarian: true,
        allergens: "1,3,9",
      },
    ],
  },
]
