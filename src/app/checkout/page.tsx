'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useCart } from '../../context/CartContext'; 
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const { items, totalPrice } = useCart();
  const searchParams = useSearchParams();
  const isNRG = searchParams.get('nrg') === 'vizia_protocol_nrg';

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [buyerData, setBuyerData] = useState({
    firstName: '', lastName: '', email: '', phone: ''
  });

  const [invoiceData, setInvoiceData] = useState({
    wantsInvoice: false,
    companyName: '', nip: '', street: '', city: '', zipCode: ''
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: '', houseNumber: '', city: '', zipCode: ''
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'paczkomat' | 'kurier'>('paczkomat');
  const [points, setPoints] = useState<any[]>([]);
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const finalTotal = totalPrice;
  const viziaRed = "[rgb(255,19,58)]";

  useEffect(() => {
    if (!search || search.length < 3) return;
    const delayDebounceFn = setTimeout(() => {
      if (deliveryMethod === 'paczkomat') fetchPoints(search);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search, deliveryMethod]);

  const fetchPoints = async (query: string) => {
    setLoadingPoints(true);
    try {
      const res = await fetch(`https://api-pl-points.easypack24.net/v1/points?query=${encodeURIComponent(query)}&limit=10`);
      const data = await res.json();
      if (data.items) {
        setPoints(data.items);
        if (!selectedPoint || !data.items.find((p: any) => p.name === selectedPoint.name)) {
          setSelectedPoint(data.items[0]);
        }
      }
    } catch (err) {
      console.error("Błąd pobierania punktów:", err);
    } finally {
      setLoadingPoints(false);
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!buyerData.firstName) errs.firstName = "Pole wymagane";
    if (!buyerData.lastName) errs.lastName = "Pole wymagane";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerData.email)) errs.email = "Niepoprawny e-mail";
    if (!/^\d{9}$/.test(buyerData.phone.replace(/\s+/g, ''))) errs.phone = "Wymagane 9 cyfr";

    if (deliveryMethod === 'paczkomat' && !selectedPoint) errs.delivery = "Wybierz punkt odbioru";
    if (deliveryMethod === 'kurier') {
      if (!shippingAddress.street) errs.street = "Pole wymagane";
      if (!shippingAddress.city) errs.city = "Pole wymagane";
      if (!/^\d{2}-\d{3}$/.test(shippingAddress.zipCode)) errs.zipCode = "Format 00-000";
    }

    if (invoiceData.wantsInvoice) {
      if (!invoiceData.companyName) errs.companyName = "Pole wymagane";
      if (!/^\d{10}$/.test(invoiceData.nip.replace(/-/g, ''))) errs.nip = "Wymagane 10 cyfr";
      if (!invoiceData.street) errs.invoiceStreet = "Pole wymagane";
      if (!invoiceData.city) errs.invoiceCity = "Pole wymagane";
      if (!/^\d{2}-\d{3}$/.test(invoiceData.zipCode)) errs.invoiceZip = "Format 00-000";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCompleteOrder = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email: buyerData.email,
          buyerData,
          invoiceData,
          deliveryMethod,
          selectedPoint,
          shippingAddress: deliveryMethod === 'kurier' ? shippingAddress : null
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Wystąpił błąd podczas inicjowania płatności.");
      }
    } catch (error) {
      console.error("Błąd checkoutu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 pb-20 pt-[100px] font-sans tracking-tight">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-bold leading-none">Podsumowanie zamówienia</h1>
          <p className={`text-${viziaRed} text-xs mt-2 uppercase tracking-widest`}>
            {isNRG ? 'Protokół NRG Aktywny' : 'Bezpieczne połączenie'}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">

            {/* SEKCJA 1: Dane nabywcy */}
            <section className="space-y-6">
              <h2 className="text-lg font-bold border-l-4 border-white pl-4">1. Dane nabywcy</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <input placeholder="Imię" value={buyerData.firstName} onChange={(e) => setBuyerData({...buyerData, firstName: e.target.value})} className={`bg-zinc-900 border ${errors.firstName ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white transition-colors`} />
                  {errors.firstName && <span className="text-[10px] text-red-500">{errors.firstName}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <input placeholder="Nazwisko" value={buyerData.lastName} onChange={(e) => setBuyerData({...buyerData, lastName: e.target.value})} className={`bg-zinc-900 border ${errors.lastName ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white transition-colors`} />
                  {errors.lastName && <span className="text-[10px] text-red-500">{errors.lastName}</span>}
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <input placeholder="E-mail" value={buyerData.email} onChange={(e) => setBuyerData({...buyerData, email: e.target.value})} className={`bg-zinc-900 border ${errors.email ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white transition-colors`} />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <input placeholder="Numer telefonu" value={buyerData.phone} onChange={(e) => setBuyerData({...buyerData, phone: e.target.value})} className={`bg-zinc-900 border ${errors.phone ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white transition-colors`} />
                  {errors.phone && <span className="text-[10px] text-red-500">{errors.phone}</span>}
                </div>
              </div>
            </section>

            {/* SEKCJA 2: Faktura VAT */}
            <section className="space-y-6">
              <div className="border-l-4 border-white pl-4">
                <h2 className="text-lg font-bold">2. Faktura VAT</h2>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-5 h-5 border flex items-center justify-center transition-colors ${invoiceData.wantsInvoice ? 'bg-white border-white' : 'border-white/30 group-hover:border-white/60'}`}
                  onClick={() => setInvoiceData({...invoiceData, wantsInvoice: !invoiceData.wantsInvoice})}
                >
                  {invoiceData.wantsInvoice && <span className="text-black text-xs font-bold">✓</span>}
                </div>
                <span className="text-sm text-white/70">Chcę otrzymać fakturę VAT</span>
              </label>

              {invoiceData.wantsInvoice && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex flex-col gap-1">
                    <input placeholder="Nazwa firmy" value={invoiceData.companyName} onChange={(e) => setInvoiceData({...invoiceData, companyName: e.target.value})} className={`bg-zinc-900 border ${errors.companyName ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white`} />
                    {errors.companyName && <span className="text-[10px] text-red-500">{errors.companyName}</span>}
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    <input placeholder="NIP (10 cyfr)" value={invoiceData.nip} onChange={(e) => setInvoiceData({...invoiceData, nip: e.target.value})} className={`bg-zinc-900 border ${errors.nip ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white`} />
                    {errors.nip && <span className="text-[10px] text-red-500">{errors.nip}</span>}
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    <input placeholder="Ulica i numer" value={invoiceData.street} onChange={(e) => setInvoiceData({...invoiceData, street: e.target.value})} className={`bg-zinc-900 border ${errors.invoiceStreet ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white`} />
                    {errors.invoiceStreet && <span className="text-[10px] text-red-500">{errors.invoiceStreet}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input placeholder="Kod pocztowy" value={invoiceData.zipCode} onChange={(e) => setInvoiceData({...invoiceData, zipCode: e.target.value})} className={`bg-zinc-900 border ${errors.invoiceZip ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white`} />
                    {errors.invoiceZip && <span className="text-[10px] text-red-500">{errors.invoiceZip}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input placeholder="Miasto" value={invoiceData.city} onChange={(e) => setInvoiceData({...invoiceData, city: e.target.value})} className={`bg-zinc-900 border ${errors.invoiceCity ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white`} />
                    {errors.invoiceCity && <span className="text-[10px] text-red-500">{errors.invoiceCity}</span>}
                  </div>
                </div>
              )}
            </section>

            {/* SEKCJA 3: Metoda dostawy */}
            <section className="space-y-6">
              <h2 className="text-lg font-bold border-l-4 border-white pl-4">3. Metoda dostawy</h2>
              <div className="flex gap-4">
                <button onClick={() => setDeliveryMethod('paczkomat')} className={`flex-1 p-4 border font-bold text-xs transition-colors ${deliveryMethod === 'paczkomat' ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/30'}`}>Paczkomat InPost</button>
                <button onClick={() => setDeliveryMethod('kurier')} className={`flex-1 p-4 border font-bold text-xs transition-colors ${deliveryMethod === 'kurier' ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/30'}`}>Kurier Standard</button>
              </div>
              {errors.delivery && <span className="text-[10px] text-red-500">{errors.delivery}</span>}

              {deliveryMethod === 'kurier' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <input placeholder="Ulica i numer" value={shippingAddress.street} onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})} className={`bg-zinc-900 border ${errors.street ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white`} />
                    {errors.street && <span className="text-[10px] text-red-500">{errors.street}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input placeholder="Kod pocztowy" value={shippingAddress.zipCode} onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})} className={`bg-zinc-900 border ${errors.zipCode ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white`} />
                    {errors.zipCode && <span className="text-[10px] text-red-500">{errors.zipCode}</span>}
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    <input placeholder="Miasto" value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} className={`bg-zinc-900 border ${errors.city ? 'border-red-500' : 'border-white/10'} p-4 text-sm outline-none focus:border-white`} />
                    {errors.city && <span className="text-[10px] text-red-500">{errors.city}</span>}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <input placeholder="Wyszukaj miasto lub punkt..." value={search || ''} onChange={(e) => setSearch(e.target.value)} className="w-full bg-zinc-900 border border-white/20 p-4 text-sm outline-none focus:border-white" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-[350px] overflow-y-auto border border-white/10 bg-black p-2 space-y-2">
                      {loadingPoints ? (
                        <p className="text-xs p-4 animate-pulse">Szukam punktów...</p>
                      ) : (
                        points.map((p) => (
                          <div key={p.name} onClick={() => setSelectedPoint(p)} className={`p-3 border cursor-pointer ${selectedPoint?.name === p.name ? `border-${viziaRed} bg-${viziaRed}/5` : 'border-white/5 hover:border-white/20'}`}>
                            <p className={`text-xs font-bold text-${viziaRed}`}>{p.name}</p>
                            <p className="text-[11px] opacity-70">{p.address_details.street}, {p.address_details.city}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="h-[350px] border border-white/10 bg-zinc-900 grayscale invert contrast-125">
                      {selectedPoint && (
                        <iframe width="100%" height="100%" style={{ border: 0 }} src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedPoint.location.longitude - 0.005}%2C${selectedPoint.location.latitude - 0.005}%2C${selectedPoint.location.longitude + 0.005}%2C${selectedPoint.location.latitude + 0.005}&layer=mapnik&marker=${selectedPoint.location.latitude}%2C${selectedPoint.location.longitude}`} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

          </div>

          {/* PODSUMOWANIE */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 p-8 border border-white/10 sticky top-[100px]">
              <h2 className="text-xl font-bold mb-8">Podsumowanie</h2>
              <div className="space-y-4 mb-8">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm font-sans text-white/80">
                    <span>{item.name}</span>
                    <span className="text-white font-medium">{item.price.toFixed(2)} PLN</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t-2 border-white flex justify-between items-end">
                <span className="text-xs opacity-40 uppercase">Suma do zapłaty</span>
                <span className="text-4xl font-bold">{finalTotal.toFixed(2)} PLN</span>
              </div>
              <button onClick={handleCompleteOrder} disabled={loading} className={`w-full py-6 mt-10 text-xl font-bold transition-all ${loading ? 'bg-zinc-800 text-zinc-500 cursor-wait' : 'bg-white text-black hover:bg-[rgb(255,19,58)] hover:text-white'}`}>
                {loading ? 'Przetwarzanie...' : 'Przejdź do płatności'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="animate-pulse tracking-widest uppercase text-xs">Inicjalizacja protokołu...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}