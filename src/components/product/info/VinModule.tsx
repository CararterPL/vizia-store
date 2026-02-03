'use client';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

export const VinModule = ({ series, isNRG, baseVin }: any) => {
  // 1. POLE POSITION - Zapowiedź dropu
  if (series === 'POLE_POSITION') {
    return (
      <div className="p-6 bg-zinc-900/30 border border-white/5 space-y-4">
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">VIN_Reservation_Status</span>
        <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase">
          Numer VIN zostanie odblokowany w momencie dropu. <br/>
          <span className="text-vizia-red font-bold">Zapisz się do NRG_NOTIFY</span>, aby otrzymać alert o starcie i zarezerwować swój numer przed innymi.
        </p>
        {/* Formularz zapisu dodany dla Pole Position zgodnie z prośbą */}
        {!isNRG && (
          <div className="flex gap-2 pt-2 border-t border-white/5 mt-4 pt-4">
            <Input label="EARLY_ACCESS" placeholder="Enter Email" />
            <div className="flex items-end pb-0.5">
              <Button size="sm">Notify_Me</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. THE_HIDEOUT - Widoczne dla wszystkich, ale VIN tylko po NRG
  if (series === 'THE_HIDEOUT' && !isNRG) {
    return (
      <div className="p-6 bg-vizia-red/5 border border-vizia-red/20 space-y-4">
        <span className="text-[9px] font-mono text-vizia-red uppercase tracking-widest font-bold">NRG_Exclusive_Access</span>
        <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase">
          Seria <span className="text-white">The Hideout</span> jest dostępna wyłącznie dla zweryfikowanych członków sieci. 
          Zaloguj się, aby odblokować protokół VIN i możliwość zakupu.
        </p>
        <div className="flex gap-2 pt-2">
           <Input label="JOIN_NRG" placeholder="Enter Email" />
           <div className="flex items-end pb-0.5"><Button size="sm">Join</Button></div>
        </div>
      </div>
    );
  }

  // 3. CLASSICS_GARAGE - Tylko dla NRG
  if (series === 'CLASSICS_GARAGE' && !isNRG) {
    return (
      <div className="p-12 border border-dashed border-white/10 text-center">
        <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em]">Unauthorized_Access // 403</span>
      </div>
    );
  }

  // 4. STAN DOMYŚLNY (SHADOW RACE lub dowolna seria z aktywnym NRG)
  return (
    <div className="p-6 bg-white/[0.02] border border-white/5 space-y-6">
      <div className="flex justify-between items-start">
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Permanent_VIN_Protocol</span>
        {isNRG && <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 border border-emerald-500/20 uppercase font-mono tracking-tighter">Personalization_Active</span>}
      </div>

      <div className="flex flex-wrap items-center font-brand font-black italic text-xl md:text-2xl tracking-tighter">
        <span className="opacity-20">{baseVin}</span>
        {isNRG ? (
          <input 
            maxLength={2} 
            className="w-12 bg-transparent border-b border-vizia-red text-vizia-red outline-none text-center ml-1 uppercase"
            placeholder="XX"
          />
        ) : (
          <span className="text-white ml-1 animate-pulse">XX</span>
        )}
      </div>

      {!isNRG && (
        <div className="pt-4 border-t border-white/5 space-y-4">
          <p className="text-[10px] font-mono text-zinc-500 uppercase leading-tight">
             Jako gość otrzymasz <span className="text-white">losowy numer VIN</span>. <br/>
             Zapisz się do NRG, aby wybrać własny sufiks.
          </p>
          <div className="flex gap-2">
             <Input label="JOIN_NRG" placeholder="Enter Email" />
             <div className="flex items-end pb-0.5"><Button size="sm">Join</Button></div>
          </div>
        </div>
      )}
    </div>
  );
};