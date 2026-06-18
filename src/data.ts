import { Service, Dentist, Review, DentalConcern } from './types.ts';

export const SERVICES: Service[] = [
  {
    id: 'porcelain-veneers',
    title: 'Porcelain Veneers',
    description: 'Ultra-thin, artisan-crafted porcelain shells meticulously bonded to transform your smile structure.',
    benefits: [
      'Individually sculpted for maximum aesthetic harmony',
      'Extremely resistant to future stains or discoloration',
      'Corrects chips, minor cracks, gaps, and severe discoloration',
      'Requires minimal alteration of natural tooth enamel'
    ],
    duration: '2 appointments (7-10 days apart)',
    estimatedFee: 'From $1,800 / tooth',
    category: 'cosmetic',
    longDescription: 'Our signature Porcelain Veneers combine medical-grade beauty with personal customization. Made from the finest ceramics, each shell is designed by our master ceramists to mimic the natural translucency and light-reflective qualities of pristine enamel.'
  },
  {
    id: 'laser-whitening',
    title: 'Atelier Zoom Whitening',
    description: 'In-office clinical lasers paired with exclusive gel for immediate, dramatic whitening results.',
    benefits: [
      'Up to 8 shades lighter in a single 60-minute session',
      'Advanced laser-activation technique decreases sensitivity',
      'Includes custom-molded take-home maintenance trays',
      'Supervised clinical precision ensures absolute gum safety'
    ],
    duration: '60 - 75 minutes',
    estimatedFee: 'From $650 / session',
    category: 'cosmetic',
    longDescription: 'Harnessing low-sensitivity cold sapphire laser light, our Atelier Whitening dissolves deep internal discolored pigments. Escape yellowing and tooth staining in a relaxing oasis, while watching your favorite show with premium noise-canceling headphones.'
  },
  {
    id: 'dental-implants',
    title: 'Elite Dental Implants',
    description: 'State-of-the-art titanium implants to replace missing roots, topped with hand-finished zirconia crowns.',
    benefits: [
      'Fully restores mastication capability and structural support',
      'Prevents post-extraction bone erosion & jawline sinking',
      'Crafted to integrate flawlessly with surrounding natural teeth',
      'Lifetime structural warranty on implant integrity'
    ],
    duration: 'Multi-stage specialist process (3-6 months)',
    estimatedFee: 'From $3,200 total',
    category: 'restorative',
    longDescription: 'Replacing missing teeth shouldn’t compromise your existing anatomy. Our computer-guided implants provide a permanent titanium root structure that integrates biologically into the bone. Finished with an exquisite ceramic crown, it yields indistinguishable biting power and elegance.'
  },
  {
    id: 'aesthetic-crowns',
    title: 'Aesthetic Crowns & Inlays',
    description: 'Bespoke, non-metal dental restorations designed with 3D scanners to perfectly overlay damaged teeth.',
    benefits: [
      '100% metal-free, high-translucency ceramic formulations',
      'Ultra-precise border fittings prevent bacteria recurrence',
      'Preserves and reinforces fracture-vulnerable structures',
      'Perfect color-matching with your surrounding natural shade'
    ],
    duration: '1 - 2 appointments',
    estimatedFee: 'From $1,250 / tooth',
    category: 'restorative',
    longDescription: 'Say goodbye to unsightly dark borders from historical metallic crowns. Our premium crowns are made of reinforced lithium disilicate or premium zirconia. Designed via 3D intraoral scans, they guarantee a snug fit that feels exactly like a natural, vibrant tooth.'
  },
  {
    id: 'elite-cleaning',
    title: 'Therapeutic Wellness Hygiene',
    description: 'An elevated, pain-free hygiene routine using modern AirFlow® thermal technology.',
    benefits: [
      'Warm temperature-regulated streams prevent thermal sensitivity',
      'Air-polishing micro-powders remove stubborn coffee & tea residue',
      'Comprehensive periodontal screening with mini-intraoral camera',
      'Application of organic protective minerals and enamel sealants'
    ],
    duration: '45 - 60 minutes',
    estimatedFee: '$190 - $280',
    category: 'preventive',
    longDescription: 'Hygiene is the foundation of cosmetic excellence. We’ve reinvented the standard, often-painful cleaning by introducing AirFlow® technology. Gentle micro-streams of warmed water, air, and fine erythritol powder remove plaque bio-films efficiently and completely without metal scraping.'
  },
  {
    id: 'oral-health-check',
    title: 'Ivory Biomimetic Exam',
    description: 'A meticulous mapping of your biological smile health, low-dose 3D CT diagnostics, and oral cancer scans.',
    benefits: [
      'Generates a comprehensive digital duplicate of your jaw bone',
      'Early detection of invisible micro-cavities & pathoses',
      'Full lifestyle, postural, and dietary dental analysis',
      'Includes immediate visual smile design mockup'
    ],
    duration: '60 minutes',
    estimatedFee: '$150 (Included for new client consultations)',
    category: 'preventive',
    longDescription: 'We look far beyond teeth to understand your holistic oral environment. Our biomimetic examination utilizes high-definition microscopes and ultra-low dose digital radiography to inspect muscle tension, saliva balance, joint mechanics, and gum elasticity.'
  },
  {
    id: 'invisalign-precision',
    title: 'Invisalign® Smile Architecture',
    description: 'Invisible, clear alignment trays designed to correct bites and orchestrate cinematic symmetry.',
    benefits: [
      'Virtual 3D preview of your entire tooth trajectory beforehand',
      'Completely removable for eating, drinking, and effortless hygiene',
      'Fewer in-clinic visits than traditional metal brackets',
      'Orchestrates perfect vertical alignment and wider arch profiles'
    ],
    duration: '6 - 18 months',
    estimatedFee: 'From $4,500 total',
    category: 'orthodontics',
    longDescription: 'Unleash your symmetrical perfect smile without the visual clutter of braces. Aligners utilize progressive digital increments calibrated by computer simulation to apply microscopic pressure, shifting teeth safely and painlessly into perfect clinical orientation.'
  }
];

export const DENTISTS: Dentist[] = [
  {
    id: 'dr-amelia-thorne',
    name: 'Dr. Amelia Thorne, DDS',
    role: 'Clinical Co-Founder',
    credentials: 'DDS, Columbia University School of Dental Medicine',
    specialty: 'Aesthetic Rehabilitation & Veneer Artistry',
    education: [
      'Doctor of Dental Surgery, Columbia University (Honors)',
      'Residency in Advanced Aesthetic Dentistry, New York University',
      'Fellow of the American Academy of Cosmetic Dentistry (AACD)'
    ],
    bio: 'Dr. Thorne has spent over fifteen years perfecting the art of minimal-prep porcelain veneers and full-mouth aesthetic reconstructions. By blending medical biology with three-dimensional physical sculpture, she designs unique smiles that align with individual facial geometry.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'dr-marcus-vance',
    name: 'Dr. Marcus Vance, DDS, MS',
    role: 'Restorative Specialist',
    credentials: 'DDS, University of Pennsylvania | MS in Prosthodontics, Tufts',
    specialty: 'Dental Implants, Bone Grafting & Rehabilitative Biomimetics',
    education: [
      'Doctor of Dental Surgery, University of Pennsylvania',
      'Master of Dental Science & Prosthodontics Specialty, Tufts University',
      'Diplomate of the International Congress of Oral Implantologists'
    ],
    bio: 'Dedicated to bone conservation and structural integrity, Dr. Vance integrates digital guided-implant surgery to restore complete systemic chewing power. Inside the clinic, he is celebrated for his calming, technical clarity and pain-free clinical approaches.',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

export const CONCERNS: DentalConcern[] = [
  {
    id: 'discolored-teeth',
    title: 'Discolored or Stained Teeth',
    description: 'Seeking a vibrant, brighter color profile to reverse aging, tea, coffee, or modern dietary staining.',
    recommendedServiceIds: ['laser-whitening', 'porcelain-veneers', 'elite-cleaning']
  },
  {
    id: 'crooked-teeth',
    title: 'Misalignment or Crowding',
    description: 'Looking to correct minor crowding, gaps, overlapping teeth, or a slightly asymmetrical bite layout.',
    recommendedServiceIds: ['invisalign-precision', 'porcelain-veneers']
  },
  {
    id: 'missing-teeth',
    title: 'Missing or Badly Dilapidated Teeth',
    description: 'Need to replace empty gaps, extract decayed roots, or overlay heavily cracked or structurally compromised teeth.',
    recommendedServiceIds: ['dental-implants', 'aesthetic-crowns']
  },
  {
    id: 'wellness-routine',
    title: 'Comprehensive Preventive Wellness',
    description: 'Hoping to secure teeth longevity, eliminate bleeding gums, receive digital exam diagnostics and optimal hygiene.',
    recommendedServiceIds: ['elite-cleaning', 'oral-health-check']
  },
  {
    id: 'complete-makeover',
    title: 'Full-Smile Aesthetic Overhaul',
    description: 'Desiring to redesign the entire height, color, balance, and width projection of your visible tooth envelope.',
    recommendedServiceIds: ['porcelain-veneers', 'invisalign-precision', 'laser-whitening']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Eleanor Sterling',
    rating: 5,
    text: 'Visiting Ivory Dental Clinic felt less like a medical appointment and more like stepping into a serene wellness haven. Dr. Thorne completed my porcelain veneers with staggering precision—she matches natural light reflections flawlessly. I actually looked forward to my visits.',
    date: 'April 12, 2026',
    treatment: 'Porcelain Veneers',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Julian Croft',
    rating: 5,
    text: 'Dr. Vance completed my first dental implant. I was terrified of pain, but the guidance scan and computer-guided placement were totally painless. The aesthetic zirconia crown feels identical to, if not better than, my neighbouring natural teeth. Highly professional clinic!',
    date: 'May 28, 2026',
    treatment: 'Dental Implants',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Sasha Montgomery',
    rating: 5,
    text: 'The warm AirFlow water stream cleaning is an absolute game-changer. Standard ultrasonic scrapers used to trigger sharp tooth sensitivity, but this warmth technique didn’t hurt at all! My stains from espresso were completely polished out. Absolute gold standard.',
    date: 'June 02, 2026',
    treatment: 'AirFlow Wellness Hygiene',
    verified: true
  }
];

export const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM'
];
