import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  ShieldCheck,
  Loader2,
  History,
} from "lucide-react";
import { CURRENT_CONTRACT } from "@/lib/contractConfig";

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DocumentsSection() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogRecord, setDialogRecord] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    base44.auth
      .me()
      .then(setUser)
      .finally(() => setLoadingUser(false));
  }, []);

  const { data: acceptances = [], isLoading } = useQuery({
    queryKey: ["my-acceptances", user?.id],
    queryFn: () =>
      base44.entities.DocumentAcceptance.filter(
        { user_id: user.id },
        "-accepted_at"
      ),
    enabled: !!user,
  });

  const hasAcceptedCurrent = acceptances.some(
    (a) =>
      a.document_version === CURRENT_CONTRACT.version &&
      a.document_type === CURRENT_CONTRACT.type
  );
  const hasAcceptedAny = acceptances.length > 0;
  const needsAcceptance = !hasAcceptedCurrent;
  const newRevision = hasAcceptedAny && !hasAcceptedCurrent;

  const handleAccept = async () => {
    if (!agreed) return;
    setAccepting(true);
    let ip = "";
    try {
      const r = await fetch("https://api.ipify.org?format=json");
      ip = (await r.json()).ip || "";
    } catch {
      ip = "";
    }
    try {
      await base44.entities.DocumentAcceptance.create({
        document_type: CURRENT_CONTRACT.type,
        document_title: CURRENT_CONTRACT.title,
        document_version: CURRENT_CONTRACT.version,
        document_hash: CURRENT_CONTRACT.hash,
        user_id: user.id,
        email: user.email,
        accepted_at: new Date().toISOString(),
        ip_address: ip,
      });
      setAgreed(false);
      toast({ title: "Договір прийнято" });
    } catch {
      toast({
        title: "Не вдалося прийняти договір",
        variant: "destructive",
      });
    } finally {
      setAccepting(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="bg-card border rounded-xl shadow-sm p-10 flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Поточний договір */}
      <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#037291]/10 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-[#037291]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {CURRENT_CONTRACT.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Версія {CURRENT_CONTRACT.version} · набуває чинності з{" "}
              {formatDate(CURRENT_CONTRACT.effectiveDate)}
            </p>
          </div>
        </div>

        {/* Статус */}
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 mb-5 ${
            hasAcceptedCurrent
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {hasAcceptedCurrent ? (
            <>
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-sm font-semibold">Статус: Прийнято</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-semibold">
                Статус: Потрібно прийняти
              </span>
            </>
          )}
        </div>

        {/* Повідомлення про нову редакцію */}
        {newRevision && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-3 mb-5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">
              Вийшла нова редакція договору (версія {CURRENT_CONTRACT.version}).
              Для продовження користування послугами потрібно прийняти умови
              знову.
            </p>
          </div>
        )}

        {/* Кнопка перегляду */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              setDialogRecord(null);
              setDialogOpen(true);
            }}
          >
            <Eye className="w-4 h-4" />
            Переглянути договір
          </Button>

          {needsAcceptance && (
            <Button
              onClick={handleAccept}
              disabled={!agreed || accepting}
              className="bg-[#037291] hover:bg-[#035a72] text-white gap-2"
            >
              {accepting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              {accepting ? "Прийняття..." : "Прийняти договір"}
            </Button>
          )}
        </div>

        {/* Чекбокс згоди */}
        {needsAcceptance && (
          <label className="flex items-start gap-3 mt-5 cursor-pointer">
            <Checkbox
              checked={agreed}
              onCheckedChange={(v) => setAgreed(!!v)}
              className="mt-0.5"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              Я ознайомився та приймаю умови Договору публічної оферти
            </span>
          </label>
        )}
      </div>

      {/* Історія документів */}
      <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-[#037291]" />
          <h3 className="text-base font-bold text-foreground">
            Історія документів
          </h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        ) : acceptances.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            Історія прийняття документів порожня.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/60">
                  <th className="text-left font-semibold text-foreground px-3 py-2.5 border-b border-border">
                    Версія
                  </th>
                  <th className="text-left font-semibold text-foreground px-3 py-2.5 border-b border-border">
                    Дата прийняття
                  </th>
                  <th className="text-left font-semibold text-foreground px-3 py-2.5 border-b border-border">
                    Статус
                  </th>
                  <th className="text-right font-semibold text-foreground px-3 py-2.5 border-b border-border">
                    Переглянути
                  </th>
                </tr>
              </thead>
              <tbody>
                {acceptances.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-3 py-2.5 text-foreground">
                      {a.document_version}
                    </td>
                    <td className="px-3 py-2.5 text-muted-foreground">
                      {formatDate(a.accepted_at)}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Прийнято
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <button
                        onClick={() => {
                          setDialogRecord(a);
                          setDialogOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 text-[#037291] hover:underline text-xs font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Переглянути
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Діалог перегляду */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogRecord
                ? `Прийняття договору v${dialogRecord.document_version}`
                : CURRENT_CONTRACT.title}
            </DialogTitle>
            <DialogDescription>
              {dialogRecord
                ? `Прийнято ${formatDate(dialogRecord.accepted_at)}`
                : `Версія ${CURRENT_CONTRACT.version} · чинний з ${formatDate(
                    CURRENT_CONTRACT.effectiveDate
                  )}`}
            </DialogDescription>
          </DialogHeader>

          {dialogRecord ? (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="text-muted-foreground">Версія</div>
                <div className="text-foreground font-medium">
                  {dialogRecord.document_version}
                </div>
                <div className="text-muted-foreground">Дата прийняття</div>
                <div className="text-foreground font-medium">
                  {formatDate(dialogRecord.accepted_at)}
                </div>
                <div className="text-muted-foreground">Email</div>
                <div className="text-foreground font-medium">
                  {dialogRecord.email}
                </div>
                <div className="text-muted-foreground">IP-адреса</div>
                <div className="text-foreground font-medium">
                  {dialogRecord.ip_address || "—"}
                </div>
                <div className="text-muted-foreground">Hash документа</div>
                <div className="text-foreground font-mono text-xs break-all">
                  {dialogRecord.document_hash || "—"}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              {CURRENT_CONTRACT.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}