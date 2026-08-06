import React, { useMemo, useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// Прайс за квадратний метр плівки та ширина рулону (см)
const PRICE_PER_SQM = 520;
const ROLL_WIDTH_CM = 58;
const PRICE_PER_MP = Math.round((PRICE_PER_SQM * ROLL_WIDTH_CM) / 100); // грн за 1 м.п. рулону

const PRINT_TYPES = [
  { value: 'dtf_premium', label: 'ДТФ плівка преміум', pricePerSqm: 520 },
  { value: 'dtf_foil_gold', label: 'ДТФ золота фольга', pricePerSqm: 590 },
  { value: 'dtf_glitter_gold', label: 'ДТФ золото глітер', pricePerSqm: 620 },
  { value: 'uv_dtf_premium', label: 'УФ ДТФ плівка преміум', pricePerSqm: 610 },
  { value: 'uv_dtf_gold', label: 'УФ ДТФ золота', pricePerSqm: 660 },
];

function fmtUah(v) {
  if (!v || !isFinite(v)) return '0 грн';
  return `${Math.round(v).toLocaleString('uk-UA')} грн`;
}

function fmtMp(v) {
  if (!v || !isFinite(v)) return '0 м.п.';
  const rounded = Math.round(v * 10) / 10;
  return `${rounded.toLocaleString('uk-UA')} м.п.`;
}

export default function Calculator() {
  const [printType, setPrintType] = useState(PRINT_TYPES[0].value);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [qty, setQty] = useState(0);
  const [open, setOpen] = useState(false);

  const activeType = PRINT_TYPES.find((t) => t.value === printType) || PRINT_TYPES[0];

  const result = useMemo(() => {
    const w = parseFloat(width) || 0;
    const l = parseFloat(length) || 0;
    const n = parseInt(qty) || 0;

    if (w <= 0 || l <= 0 || n <= 0) {
      return { valid: false, orientation: 'Не визначено', filmLength: 0, pricePerMp: PRICE_PER_MP, total: 0, perPiece: 0 };
    }

    const pricePerSqm = activeType.pricePerSqm;
    const pricePerMp = Math.round((pricePerSqm * ROLL_WIDTH_CM) / 100);

    // варіант 1: елемент орієнтовано вздовж рулону (ширина елемента ⊥ ширині рулону)
    const perRowA = Math.floor(ROLL_WIDTH_CM / w);
    const rowsA = perRowA > 0 ? Math.ceil(n / perRowA) : 0;
    const filmLenA = rowsA * l;

    // варіант 2: повернутий на 90° (ширина елемента = довжина вздовж рулону)
    const perRowB = Math.floor(ROLL_WIDTH_CM / l);
    const rowsB = perRowB > 0 ? Math.ceil(n / perRowB) : 0;
    const filmLenB = rowsB * w;

    let filmLength, orientation;
    if (rowsA > 0 && (rowsB === 0 || filmLenA <= filmLenB)) {
      filmLength = filmLenA / 100; // см → м.п.
      orientation = perRowA > 1 ? 'Вздовж рулону' : 'Поздовжня';
    } else if (rowsB > 0) {
      filmLength = filmLenB / 100;
      orientation = perRowB > 1 ? 'Поперечна' : 'Поперек рулону';
    } else {
      filmLength = 0;
      orientation = 'Не визначено';
    }

    const total = filmLength * pricePerMp;
    const perPiece = total / n;

    return { valid: true, orientation, filmLength, pricePerMp, total, perPiece };
  }, [width, length, qty, activeType]);

  const ResultRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="text-sm font-bold text-[#007788]">{value}</span>
    </div>
  );

  return (
    <section id="calculator" className="py-14 bg-background scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#007788]/10 flex items-center justify-center">
              <CalcIcon className="w-5 h-5 text-[#007788]" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground">Розрахунок вартості</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6 ml-13">
            Введіть параметри для розрахунку вартості (усі поля обов'язкові)
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: inputs */}
            <div className="space-y-4 lg:pr-8 lg:border-r border-slate-200">
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Оберіть тип друку:</label>
                <Select value={printType} onValueChange={setPrintType}>
                  <SelectTrigger className="w-full h-11 rounded-lg border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRINT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Ширина елемента (см)</label>
                <Input
                  type="number"
                  min="0"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Довжина елемента (см)</label>
                <Input
                  type="number"
                  min="0"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Кількість (шт)</label>
                <Input
                  type="number"
                  min="0"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="h-11 rounded-lg"
                />
              </div>
            </div>

            {/* Right: results */}
            <div className="lg:pl-2">
              <ResultRow label="Оптимальна орієнтація" value={result.orientation} />
              <ResultRow label="Довжина плівки (мп)" value={fmtMp(result.filmLength)} />
              <ResultRow label="Вартість 1 м.п." value={fmtUah(result.pricePerMp)} />
              <ResultRow label="Вартість тиражу" value={fmtUah(result.total)} />
              <ResultRow label="Вартість за шт" value={fmtUah(result.perPiece)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}