import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Copy, Check, MessageCircle, Send } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const OFFICES = [
  {
    city: 'Львів',
    address: 'вул. Городоцька, 242',
    mapLink: 'https://maps.app.goo.gl/JG1KBzHwY6hz3RFa7',
    coords: [49.8182, 23.9671],
    rating: '5.0 ★ (179)',
    name: 'PNG druk – ДТФ / DTF друк в рулонах',
  },
  {
    city: 'Київ',
    address: 'вул. Машинобудівна, 44',
    mapLink: 'https://maps.app.goo.gl/huS4W9jGJauNNfBdA',
    coords: [50.4245, 30.5747],
    rating: '5.0 ★ (12)',
    name: 'ДТФ друк / DTF печать – PNG druk',
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="ml-2 text-zinc-400 hover:text-primary transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function Contacts() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-zinc-100">
      <Header />

      {/* Hero with dark gradient */}
      <section className="relative bg-gradient-to-r from-black via-[#0a0a0a] to-[#1a1a1a] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none" />
        <div className="relative container mx-auto px-4 lg:px-8 max-w-6xl text-center">
          <p className="text-xs text-primary font-semibold uppercase tracking-[0.3em] mb-3">Контакти</p>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-white">Зв'яжіться з нами</h1>
          <p className="text-zinc-400 max-w-md mx-auto text-base">
            Менеджер відповість протягом 15 хвилин у робочий час
          </p>
        </div>
      </section>

      {/* Contacts + Form */}
      <section className="py-14 bg-gradient-to-r from-black via-[#0a0a0a] to-[#141414]">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left: Contact Info */}
            <div className="space-y-6">
              {/* Phone & Email & Hours */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5 uppercase tracking-wider">Телефон</p>
                    <a href="tel:+380739338895" className="font-semibold text-white hover:text-primary transition-colors">
                      +380 73 933 88 95
                    </a>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5 uppercase tracking-wider">Електронна пошта</p>
                    <div className="flex items-center">
                      <a href="mailto:info@pngdruk.com.ua" className="font-semibold text-white hover:text-primary transition-colors">
                        info@pngdruk.com.ua
                      </a>
                      <CopyButton text="info@pngdruk.com.ua" />
                    </div>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-primary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-0.5 uppercase tracking-wider">Графік роботи</p>
                    <p className="font-semibold text-white text-sm">ПН–ПТ: 10:00 – 18:00</p>
                    <p className="text-sm text-zinc-300">СБ: 10:00 – 16:00</p>
                    <p className="text-sm text-zinc-500">НД — вихідний</p>
                  </div>
                </div>
              </div>

              {/* Messenger buttons */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">Месенджери та соціальні мережі</p>
                <div className="flex flex-wrap gap-2">
                  <a href="viber://chat?number=%2B380977410048" className="flex items-center gap-2 bg-purple-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-purple-500 transition-colors">
                    <MessageCircle className="w-4 h-4" /> Viber
                  </a>
                  <a href="https://t.me/png_dtf" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-sky-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-sky-400 transition-colors">
                    <Send className="w-4 h-4" /> Telegram
                  </a>
                  <a href="https://www.instagram.com/png_druk/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                    Instagram
                  </a>
                  <a href="https://www.facebook.com/pngdruk" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-500 transition-colors">
                    Facebook
                  </a>
                  <a href="https://www.youtube.com/@png.group2025" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-red-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-red-500 transition-colors">
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-1">Напишіть нам</h2>
              <p className="text-sm text-zinc-400 mb-6">Залиште запит і ми зв'яжемося з вами найближчим часом</p>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <div className="w-14 h-14 bg-green-500/15 rounded-full flex items-center justify-center">
                    <Check className="w-7 h-7 text-green-400" />
                  </div>
                  <p className="font-semibold text-white">Дякуємо! Ми отримали ваш запит.</p>
                  <p className="text-sm text-zinc-400">Менеджер зв'яжеться з вами найближчим часом.</p>
                  <Button variant="outline" onClick={() => setSent(false)} className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                    Надіслати ще
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-zinc-300 block mb-1.5">Ім'я</label>
                    <Input
                      placeholder="Ваше ім'я"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                      className="bg-white/5 border-white/15 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-300 block mb-1.5">Телефон або e-mail</label>
                    <Input
                      placeholder="+380..."
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                      className="bg-white/5 border-white/15 text-white placeholder:text-zinc-500 focus-visible:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-zinc-300 block mb-1.5">Повідомлення</label>
                    <textarea
                      className="w-full border border-white/15 rounded-md px-3 py-2 text-sm bg-white/5 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] resize-none"
                      placeholder="Опишіть ваш запит..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Надіслати запит</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="py-14 bg-gradient-to-r from-black via-[#0a0a0a] to-[#1a1a1a]">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-xs text-primary font-semibold uppercase tracking-[0.3em] mb-2">Завітайте до нас</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-white">Наші офіси</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {OFFICES.map((office) => (
              <div key={office.city} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="h-56">
                  <MapContainer
                    center={office.coords}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={office.coords}>
                      <Popup>{office.name}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <div className="p-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-white">м. {office.city}</p>
                      <p className="text-sm text-zinc-400">{office.address}</p>
                      <p className="text-xs text-yellow-400 font-medium mt-1">{office.rating} на Google Maps</p>
                    </div>
                  </div>
                  <a
                    href={office.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-shrink-0"
                  >
                    <Button variant="outline" size="sm" className="gap-1.5 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Маршрут
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}