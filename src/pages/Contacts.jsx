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
    <button onClick={handleCopy} className="ml-2 text-muted-foreground hover:text-primary transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Зв'яжіться з нами</h1>
          <p className="text-primary-foreground/80 max-w-md mx-auto">Менеджер відповість протягом 15 хвилин у робочий час</p>
        </div>
      </section>

      {/* Contact Details + Maps */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left: Contact Details */}
            <div className="space-y-8">
              <div className="bg-card border rounded-xl p-6 space-y-5 shadow-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Адреса</p>
                    <p className="font-semibold text-foreground text-sm">м. Львів, вул. Городоцька 242</p>
                    <p className="font-semibold text-foreground text-sm">м. Київ, вул. Машинобудівна 44</p>
                  </div>
                </div>
                <div className="h-px bg-border" />
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">Телефон</p>
                    <a href="tel:+380739338895" className="font-semibold text-foreground hover:text-primary transition-colors">
                      +380 73 933 88 95
                    </a>
                  </div>
                </div>
                <div className="h-px bg-border" />
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">Електронна пошта</p>
                    <div className="flex items-center">
                      <a href="mailto:info@pngdruk.com.ua" className="font-semibold text-foreground hover:text-primary transition-colors">
                        info@pngdruk.com.ua
                      </a>
                      <CopyButton text="info@pngdruk.com.ua" />
                    </div>
                  </div>
                </div>
                <div className="h-px bg-border" />
                {/* Schedule */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Графік роботи</p>
                    <p className="font-semibold text-foreground text-sm">ПН – ПТ 10:00 – 18:00</p>
                    <p className="text-sm text-foreground">СБ – 10:00 – 16:00</p>
                    <p className="text-sm text-muted-foreground">НД – вихідний</p>
                  </div>
                </div>
              </div>

              {/* Messenger links */}
              <div className="bg-card border rounded-xl p-6 shadow-sm">
                <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Месенджери</p>
                <div className="flex flex-wrap gap-3 items-center">
                  <a href="viber://chat?number=%2B380977410048" className="flex items-center gap-2 text-primary font-medium hover:underline">
                    <MessageCircle className="w-4 h-4" /> Viber
                  </a>
                  <span className="text-border">•</span>
                  <a href="https://t.me/png_dtf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary font-medium hover:underline">
                    <Send className="w-4 h-4" /> Telegram
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Stacked Maps */}
            <div className="space-y-6">
              {OFFICES.map((office) => (
                <div key={office.city} className="bg-card border rounded-xl overflow-hidden shadow-sm">
                  <div className="h-48">
                    <MapContainer
                      center={office.coords}
                      zoom={14}
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
                  <div className="p-4 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">м. {office.city}</p>
                        <p className="text-xs text-muted-foreground">{office.address}</p>
                        <p className="text-xs text-yellow-500 font-medium mt-0.5">{office.rating} на Google Maps</p>
                      </div>
                    </div>
                    <a href={office.mapLink} target="_blank" rel="noreferrer" className="flex-shrink-0">
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Маршрут
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full-width Form */}
          <div className="mt-12 bg-card border rounded-xl p-6 lg:p-8 shadow-sm">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-lg font-bold text-foreground mb-1">Напишіть нам</h2>
              <p className="text-sm text-muted-foreground mb-5">Залиште запит і ми зв'яжемося з вами найближчим часом</p>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-7 h-7 text-green-600" />
                  </div>
                  <p className="font-semibold text-foreground">Дякуємо! Ми отримали ваш запит.</p>
                  <p className="text-sm text-muted-foreground">Менеджер зв'яжеться з вами найближчим часом.</p>
                  <Button variant="outline" onClick={() => setSent(false)}>Надіслати ще</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Ім'я</label>
                    <Input
                      placeholder="Ваше ім'я"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Телефон або e-mail</label>
                    <Input
                      placeholder="+380..."
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Повідомлення</label>
                    <textarea
                      className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px] resize-none"
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

      <Footer />
    </div>
  );
}