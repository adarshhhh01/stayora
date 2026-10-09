import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown,
  Clock3, Coffee, Heart, MapPin, Menu, MessageCircle, Minus, Plus, ShieldCheck,
  Sparkles, Star, Users, Wifi, Wind, X, BedDouble, Bath, Utensils, Waves,
} from 'lucide-react'
import { hotel, rooms, experiences, reviews } from './data'

gsap.registerPlugin(ScrollTrigger)

const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
const today = () => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}
const tomorrow = () => {
  const date = new Date(`${today()}T12:00:00`)
  date.setDate(date.getDate() + 1)
  return date.toISOString().slice(0, 10)
}

function SectionLabel({ children, light = false }) {
  return <div className={`section-label ${light ? 'section-label-light' : ''}`}><span />{children}</div>
}

function EnquiryForm({ initialRoom = '', onClose, compact = false }) {
  const [form, setForm] = useState({
    checkIn: today(), checkOut: tomorrow(), adults: 2, children: 0, roomCount: 1,
    room: initialRoom || rooms[1].name, budget: 'Flexible', name: '', phone: '', email: '', requests: '',
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [reviewStep, setReviewStep] = useState(false)
  const update = (key, value) => setForm((old) => ({ ...old, [key]: value }))
  const nights = Math.max(1, Math.round((new Date(`${form.checkOut}T12:00:00`) - new Date(`${form.checkIn}T12:00:00`)) / 86400000))
  const validate = () => {
    const next = {}
    if (!form.checkIn || form.checkIn < today()) next.checkIn = 'Choose a valid check-in date.'
    if (!form.checkOut || form.checkOut <= form.checkIn) next.checkOut = 'Check-out must be after check-in.'
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^\+?[0-9\s()-]{8,20}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
    setErrors(next)
    return Object.keys(next).length === 0
  }
  const message = [
    `Hello ${hotel.name}, I would like to enquire about a stay.`,
    '', `Name: ${form.name}`, `Phone: ${form.phone}`, form.email && `Email: ${form.email}`,
    `Check-in: ${form.checkIn}`, `Check-out: ${form.checkOut}`, `Duration: ${nights} night(s)`,
    `Guests: ${form.adults} adult(s), ${form.children} child(ren)`,
    `Rooms: ${form.roomCount}`, `Preferred room: ${form.room}`, `Budget: ${form.budget}`,
    form.requests && `Special requests: ${form.requests}`,
    '', 'Please confirm availability and the final price. I understand this is an enquiry, not a confirmed reservation.',
  ].filter(Boolean).join('\n')
  const submit = () => {
    if (!validate()) return
    const url = `https://wa.me/${hotel.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  if (sent) return (
    <div className="success-panel">
      <div className="success-icon"><Check size={30} /></div>
      <SectionLabel>YOU’RE ONE STEP CLOSER</SectionLabel>
      <h3>Enquiry ready to send.</h3>
      <p>WhatsApp should open with your stay details. Send the message to contact the hotel. Your stay is not confirmed until the hotel replies.</p>
      <button className="btn btn-dark" onClick={() => { setSent(false); setReviewStep(false); onClose?.() }}>Done <ArrowRight size={16} /></button>
    </div>
  )

  return (
    <div className={`enquiry-form ${compact ? 'enquiry-form-compact' : ''}`}>
      <div className="form-heading">
        <div><span className="tiny-kicker">{reviewStep ? 'STEP 02 / 02' : 'LET’S PLAN YOUR STAY'}</span><h3>{reviewStep ? 'Where can we reach you?' : 'Find your kind of stay.'}</h3></div>
        {onClose && <button className="icon-btn" aria-label="Close enquiry form" onClick={onClose}><X size={20} /></button>}
      </div>
      {!reviewStep ? <>
        <div className="field-grid">
          <label className="field"><span><CalendarDays size={15} /> Check-in</span><input type="date" min={today()} value={form.checkIn} onChange={(e) => update('checkIn', e.target.value)} />{errors.checkIn && <small>{errors.checkIn}</small>}</label>
          <label className="field"><span><CalendarDays size={15} /> Check-out</span><input type="date" min={form.checkIn || today()} value={form.checkOut} onChange={(e) => update('checkOut', e.target.value)} />{errors.checkOut && <small>{errors.checkOut}</small>}</label>
        </div>
        <div className="counter-grid">
          {[['Adults', 'adults', 1, 12], ['Children', 'children', 0, 8], ['Rooms', 'roomCount', 1, 6]].map(([label, key, min, max]) => (
            <div className="counter" key={key}><span>{label}</span><div><button type="button" aria-label={`Decrease ${label}`} onClick={() => update(key, Math.max(min, form[key] - 1))}><Minus size={13} /></button><b>{form[key]}</b><button type="button" aria-label={`Increase ${label}`} onClick={() => update(key, Math.min(max, form[key] + 1))}><Plus size={13} /></button></div></div>
          ))}
        </div>
        <div className="field-grid">
          <label className="field"><span><BedDouble size={15} /> Room preference</span><select value={form.room} onChange={(e) => update('room', e.target.value)}>{rooms.map((room) => <option key={room.id}>{room.name}</option>)}<option>Any available room</option></select></label>
          <label className="field"><span>Budget / room / night</span><select value={form.budget} onChange={(e) => update('budget', e.target.value)}><option>Flexible</option><option>Below ₹3,000</option><option>₹3,000–₹5,000</option><option>Above ₹5,000</option></select></label>
        </div>
        <div className="mini-summary"><span>{nights} night{nights !== 1 ? 's' : ''} · {form.adults + form.children} guest{form.adults + form.children !== 1 ? 's' : ''} · {form.roomCount} room{form.roomCount !== 1 ? 's' : ''}</span><span>Enquiry only <ArrowUpRight size={14} /></span></div>
        <button className="btn btn-primary btn-full" onClick={() => { if (form.checkOut <= form.checkIn) setErrors({ checkOut: 'Check-out must be after check-in.' }); else { setErrors({}); setReviewStep(true) } }}>Add your details <ArrowRight size={17} /></button>
      </> : <>
        <div className="field-grid">
          <label className="field field-wide"><span>Full name *</span><input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />{errors.name && <small>{errors.name}</small>}</label>
          <label className="field field-wide"><span>Mobile number *</span><input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" />{errors.phone && <small>{errors.phone}</small>}</label>
          <label className="field field-wide"><span>Email (optional)</span><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />{errors.email && <small>{errors.email}</small>}</label>
          <label className="field field-wide"><span>Special requests (optional)</span><textarea rows="3" value={form.requests} onChange={(e) => update('requests', e.target.value)} placeholder="Early check-in, extra bed, celebration..." /></label>
        </div>
        <div className="summary-box"><b>Your stay at a glance</b><p>{form.checkIn} → {form.checkOut} · {nights} night(s)</p><p>{form.adults} adult(s), {form.children} child(ren) · {form.roomCount} room(s)</p><p>{form.room} · {form.budget}</p></div>
        <div className="form-actions"><button className="btn btn-ghost" onClick={() => setReviewStep(false)}>Back</button><button className="btn btn-primary" onClick={submit}>Continue on WhatsApp <MessageCircle size={16} /></button></div>
        <p className="privacy-note"><ShieldCheck size={14} /> No payment is collected. The hotel must confirm availability and final pricing.</p>
      </>}
    </div>
  )
}

function RoomModal({ room, onClose, onEnquire }) {
  useEffect(() => {
    if (!room) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [room, onClose])
  if (!room) return null
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="room-modal" role="dialog" aria-modal="true" aria-label={`${room.name} details`}>
      <button className="modal-close icon-btn" aria-label="Close room details" onClick={onClose}><X /></button>
      <img src={room.image} alt={`${room.name} hotel room`} />
      <div className="room-modal-content"><SectionLabel>{room.type}</SectionLabel><h2>{room.name}</h2><p>{room.description}</p><div className="room-facts"><span><Users size={16} /> {room.occupancy}</span><span><BedDouble size={16} /> {room.bed}</span><span><Sparkles size={16} /> {room.size}</span></div><div className="amenity-list">{room.amenities.map((item) => <span key={item}><Check size={14} /> {item}</span>)}</div><div className="modal-bottom"><div><small>Indicative starting price</small><strong>{money(room.price)}<small> / night</small></strong></div><button className="btn btn-primary" onClick={() => onEnquire(room.name)}>Enquire about this room <ArrowRight size={16} /></button></div><p className="fine-print">Sample prices for demonstration. Final rates and availability are confirmed by the hotel.</p></div>
    </div>
  </div>
}

function App() {
  const root = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [initialRoom, setInitialRoom] = useState('')
  const [activeFaq, setActiveFaq] = useState(0)

  const openEnquiry = (roomName = '') => {
    setInitialRoom(roomName)
    setSelectedRoom(null)
    setEnquiryOpen(true)
    setMenuOpen(false)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.nav-inner', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' })
      gsap.from('.hero-kicker, .hero-title-line, .hero-copy, .hero-actions, .hero-proof', {
        y: 28, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.15,
      })
      gsap.from('.hero-photo', { scale: 1.12, duration: 1.5, ease: 'power2.out', delay: 0.1 })
      gsap.from('.booking-dock', { y: 45, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.55 })
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, { y: 34, opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } })
      })
      gsap.utils.toArray('.room-card').forEach((el, i) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.75, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      gsap.utils.toArray('.experience-card').forEach((el, i) => {
        gsap.from(el, { y: 45, opacity: 0, duration: 0.8, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%', once: true } })
      })
      gsap.to('.hero-photo', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onScroll = () => document.body.classList.toggle('has-scrolled', window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); document.body.classList.remove('has-scrolled') }
  }, [])

  const navLinks = [['Rooms', '#rooms'], ['Experiences', '#experiences'], ['Our story', '#story'], ['Reviews', '#reviews'], ['Location', '#location']]
  const faqs = [
    ['Is my booking confirmed when I submit an enquiry?', 'No. This website sends your request to the hotel. The hotel will check room availability and confirm the final price and reservation directly with you.'],
    ['Can I request a specific room?', 'Yes. Choose your preferred room category in the enquiry form. The hotel will confirm whether it is available for your dates.'],
    ['When can I check in and check out?', `The sample policy is check-in at ${hotel.checkIn} and check-out at ${hotel.checkOut}. Confirm the final policy with the hotel before travelling.`],
  ]

  return <div ref={root} className="site-shell">
    <header className="site-header">
      <div className="nav-inner container">
        <a href="#home" className="brand" aria-label={`${hotel.name} home`}><span className="brand-mark"><Sparkles size={20} /></span><span>{hotel.name}<i>.</i><small>STAY A LITTLE DIFFERENT</small></span></a>
        <nav className={`desktop-nav ${menuOpen ? 'mobile-nav-open' : ''}`} aria-label="Main navigation">
          {navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <button className="btn btn-nav mobile-nav-cta" onClick={() => openEnquiry()}>Enquire now <ArrowUpRight size={16} /></button>
        </nav>
        <button className="btn btn-nav desktop-cta" onClick={() => openEnquiry()}>Enquire now <ArrowUpRight size={16} /></button>
        <button className="mobile-menu icon-btn" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-photo" role="img" aria-label="Sunlit luxury hotel pool surrounded by greenery" />
        <div className="hero-shade" />
        <div className="hero-content container">
          <div className="hero-kicker"><span className="kicker-dot" /> {hotel.eyebrow}</div>
          <h1 className="hero-title"><span className="hero-title-line">Stay somewhere</span><span className="hero-title-line title-italic">extraordinary<span className="title-period">.</span></span></h1>
          <p className="hero-copy">{hotel.description}</p>
          <div className="hero-actions"><a className="btn btn-coral" href="#rooms">Explore rooms <ArrowDownRight size={17} /></a><button className="hero-text-btn" onClick={() => openEnquiry()}>Plan your stay <ArrowUpRight size={16} /></button></div>
          <div className="hero-proof"><div className="avatar-stack"><span>A</span><span>R</span><span>M</span><span>+</span></div><div><b>A stay worth slowing down for</b><small>Thoughtful comfort, made personal</small></div><div className="proof-sparkle"><Sparkles size={22} /></div></div>
        </div>
        <div className="hero-side-note"><span>GOOD STAYS. GREAT STORIES.</span><span className="side-line" /></div>
        <a href="#rooms" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={16} /></a>
      </section>

      <section className="booking-section container" id="enquire">
        <div className="booking-dock">
          <div className="booking-intro"><span className="tiny-kicker">YOUR NEXT GETAWAY</span><h2>Let’s get you<br /><em>checked in.</em></h2><p>Tell us what you have in mind. We’ll help with the rest.</p><div className="booking-assurance"><ShieldCheck size={16} /> No payment now · Enquiry first</div></div>
          <EnquiryForm compact />
        </div>
      </section>

      <section className="rooms-section section-pad" id="rooms">
        <div className="container">
          <div className="section-heading reveal"><div><SectionLabel>YOUR SPACE TO UNWIND</SectionLabel><h2>Rooms with a little<br /><em>extra something.</em></h2></div><div className="heading-aside"><p>Find the right kind of comfort for your kind of trip. Every stay starts with the details.</p><a className="text-link" href="#enquire">Find your room <ArrowUpRight size={16} /></a></div></div>
          <div className="room-grid">
            {rooms.map((room, index) => <article className={`room-card room-card-${room.color}`} key={room.id}>
              <div className="room-image-wrap"><img src={room.image} alt={`${room.name} interior`} loading="lazy" /><span className="room-number">0{index + 1}</span><button className="heart-btn" aria-label={`Enquire about ${room.name}`} onClick={() => openEnquiry(room.name)}><Heart size={18} /></button>{index === 1 && <span className="popular-tag"><Sparkles size={12} /> GUEST FAVOURITE</span>}</div>
              <div className="room-card-content"><div className="room-type">{room.type}</div><div className="room-title-row"><h3>{room.name}</h3><span className="room-price">{money(room.price)}<small> / night*</small></span></div><p>{room.description}</p><div className="room-quick-facts"><span><Users size={15} /> {room.occupancy}</span><span><BedDouble size={15} /> {room.bed}</span></div><div className="room-card-bottom"><button className="text-link" onClick={() => setSelectedRoom(room)}>Explore room <ArrowUpRight size={16} /></button><button className="round-arrow" aria-label={`View ${room.name}`} onClick={() => setSelectedRoom(room)}><ArrowUpRight size={18} /></button></div></div>
            </article>)}
          </div>
          <p className="fine-print room-disclaimer">*Illustrative starting rates for this demo template. Actual rates, taxes and availability must be confirmed by the hotel.</p>
        </div>
      </section>

      <section className="story-strip" id="story">
        <div className="container story-layout">
          <div className="story-visual reveal"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" alt="Warm, thoughtfully designed hotel interior" loading="lazy" /><div className="story-sticker"><Sparkles size={19} /><span>STAY<br />CURIOUS.</span></div><div className="story-image-caption">A PLACE TO PAUSE. A SPACE TO FEEL GOOD.</div></div>
          <div className="story-copy reveal"><SectionLabel>THE STAYORA FEELING</SectionLabel><h2>Not just a place<br />to sleep. A place<br /><em>to feel somewhere.</em></h2><p>We believe the best stays are made of small things: a welcoming space, thoughtful comforts and the freedom to make the day your own.</p><p>Come for the change of scene. Leave with a few new favourite memories.</p><a className="btn btn-dark" href="#experiences">Explore the feeling <ArrowRight size={17} /></a><div className="story-stats"><div><b>01</b><span>Thoughtful<br />comfort</span></div><div><b>02</b><span>Easy, personal<br />planning</span></div><div><b>03</b><span>Room to<br />recharge</span></div></div></div>
        </div>
      </section>

      <section className="experiences-section section-pad" id="experiences">
        <div className="container"><div className="section-heading reveal"><div><SectionLabel>MAKE IT MORE THAN A STAY</SectionLabel><h2>Good days start<br /><em>right here.</em></h2></div><p className="heading-description">A change of scene can change everything. Find a little inspiration for your time away.</p></div>
          <div className="experience-grid">{experiences.map((item) => <article className={`experience-card experience-${item.color}`} key={item.number}><div className="experience-image"><img src={item.image} alt={item.title} loading="lazy" /><span>{item.number}</span></div><div className="experience-content"><div className="room-type">{item.tag}</div><h3>{item.title}</h3><p>{item.description}</p><a href="#enquire" className="experience-link" onClick={() => {}} aria-label={`Enquire about ${item.title}`}><ArrowUpRight size={19} /></a></div></article>)}</div>
          <div className="amenities-ribbon reveal"><div><Wifi /><span>Stay connected</span></div><div><Wind /><span>Comfort first</span></div><div><Coffee /><span>Slow mornings</span></div><div><Utensils /><span>Good food</span></div><div><Waves /><span>Room to reset</span></div><div><Bath /><span>Little luxuries</span></div></div>
          <p className="fine-print">Amenities shown are illustrative. Confirm the facilities offered by the specific hotel before publishing.</p>
        </div>
      </section>

      <section className="quote-section" id="reviews"><div className="quote-orb orb-one" /><div className="quote-orb orb-two" /><div className="container quote-inner reveal"><SectionLabel light>THE GOOD WORD</SectionLabel><div className="quote-stars" aria-label="Decorative stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div><h2>“{reviews[activeFaq % reviews.length].quote}”</h2><div className="quote-person"><span className="quote-avatar">{reviews[activeFaq % reviews.length].name.charAt(0)}</span><div><b>{reviews[activeFaq % reviews.length].name}</b><small>{reviews[activeFaq % reviews.length].context}</small></div></div><div className="quote-controls">{reviews.map((review, i) => <button key={review.name} aria-label={`Show review ${i + 1}`} className={activeFaq % reviews.length === i ? 'active' : ''} onClick={() => setActiveFaq(i)} />)}</div><p className="quote-disclaimer">Demo testimonials only. Replace with genuine, permissioned guest reviews before launch.</p></div></section>

      <section className="faq-section section-pad"><div className="container faq-layout"><div className="reveal"><SectionLabel>GOOD TO KNOW</SectionLabel><h2>A few things<br /><em>you might wonder.</em></h2><p>Planning should feel simple. Here are a few useful details before you reach out.</p><button className="btn btn-dark" onClick={() => openEnquiry()}>Ask us anything <MessageCircle size={16} /></button></div><div className="faq-list reveal">{faqs.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index + 10 ? 'faq-open' : ''}`} key={question}><button onClick={() => setActiveFaq(activeFaq === index + 10 ? -1 : index + 10)} aria-expanded={activeFaq === index + 10}><span>{question}</span><span className="faq-toggle">{activeFaq === index + 10 ? <Minus size={17} /> : <Plus size={17} />}</span></button>{activeFaq === index + 10 && <p>{answer}</p>}</div>)}</div></div></section>

      <section className="location-section" id="location"><div className="container location-layout"><div className="location-copy reveal"><SectionLabel>FIND YOUR WAY HERE</SectionLabel><h2>Your next story<br />starts in <em>{hotel.city.split(',')[0]}.</em></h2><p>Questions about getting here, room options or your travel dates? We’re just a message away.</p><div className="location-detail"><span className="location-icon"><MapPin size={18} /></span><div><b>Find us</b><p>{hotel.address}</p></div></div><div className="location-detail"><span className="location-icon"><Clock3 size={18} /></span><div><b>Check-in & check-out</b><p>Check-in: {hotel.checkIn}<br />Check-out: {hotel.checkOut}</p></div></div><div className="location-actions"><a className="btn btn-primary" href={hotel.mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a><button className="btn btn-ghost" onClick={() => openEnquiry()}>Send an enquiry</button></div></div><div className="map-card reveal"><div className="map-art"><div className="map-grid" /><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-park park-one" /><div className="map-park park-two" /><div className="map-pin"><MapPin size={25} fill="currentColor" /></div><div className="map-label"><span className="map-label-icon"><Sparkles size={16} /></span><div><b>{hotel.name}</b><small>{hotel.city}</small></div></div><span className="map-coord">YOUR NEXT STOP ↗</span></div><a href={hotel.mapUrl} target="_blank" rel="noreferrer" className="map-link">Open in Google Maps <ArrowUpRight size={16} /></a></div></div></section>

      <section className="final-cta"><div className="container final-cta-inner reveal"><div className="final-sun"><Sparkles size={27} /></div><SectionLabel>YOUR ROOM IS OUT THERE</SectionLabel><h2>Make a little room<br />for <em>something lovely.</em></h2><p>Share your dates and we’ll help you plan the details.</p><button className="btn btn-dark" onClick={() => openEnquiry()}>Start your enquiry <ArrowRight size={17} /></button><span className="cta-doodle">✳</span></div></section>
    </main>

    <footer className="site-footer"><div className="container"><div className="footer-main"><a href="#home" className="brand footer-brand"><span className="brand-mark"><Sparkles size={20} /></span><span>{hotel.name}<i>.</i><small>STAY A LITTLE DIFFERENT</small></span></a><p>Thoughtful stays. Little moments.<br />Stories worth taking home.</p><div className="footer-contact"><a href={`tel:${hotel.phone.replace(/\s/g, '')}`}>{hotel.phone}</a><a href={`mailto:${hotel.email}`}>{hotel.email}</a><span>{hotel.city}</span></div><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {hotel.name}. Demo website template.</span><span>Made for slower mornings & better stays.</span></div></div></footer>

    <a className="floating-whatsapp" href={`https://wa.me/${hotel.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${hotel.name}, I have a question about a stay.`)}`} target="_blank" rel="noreferrer" aria-label="Contact hotel on WhatsApp"><MessageCircle size={22} /><span>Let’s chat</span></a>
    <div className="mobile-bottom-cta"><button className="btn btn-primary btn-full" onClick={() => openEnquiry()}>Enquire about a stay <ArrowRight size={17} /></button></div>

    {selectedRoom && <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} onEnquire={openEnquiry} />}
    {enquiryOpen && <div className="modal-backdrop enquiry-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setEnquiryOpen(false)}><div className="enquiry-modal" role="dialog" aria-modal="true" aria-label="Hotel booking enquiry"><EnquiryForm initialRoom={initialRoom} onClose={() => setEnquiryOpen(false)} /></div></div>}
  </div>
}

export default App
