import { Project, ServiceItem, ProcessStep, Testimonial, StatItem, TeamMember, AwardItem, FAQItem } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'the-solarium-residence',
    title: 'The Courtyard House',
    tagline: 'A bright home with open views',
    category: 'residential',
    location: 'Kyoto Highlands',
    year: '2024',
    area: '6,800 sq.ft',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A private home on a hillside with wide forest views, warm natural light, and rooms that open up to the landscape.',
    architecturalPhilosophy: 'The home uses sunlight, fresh air flow, strong earth walls, and good glass to stay comfortable through the year.',
    materials: ['Textured Concrete', 'Charred Cedar Wood', 'Energy-Efficient Glass', 'Smooth Travertine Stone'],
    keyFeatures: ['Wide covered outdoor living area', 'Open space in the middle for fresh air', 'Rainwater stored under the ground', 'Simple lights in the ceiling'],
    award: 'AIA Excellence in Residential Architecture 2024',
    clientType: 'Private Homeowner and Plant Lover'
  },
  {
    id: 'nexus-biophilic-headquarters',
    title: 'Nexus Office Pavilions',
    tagline: 'A green, modern workplace',
    category: 'commercial',
    location: 'Singapore Eco-District',
    year: '2023',
    area: '42,000 sq.ft',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A low-energy workplace made with timber, gardens, and bright shared spaces that help people work well together.',
    architecturalPhilosophy: 'Workplaces should have fresh air, daylight, plants, and calm spaces so people can feel focused and comfortable.',
    materials: ['Engineered Timber', 'Recycled Bronze', 'Planted Outdoor Terraces', 'Strong Low-Carbon Concrete'],
    keyFeatures: ['Very low energy use', 'Open space in the middle of five floors', 'Glass that keeps out heat', 'Daylight throughout the building'],
    award: 'World Architecture Festival Future Office Winner',
    clientType: 'Climate Tech Company'
  },
  {
    id: 'atlier-monolith-penthouse',
    title: 'Lakeside Stone Penthouse',
    tagline: 'A warm, calm home by the lake',
    category: 'interior',
    location: 'Zurich Lakefront',
    year: '2024',
    area: '4,400 sq.ft',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A simple home by the lake with soft plaster walls, walnut dividers, and hidden lighting.',
    architecturalPhilosophy: 'We kept the design simple so that daylight, shadow, and the view can do the talking.',
    materials: ['French White Oak', 'Soft Limewash Plaster', 'White Marble', 'Brushed Brass'],
    keyFeatures: ['Hidden wall panels that absorb sound', 'Doors that hide inside the wall', 'One solid stone kitchen island', 'A long glass roof for extra light'],
    award: 'AD100 Best Residential Interior 2024',
    clientType: 'Private Music Conductor'
  },
  {
    id: 'satori-water-courtyard',
    title: 'Water Courtyard & Pavilion',
    tagline: 'A peaceful garden with water and stone',
    category: 'landscape',
    location: 'Carmel Valley, California',
    year: '2023',
    area: '18,500 sq.ft',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A peaceful garden where dark stone pools connect the home with native oak trees.',
    architecturalPhilosophy: 'The garden gently connects the home, the land, and the natural plants around it.',
    materials: ['Black Granite', 'Rusty Corten Steel', 'Local Drought-Tolerant Plants', 'Olive Stone Dust'],
    keyFeatures: ['A mirror-flat pool with no raised edge', 'Rusty steel walls holding back the land', 'Stepping stones under the water', 'Fine mist that cools the garden'],
    award: 'ASLA Design Honor Award',
    clientType: 'Sculptor and Environmentalist'
  },
  {
    id: 'terra-cliffside-villa',
    title: 'Terra Cliffside Villa',
    tagline: 'A simple villa in warm earth colours',
    category: 'residential',
    location: 'Santorini Coastline',
    year: '2024',
    area: '5,200 sq.ft',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A warm terracotta villa built into a coastal cliff, inspired by local Mediterranean homes.',
    architecturalPhilosophy: 'Building into the rock helps keep the home cooler and uses much less energy.',
    materials: ['Terracotta Lime Stucco', 'Local Volcanic Stone', 'Light Chestnut Timber', 'Hand-Forged Iron'],
    keyFeatures: ['Cool wine cellar under the ground', 'Sunken courtyard away from the wind', 'Shade beams over the terrace', 'Wide open sea view'],
    award: 'Mediterranean Architectural Prize 2024',
    clientType: 'Private Winery Owner'
  },
  {
    id: 'kavala-sustainable-sanctuary',
    title: 'Kavala Eco Estate',
    tagline: 'A comfortable home that uses less energy',
    category: 'sustainable',
    location: 'British Columbia Forest',
    year: '2023',
    area: '7,100 sq.ft',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    blueprintImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A timber home made with local wood that creates more energy than it uses, with heating from the ground.',
    architecturalPhilosophy: 'A truly comfortable home should be quiet, fresh, energy-efficient, and gentle on the environment.',
    materials: ['Cross-Laminated Timber (CLT)', 'Safe Natural Wool Insulation', 'Zinc Roof', 'Polished Terrazzo'],
    keyFeatures: ['Certified very low energy use', 'Heating taken from the ground', 'Three layers of glass in every window', 'Batteries that store extra power'],
    award: 'Global Green Building Council Exemplary Award',
    clientType: 'Tech Company Owner'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'architectural-design',
    number: '01',
    title: 'Architectural Design',
    tagline: 'Plans that look good and work well every day',
    description: 'We take care of your building design from early ideas and floor plans to approvals and work on site.',
    iconName: 'Building2',
    deliverables: [
      'Site check and sunlight study',
      '3D design ideas and space planning',
      'Engineering and approval drawings',
      'Clear drawings and material details'
    ],
    badge: 'Building Design',
    highlightStat: '150+ Buildings Done'
  },
  {
    id: 'interior-design',
    number: '02',
    title: 'Interior Design',
    tagline: 'Comfortable rooms with a clear style',
    description: 'We design rooms, furniture, lighting, and finishes that feel good and work well for your day-to-day life.',
    iconName: 'Compass',
    deliverables: [
      'Custom cabinets and woodwork',
      'Lighting plans for day and night',
      'Material and finish choices',
      'Help choosing art and furniture'
    ],
    badge: 'Inside Design',
    highlightStat: '99.4% Happy Clients'
  },
  {
    id: 'landscape-design',
    number: '03',
    title: 'Landscape Design',
    tagline: 'Outdoor spaces that feel alive',
    description: 'We create gardens, courtyards, and outdoor areas that suit your home, local weather, and the changing seasons.',
    iconName: 'Trees',
    deliverables: [
      'Ground levels and water drainage',
      'Local plants that need less water',
      'Paths, patios, and water features',
      'Outdoor lighting'
    ],
    badge: 'Garden Design',
    highlightStat: '100% Local Plants'
  },
  {
    id: 'sustainable-renovation',
    number: '04',
    title: 'Renovation & Upgrades',
    tagline: 'Keep what matters, improve what you need',
    description: 'We update existing homes and buildings while keeping their character and making them more comfortable and energy-efficient.',
    iconName: 'Layers',
    deliverables: [
      'Building condition checks',
      'Better insulation and windows',
      'Improved room layouts',
      'Materials that cause less harm'
    ],
    badge: 'Renovation',
    highlightStat: '60% Less Carbon'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 'Step 01',
    title: 'Getting to Know You',
    duration: 'Weeks 1 to 3',
    description: 'We learn about your needs, budget, site, sunlight, wind, and local building rules.',
    deliverables: ['Your needs and priorities', 'Sun and wind study', 'Check of local building rules'],
    iconName: 'Search'
  },
  {
    step: 'Step 02',
    title: 'Plans and Early Designs',
    duration: 'Weeks 4 to 7',
    description: 'We turn your ideas into early floor plans and 3D views so you can see the layout, light, and views.',
    deliverables: ['Early floor plans', 'Building views and sections', 'First material ideas'],
    iconName: 'PenTool'
  },
  {
    step: 'Step 03',
    title: '3D Views and Materials',
    duration: 'Weeks 8 to 11',
    description: 'We make realistic 3D views, study sunlight, and share material samples before building starts.',
    deliverables: ['3D walkthrough videos', 'Material samples', 'Day and evening light studies'],
    iconName: 'Box'
  },
  {
    step: 'Step 04',
    title: 'Engineering and Approvals',
    duration: 'Weeks 12 to 16',
    description: 'We prepare the engineering details and drawings needed for local approvals and for builders to price the work.',
    deliverables: ['Approval drawings', 'Engineering details', 'Builder pricing package'],
    iconName: 'FileCheck'
  },
  {
    step: 'Step 05',
    title: 'Building Support',
    duration: 'During Construction',
    description: 'We visit the site regularly, answer questions, check the work, and support you until the project is ready.',
    deliverables: ['Weekly site updates', 'Quality checks', 'Final handover'],
    iconName: 'KeyRound'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Careful Design',
    subtitle: 'Made for real life',
    description: 'We plan every doorway, room, and window for comfort and easy daily use. We choose lasting ideas over short-lived trends.',
    iconName: 'Sparkles',
    stats: 'No wasted corridors'
  },
  {
    title: 'Easy-to-Use Rooms',
    subtitle: 'Simple to move through',
    description: 'Rooms should make daily life easier. We create a natural flow between private areas and spaces for family and guests.',
    iconName: 'Maximize2',
    stats: 'Daylight in every room'
  },
  {
    title: 'Looks Good for Years',
    subtitle: 'Materials made to last',
    description: 'We use real materials like raw stone, solid timber, and brushed bronze. They look better as they get older instead of wearing out.',
    iconName: 'ShieldCheck',
    stats: 'Built for 100+ years'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus & Elena Vance',
    role: 'Homeowners',
    project: 'The Courtyard House',
    location: 'Kyoto / San Francisco',
    quote: 'AALAYA AS STUDIOS did not just design a house. They gave a shape to how we wanted to feel every morning. Watching the sunrise come through the living room is pure joy.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    projectThumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-2',
    name: 'Dr. Alistair Sterling',
    role: 'Managing Director, Sterling BioTech',
    project: 'Nexus Office Pavilions',
    location: 'Singapore',
    quote: 'The design changed how our office feels. After six months in the new timber building, our staff reported much better focus and energy at work.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    projectThumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-3',
    name: 'Sophia Laurent',
    role: 'Philanthropist',
    project: 'Lakeside Stone Penthouse',
    location: 'Zurich Lakefront',
    quote: 'Their care with sound and detail is something I have not seen anywhere in Europe. Sitting in the living room looking out over the water, everything is calm and quiet.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    projectThumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80'
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: 'stat-years',
    numericValue: 18,
    suffix: '+',
    label: 'Years of Practice',
    detail: 'Design work in 14 countries'
  },
  {
    id: 'stat-projects',
    numericValue: 154,
    suffix: '',
    label: 'Completed Projects',
    detail: 'Homes, workplaces, and outdoor spaces'
  },
  {
    id: 'stat-awards',
    numericValue: 26,
    suffix: '',
    label: 'Design Awards',
    detail: 'Awards from AIA, World Architecture Festival, and AD100'
  },
  {
    id: 'stat-sustainability',
    numericValue: 100,
    suffix: '%',
    label: 'Earth-Friendly Design',
    detail: 'Energy-saving ideas in every project'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Ar. Ananya S. Rao',
    role: 'Founder and Lead Architect',
    credentials: 'B.Arch, M.Arch (Harvard GSD), AIA, IIA',
    bio: 'With over 18 years of experience, Ananya brings together bold ideas, careful planning, and a calm design approach.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    specialty: 'Open layouts and structural design'
  },
  {
    name: 'Julian Thorne',
    role: 'Design Director and Partner',
    credentials: 'RIBA, AA School of Architecture London',
    bio: 'Specialist in timber details and low-energy building systems.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    specialty: 'Energy-saving building walls'
  },
  {
    name: 'Mei-Ling Chen',
    role: 'Head of Interior Design',
    credentials: 'Politecnico di Milano, IIDA',
    bio: 'Designs comfortable rooms with thoughtful lighting, materials, and sound control.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    specialty: 'Custom woodwork and lighting'
  }
];

export const AWARDS_DATA: AwardItem[] = [
  {
    year: '2024',
    title: 'AIA National Architecture Honor Award',
    body: 'American Institute of Architects',
    project: 'The Courtyard House'
  },
  {
    year: '2023',
    title: 'World Architecture Festival: Future Office Winner',
    body: 'WAF Singapore',
    project: 'Nexus Office Pavilions'
  },
  {
    year: '2023',
    title: 'Architectural Digest AD100 Award for Best Craft',
    body: 'Condé Nast International',
    project: 'Lakeside Stone Penthouse'
  },
  {
    year: '2022',
    title: 'Holcim Award for Sustainable Construction',
    body: 'Holcim Foundation Switzerland',
    project: 'Kavala Eco Estate'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Process',
    question: 'How do you start a new project?',
    answer: 'First, we talk about how you live, what rooms you need, and your budget. We also study the site, sunlight, wind, and noise before we begin the design.'
  },
  {
    id: 'faq-2',
    category: 'Location',
    question: 'Do you work outside your main cities?',
    answer: 'Yes. We work on projects in many locations. We use online meetings and detailed digital models, and work with trusted local engineers when needed.'
  },
  {
    id: 'faq-3',
    category: 'Sustainability',
    question: 'How do you make a project more eco-friendly?',
    answer: 'We use sunlight, shade, fresh air flow, good insulation, and durable materials to reduce energy use and waste.'
  },
  {
    id: 'faq-4',
    category: 'Budget',
    question: 'How do you keep the cost under control?',
    answer: 'We agree the budget early, update it as the design develops, and prepare clear drawings before builders give their prices. This helps avoid surprise costs.'
  },
  {
    id: 'faq-5',
    category: 'Timeline',
    question: 'How long does a project usually take?',
    answer: 'Most homes need 4 to 6 months for design and approvals, then 12 to 18 months to build. The exact time depends on the size and location of the project.'
  }
];
