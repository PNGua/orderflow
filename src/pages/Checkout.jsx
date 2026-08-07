import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { base44 } from '@/api/base44Client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/checkout/ContactSection';
import DeliverySection from '@/components/checkout/DeliverySection';
import PaymentSection from '@/components/checkout/PaymentSection';
import SummarySection from '@/components/checkout/SummarySection';

const SAMPLE_ITEMS = [
  {
    product_name: 'ДТФ плівка преміум',
    product_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&q=80',
    quantity: 1,
    price: 980,
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    other_recipient: false,
    create_account: true,
    password: '',
    delivery_type: 'Нова Пошта',
    service_zone: 'Львів',
    address: '',
    payment_type: 'Рахунок-фактура',
    comment: '',
    confirmed: false,
  });

  const setField = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const total = SAMPLE_ITEMS.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.first_name || !form.last_name || !form.phone || !form.email) {
      toast({ title: 'Заповніть обовʼязкові поля контактів', variant: 'destructive' });
      return;
    }
    if (form.create_account && !form.password) {
      toast({ title: 'Вкажіть пароль для облікового запису', variant: 'destructive' });
      return;
    }
    if (!form.confirmed) {
      toast({ title: 'Підтвердіть перевірку макета та правила', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    try {
      const orderNumber = `PNG-${Date.now().toString().slice(-8)}`;
      await base44.entities.Order.create({
        order_number: orderNumber,
        order_date: new Date().toISOString(),
        status: 'Нове',
        total_amount: total,
        payment_type: form.payment_type,
        payer_name: `${form.first_name} ${form.last_name}`.trim(),
        delivery_type: form.delivery_type,
        recipient_name: `${form.first_name} ${form.last_name}`.trim(),
        recipient_phone: form.phone,
        service_zone: form.service_zone,
        comment: form.comment,
        items: SAMPLE_ITEMS,
      });
      toast({ title: 'Замовлення оформлено!', description: `Номер: ${orderNumber}` });
      navigate('/cabinet');
    } catch (err) {
      toast({ title: 'Помилка оформлення', description: err?.message || 'Спробуйте ще раз', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Оформлення замовлення</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Оформлення замовлення
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-[#f9f9fb] border border-border rounded-2xl p-5 sm:p-8 space-y-8"
          >
            <ContactSection
              form={form}
              setField={setField}
              showPass={showPass}
              setShowPass={setShowPass}
            />

            <div className="h-px bg-border" />

            <DeliverySection form={form} setField={setField} />

            <div className="h-px bg-border" />

            <PaymentSection form={form} setField={setField} />

            <div className="h-px bg-border" />

            <SummarySection
              form={form}
              setField={setField}
              total={total}
              submitting={submitting}
            />
          </form>
        </div>
      </main>

      {/* Floating contact button */}
      <Link
        to="/contacts"
        className="fixed bottom-5 left-5 z-40 w-14 h-14 rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700 flex items-center justify-center text-center text-[9px] font-bold leading-tight"
        title="Кнопка зв'язку"
      >
        <span className="px-1 text-center">КНОПКА<br />ЗВ'ЯЗКУ</span>
      </Link>

      <Footer />
    </div>
  );
}