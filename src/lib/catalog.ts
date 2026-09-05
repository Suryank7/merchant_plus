export interface Product {
  id: string;
  name: string;
  category: 'Footwear' | 'Apparel' | 'Electronics' | 'Accessories';
  price: number; // in INR
  originalPrice: number;
  marginPct: number; // e.g. 48% margin
  stock: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  badge?: string;
  specs: Record<string, string>;
  image: string;
}

export const CATALOG_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'AeroGlide Pro Trail Running Shoes',
    category: 'Footwear',
    price: 4999,
    originalPrice: 6999,
    marginPct: 48,
    stock: 24,
    rating: 4.8,
    reviewsCount: 342,
    description: 'Engineered for rugged terrain with carbon-infused midsole and hydrophobic mesh upper.',
    features: ['Carbon plate stabilization', 'Hydrophobic ripstop upper', 'Vibram Megagrip lug outsole', 'Ultralight 240g'],
    badge: 'Best Seller',
    specs: { Weight: '240g', Drop: '6mm', Cushioning: 'High Responsiveness', Waterproof: 'IPX-5 Rated' },
    image: '👟',
  },
  {
    id: 'prod-002',
    name: 'Merino Wool Performance Hoodie',
    category: 'Apparel',
    price: 3499,
    originalPrice: 4499,
    marginPct: 52,
    stock: 18,
    rating: 4.9,
    reviewsCount: 189,
    description: '100% natural 220 GSM Australian merino wool with anti-microbial odor resistance and 4-way stretch.',
    features: ['100% Australian Merino Wool', 'Odor-neutralizing keratin fiber', 'Concealed security pocket', 'Flatlock anti-chafing seams'],
    badge: 'High Margin',
    specs: { Fabric: '220 GSM Merino', Fit: 'Athletic Tapered', Care: 'Cold Machine Wash', Thermal: 'Adaptive Regulating' },
    image: '🧥',
  },
  {
    id: 'prod-003',
    name: 'AcousticPulse ANC Wireless Earbuds',
    category: 'Electronics',
    price: 6499,
    originalPrice: 8999,
    marginPct: 38,
    stock: 12,
    rating: 4.7,
    reviewsCount: 512,
    description: 'Hybrid 42dB Active Noise Cancellation with beryllium acoustic drivers and LDAC lossless Bluetooth audio.',
    features: ['42dB Hybrid ANC', 'Lossless LDAC & aptX HD', '36h total battery with Qi wireless case', 'Quad beamforming mics with ENC'],
    badge: 'Trending',
    specs: { ANC: '42dB Hybrid', Driver: '10mm Beryllium', Latency: '38ms Gaming Mode', Battery: '8h + 28h Case' },
    image: '🎧',
  },
  {
    id: 'prod-004',
    name: 'Titanium Minimalist EDC Chronograph',
    category: 'Accessories',
    price: 8999,
    originalPrice: 11999,
    marginPct: 58,
    stock: 7,
    rating: 4.9,
    reviewsCount: 94,
    description: 'Grade-5 aerospace titanium case with scratch-proof sapphire crystal and Japanese Mecha-Quartz movement.',
    features: ['Grade-5 Titanium Body', 'Sapphire crystal glass with AR coating', '100m Water Resistance', 'Horween full-grain leather strap'],
    badge: 'Limited Edition',
    specs: { Material: 'Grade 5 Titanium', Movement: 'VK64 Meca-Quartz', Glass: 'Double-domed Sapphire', WaterResistance: '10 ATM' },
    image: '⌚',
  },
  {
    id: 'prod-005',
    name: 'UrbanDry Waterproof Commuter Backpack 24L',
    category: 'Accessories',
    price: 2999,
    originalPrice: 3999,
    marginPct: 44,
    stock: 31,
    rating: 4.6,
    reviewsCount: 278,
    description: 'Cordura 500D waterproof fabric with dedicated 16-inch suspended laptop vault and magnetic Fidlock buckles.',
    features: ['Cordura 500D ballistic nylon', 'YKK Aquaguard taped zippers', '16" padded laptop suspension', 'Ergonomic EVA back channel'],
    badge: 'Popular',
    specs: { Volume: '24 Liters', Weight: '780g', LaptopSleeve: 'Fits 16" MacBook Pro', Waterproof: 'Full Taped Seams' },
    image: '🎒',
  },
  {
    id: 'prod-006',
    name: 'HyperBreeze Featherlight Running Tee',
    category: 'Apparel',
    price: 1499,
    originalPrice: 1999,
    marginPct: 60,
    stock: 45,
    rating: 4.8,
    reviewsCount: 420,
    description: 'Ultra-aerated micro-perforated polyester with SilverPlus antibacterial ions for zero sweat cling.',
    features: ['85g Featherlight micro-mesh', 'SilverPlus antimicrobial treatment', 'Reflective 360° nocturnal piping', 'Bonded seamless hem'],
    badge: 'High Margin',
    specs: { Weight: '85g', Fabric: 'Poly-Elastane Micro-Pore', UVProtection: 'UPF 50+', Fit: 'Active Slim' },
    image: '👕',
  },
];
