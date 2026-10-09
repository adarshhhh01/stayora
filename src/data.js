export const hotel = {
  name: 'stayora',
  eyebrow: 'A BOUTIQUE STAY EXPERIENCE',
  headline: 'Stay somewhere extraordinary.',
  description: 'Slow mornings, thoughtful details, and a little more room to breathe. Your next favourite escape starts here.',
  city: 'Jabalpur, Madhya Pradesh',
  address: 'Add the hotel’s full address here, Jabalpur, Madhya Pradesh',
  phone: '+91 98765 43210',
  email: 'hello@example.com',
  // Replace this placeholder with the hotel’s real WhatsApp number.
  whatsapp: import.meta.env.VITE_HOTEL_WHATSAPP || '919876543210',
  mapUrl: 'https://maps.google.com/?q=Jabalpur+Madhya+Pradesh',
  checkIn: '2:00 PM',
  checkOut: '11:00 AM',
}

export const rooms = [
  {
    id: 'standard',
    name: 'The Essential',
    type: 'STANDARD ROOM',
    price: 2499,
    size: '220 sq ft',
    occupancy: '2 guests',
    bed: 'Queen bed',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1100&q=85',
    description: 'A calm, comfortable retreat with considered details and everything you need to unwind after a day out.',
    amenities: ['Wi-Fi', 'Air conditioning', 'Smart TV', 'Work desk'],
    color: 'mint',
  },
  {
    id: 'deluxe',
    name: 'The Deluxe',
    type: 'MOST LOVED',
    price: 3499,
    size: '310 sq ft',
    occupancy: '2–3 guests',
    bed: 'King bed',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1100&q=85',
    description: 'More space to stretch out, softer textures, warm light and a little extra comfort for a special stay.',
    amenities: ['Wi-Fi', 'King bed', 'Rain shower', 'Tea & coffee'],
    color: 'peach',
  },
  {
    id: 'suite',
    name: 'The Suite Life',
    type: 'EXTRA ROOM TO BREATHE',
    price: 5499,
    size: '460 sq ft',
    occupancy: '2–4 guests',
    bed: 'King bed + lounge',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1100&q=85',
    description: 'A spacious suite for longer stays, unhurried evenings and trips worth celebrating.',
    amenities: ['Separate lounge', 'Premium toiletries', 'Mini fridge', 'Room service*'],
    color: 'blue',
  },
]

export const experiences = [
  {
    number: '01',
    title: 'Good food, good mood.',
    description: 'Make time for slow breakfasts, satisfying favourites and memorable meals.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85',
    tag: 'DINE & UNWIND',
    color: 'coral',
  },
  {
    number: '02',
    title: 'Little moments of calm.',
    description: 'Thoughtful spaces that help you pause, reset and enjoy the moment.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85',
    tag: 'REST & RECHARGE',
    color: 'sunshine',
  },
  {
    number: '03',
    title: 'A stay made for you.',
    description: 'Whether it is a family break or a quick city visit, make it your own.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=85',
    tag: 'MAKE MEMORIES',
    color: 'mint',
  },
]

export const reviews = [
  {
    quote: 'A lovely, comfortable stay with warm hospitality. The room was clean and the whole experience felt easy.',
    name: 'A happy guest',
    context: 'SAMPLE REVIEW — REPLACE BEFORE LAUNCH',
  },
  {
    quote: 'Thoughtful details, a relaxing atmosphere and a smooth enquiry experience from the very beginning.',
    name: 'A returning traveller',
    context: 'SAMPLE REVIEW — REPLACE BEFORE LAUNCH',
  },
  {
    quote: 'A great base for a city break. The room felt welcoming and the team made planning simple.',
    name: 'A weekend visitor',
    context: 'SAMPLE REVIEW — REPLACE BEFORE LAUNCH',
  },
]
