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
          items, email: buyerData.email, buyerData, invoiceData,
          deliveryMethod, selectedPoint,
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

  const inputClass = (hasError: boolean) =>
    `w-full bg-black border ${hasError ? 'border-[rgb(255,19,58)]' : 'border-white/10'} p-4 text-sm font-mono text-white outline-none focus:border-white/40 transition-colors placeholder:text-zinc-600 placeholder:uppercase placeholder:tracking-widest`;

  const SectionLabel = ({ number, title }: { number: string, title: string }) => (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[10px] text-[rgb(255,19,58)] tracking-widest">{number}_</span>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-white font-bold">{title}</h2>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 pb-20 pt-[100px] font-mono">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="mb-16 pb-8 border-b border-white/5">
          <p className="text-[10px] text-[rgb(255,19,58)] tracking-[0.4em] uppercase mb-3">
            {isNRG ? '// NRG_PROTOCOL_ACTIVE' : '// SECURE_CHECKOUT'}
          </p>
          <h1 className="font-brand font-black italic text-5xl md:text-6xl uppercase tracking-tighter text-white leading-none">
            Zamówienie
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-16">

            {/* 01 DANE NABYWCY */}
            <section>
              <SectionLabel number="01" title="Dane nabywcy" />
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <input placeholder="Imię" value={buyerData.firstName}
                    onChange={(e) => setBuyerData({...buyerData, firstName: e.target.value})}
                    className={inputClass(!!errors.firstName)} />
                  {errors.firstName && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.firstName}</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <input placeholder="Nazwisko" value={buyerData.lastName}
                    onChange={(e) => setBuyerData({...buyerData, lastName: e.target.value})}
                    className={inputClass(!!errors.lastName)} />
                  {errors.lastName && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.lastName}</span>}
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <input placeholder="E-mail" value={buyerData.email}
                    onChange={(e) => setBuyerData({...buyerData, email: e.target.value})}
                    className={inputClass(!!errors.email)} />
                  {errors.email && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.email}</span>}
                </div>
                <div className="col-span-2 flex flex-col gap-1">
                  <input placeholder="Telefon (9 cyfr)" value={buyerData.phone}
                    onChange={(e) => setBuyerData({...buyerData, phone: e.target.value})}
                    className={inputClass(!!errors.phone)} />
                  {errors.phone && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.phone}</span>}
                </div>
              </div>
            </section>

            {/* 02 FAKTURA VAT */}
            <section>
              <SectionLabel number="02" title="Faktura VAT" />
              <div
                onClick={() => setInvoiceData({...invoiceData, wantsInvoice: !invoiceData.wantsInvoice})}
                className={`flex items-center gap-4 p-4 border cursor-pointer transition-colors ${invoiceData.wantsInvoice ? 'border-white/20 bg-white/[0.02]' : 'border-white/5 hover:border-white/10'}`}
              >
                <div className={`w-4 h-4 border flex items-center justify-center transition-colors shrink-0 ${invoiceData.wantsInvoice ? 'bg-white border-white' : 'border-white/20'}`}>
                  {invoiceData.wantsInvoice && <span className="text-black text-[10px] font-bold leading-none">✓</span>}
                </div>
                <span className="text-[11px] uppercase tracking-widest text-white/70">Chcę otrzymać fakturę VAT</span>
              </div>

              {invoiceData.wantsInvoice && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="col-span-2 flex flex-col gap-1">
                    <input placeholder="Nazwa firmy" value={invoiceData.companyName}
                      onChange={(e) => setInvoiceData({...invoiceData, companyName: e.target.value})}
                      className={inputClass(!!errors.companyName)} />
                    {errors.companyName && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.companyName}</span>}
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    <input placeholder="NIP (10 cyfr)" value={invoiceData.nip}
                      onChange={(e) => setInvoiceData({...invoiceData, nip: e.target.value})}
                      className={inputClass(!!errors.nip)} />
                    {errors.nip && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.nip}</span>}
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    <input placeholder="Ulica i numer" value={invoiceData.street}
                      onChange={(e) => setInvoiceData({...invoiceData, street: e.target.value})}
                      className={inputClass(!!errors.invoiceStreet)} />
                    {errors.invoiceStreet && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.invoiceStreet}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input placeholder="Kod pocztowy" value={invoiceData.zipCode}
                      onChange={(e) => setInvoiceData({...invoiceData, zipCode: e.target.value})}
                      className={inputClass(!!errors.invoiceZip)} />
                    {errors.invoiceZip && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.invoiceZip}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input placeholder="Miasto" value={invoiceData.city}
                      onChange={(e) => setInvoiceData({...invoiceData, city: e.target.value})}
                      className={inputClass(!!errors.invoiceCity)} />
                    {errors.invoiceCity && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.invoiceCity}</span>}
                  </div>
                </div>
              )}
            </section>

            {/* 03 DOSTAWA */}
            <section>
              <SectionLabel number="03" title="Metoda dostawy" />

              <div className="grid grid-cols-2 gap-3 mb-6">
                {(['paczkomat', 'kurier'] as const).map((method) => (
                  <button key={method} onClick={() => setDeliveryMethod(method)}
                    className={`p-5 border text-left transition-all ${deliveryMethod === method ? 'border-white bg-white/[0.03]' : 'border-white/5 hover:border-white/20'}`}
                  >
                    <p className={`font-mono text-[10px] tracking-widest uppercase mb-1 ${deliveryMethod === method ? 'text-[rgb(255,19,58)]' : 'text-zinc-500'}`}>
                      {method === 'paczkomat' ? 'InPost' : 'Kurier DPD'}
                    </p>
                    <p className={`font-mono text-sm font-bold uppercase ${deliveryMethod === method ? 'text-white' : 'text-zinc-400'}`}>
                      {method === 'paczkomat' ? 'Paczkomat' : 'Dostawa kurierska'}
                    </p>
                    <p className="font-mono text-[10px] text-[rgb(255,19,58)] mt-2">W cenie — 0 PLN</p>
                  </button>
                ))}
              </div>

              {errors.delivery && <p className="text-[10px] text-[rgb(255,19,58)] tracking-widest mb-4">{errors.delivery}</p>}

              {deliveryMethod === 'kurier' ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 flex flex-col gap-1">
                    <input placeholder="Ulica i numer" value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                      className={inputClass(!!errors.street)} />
                    {errors.street && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.street}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input placeholder="Kod pocztowy" value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                      className={inputClass(!!errors.zipCode)} />
                    {errors.zipCode && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.zipCode}</span>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <input placeholder="Miasto" value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className={inputClass(!!errors.city)} />
                    {errors.city && <span className="text-[10px] text-[rgb(255,19,58)] tracking-widest">{errors.city}</span>}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    placeholder="Wyszukaj miasto lub nazwę paczkomatu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={inputClass(false)}
                  />

                  {(points.length > 0 || loadingPoints) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* LISTA PUNKTÓW */}
                      <div className="h-[360px] overflow-y-auto border border-white/5 bg-zinc-950 space-y-px">
                        {loadingPoints ? (
                          <div className="h-full flex items-center justify-center">
                            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest animate-pulse">Szukam punktów...</p>
                          </div>
                        ) : (
                          points.map((p) => (
                            <div
                              key={p.name}
                              onClick={() => setSelectedPoint(p)}
                              className={`p-4 cursor-pointer transition-all border-l-2 ${
                                selectedPoint?.name === p.name
                                  ? 'border-l-[rgb(255,19,58)] bg-white/[0.03]'
                                  : 'border-l-transparent hover:bg-white/[0.02] hover:border-l-white/20'
                              }`}
                            >
                              <p className={`font-mono text-[11px] font-bold tracking-widest ${selectedPoint?.name === p.name ? 'text-[rgb(255,19,58)]' : 'text-white'}`}>
                                {p.name}
                              </p>
                              <p className="font-mono text-[10px] text-zinc-500 mt-1">
                                {p.address_details.street} {p.address_details.building_number}, {p.address_details.city}
                              </p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* MAPA */}
                      <div className="h-[360px] border border-white/5 overflow-hidden relative">
                        {selectedPoint ? (
                          <>
                            <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm px-4 py-3 border-b border-white/5">
                              <p className="font-mono text-[10px] text-[rgb(255,19,58)] font-bold tracking-widest">{selectedPoint.name}</p>
                              <p className="font-mono text-[10px] text-zinc-400 mt-0.5">
                                {selectedPoint.address_details.street} {selectedPoint.address_details.building_number}, {selectedPoint.address_details.city}
                              </p>
                            </div>
                            <iframe
                              width="100%"
                              height="100%"
                              style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(110%) brightness(0.9)' }}
                              src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedPoint.location.longitude - 0.004}%2C${selectedPoint.location.latitude - 0.004}%2C${selectedPoint.location.longitude + 0.004}%2C${selectedPoint.location.latitude + 0.004}&layer=mapnik&marker=${selectedPoint.location.latitude}%2C${selectedPoint.location.longitude}`}
                            />
                          </>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">Wybierz punkt z listy</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

          </div>

          {/* PODSUMOWANIE */}
          <div className="lg:col-span-5">
            <div className="border border-white/5 bg-zinc-950 sticky top-[100px]">

              <div className="px-8 py-6 border-b border-white/5">
                <p className="font-mono text-[10px] text-[rgb(255,19,58)] tracking-widest uppercase mb-1">Podsumowanie_</p>
                <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{items.length} {items.length === 1 ? 'pozycja' : 'pozycje'}</p>
              </div>

              <div className="px-8 py-6 space-y-4 border-b border-white/5">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div>
                      <p className="font-mono text-[11px] text-white uppercase tracking-tight">{item.name}</p>
                      <p className="font-mono text-[10px] text-[rgb(255,19,58)] tracking-widest mt-0.5">VIN: {item.vin}</p>
                      <p className="font-mono text-[10px] text-zinc-600 uppercase mt-0.5">Rozmiar: {item.size}</p>
                    </div>
                    <span className="font-mono text-sm text-white font-bold shrink-0">{item.price.toFixed(2)} PLN</span>
                  </div>
                ))}
              </div>

              <div className="px-8 py-6 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Dostawa</span>
                  <span className="font-mono text-[11px] text-[rgb(255,19,58)]">W cenie</span>
                </div>
              </div>

              <div className="px-8 py-6 border-b border-white/5">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Łącznie</span>
                  <span className="font-brand font-black italic text-4xl text-white tracking-tighter">{finalTotal.toFixed(2)} <span className="text-2xl">PLN</span></span>
                </div>
              </div>

              <div className="px-8 py-6">
                <button
                  onClick={handleCompleteOrder}
                  disabled={loading}
                  className={`w-full py-6 font-brand font-black italic text-xl uppercase tracking-widest transition-all ${
                    loading
                      ? 'bg-zinc-900 text-zinc-600 cursor-wait'
                      : 'bg-white text-black hover:bg-[rgb(255,19,58)] hover:text-white'
                  }`}
                >
                  {loading ? 'Przetwarzanie...' : 'Przejdź do płatności →'}
                </button>
                <p className="font-mono text-[9px] text-zinc-700 uppercase tracking-widest text-center mt-4">
                  Płatność obsługiwana przez Stripe
                </p>
              </div>

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
        <p className="animate-pulse font-mono tracking-widest uppercase text-xs text-zinc-600">Inicjalizacja_protokołu...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}