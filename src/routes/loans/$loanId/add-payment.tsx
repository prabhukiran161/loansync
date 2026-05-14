import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import { loans, fmt } from "@/lib/mockData";
import { ImagePlus, Info, CheckCircle2, Wallet } from "lucide-react";
import { SpecificNotFound } from "@/components/SpecificNotFound";

export const Route = createFileRoute("/loans/$loanId/add-payment")({
  component: AddPaymentForm,
  notFoundComponent: () => (
    <SpecificNotFound title="Error" icon={Wallet} message="Loan Not Found" />
  ),
});

function AddPaymentForm() {
  const { loanId } = Route.useParams();
  const loan = loans.find((l) => l.id === loanId);
  const nav = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  if (!loan) {
    return (
      <SpecificNotFound title="Error" icon={Wallet} message="Loan Not Found" />
    );
  }
  const multi = loan.participants.length > 1;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nav({ to: "/ledger" });
  };

  return (
    <MobileShell hideNav>
      <div className="flex flex-col min-h-full pb-8">
        <ScreenHeader title="Record Payment" backTo={`/add-payment`} />

        <div className="px-5 mt-2">
          <div className="bg-muted/50 rounded-[16px] px-4 py-3 flex justify-between items-center border border-border/50">
            <div>
              <p className="text-[12px] text-muted-foreground font-medium">
                Paying towards
              </p>
              <p className="text-[14px] font-bold text-foreground leading-tight mt-0.5 truncate max-w-37.5">
                {loan.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-muted-foreground font-medium">
                Remaining
              </p>
              <p className="text-[14px] font-bold text-foreground leading-tight mt-0.5">
                {fmt(loan.remaining)}
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-[13px] font-bold text-muted-foreground/80 uppercase tracking-widest mb-3">
                Amount
              </p>
              <div className="flex items-center justify-center">
                <span
                  className={`text-[40px] font-bold mr-1 transition-colors ${amount ? "text-foreground" : "text-foreground/20"}`}
                >
                  ₹
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  required
                  value={amount}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setAmount(val);
                  }}
                  placeholder="0"
                  className="text-[56px] font-bold text-foreground w-45 text-center outline-none placeholder:text-foreground/20"
                  style={{ MozAppearance: "textfield" }}
                />
              </div>

              <button
                type="button"
                onClick={() => setAmount("16667")}
                className="mt-3 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-[12px] font-bold hover:bg-primary/20 active:scale-95 transition-all"
              >
                Tap for EMI: ₹16,667
              </button>
            </div>

            <Field
              label="Date of Payment"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              required
            />

            <label className="block">
              <span className="text-[14px] font-semibold text-foreground mb-2 block ml-1">
                Receipt / Proof
              </span>
              <div
                className={`
              mt-1 border-2 border-dashed rounded-[20px] p-6 text-center cursor-pointer transition-all duration-200
              ${image ? "border-primary/50 bg-primary/5" : "border-border/60 hover:border-primary/40 bg-muted/20"}
            `}
              >
                {image ? (
                  <div className="relative inline-block">
                    <img
                      src={image}
                      alt="Receipt preview"
                      className="max-h-40 mx-auto rounded-[12px] shadow-sm"
                    />
                    <div className="absolute -top-3 -right-3 bg-background rounded-full p-0.5 shadow-md">
                      <CheckCircle2
                        size={26}
                        className="text-emerald-500 bg-white rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-background shadow-sm flex items-center justify-center mb-3">
                      <ImagePlus size={24} className="text-primary" />
                    </div>
                    <p className="text-[14px] font-bold text-foreground">
                      Tap to upload receipt
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-1">
                      JPEG, PNG, or PDF
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setImage(URL.createObjectURL(f));
                  }}
                />
              </div>
            </label>

            {multi && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-[16px] p-4 flex gap-3 items-start mt-2">
                <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[13px] font-bold text-amber-900">
                    Verification Required
                  </p>
                  <p className="text-[12px] text-amber-700/90 mt-0.5 leading-relaxed font-medium">
                    Because this is a collaborative loan, this payment will be
                    marked as <strong>Pending</strong> until the other members
                    verify it.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full h-14 rounded-[16px] text-[16px] font-bold shadow-md"
              >
                Submit Payment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MobileShell>
  );
}
