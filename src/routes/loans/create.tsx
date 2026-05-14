import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/Field";
import { Plus, X, Users, Wallet, Percent } from "lucide-react";

export const Route = createFileRoute("/loans/create")({
  component: CreateLoan,
});

type CoBorrower = { mobile: string; liability: string };

function CreateLoan() {
  const nav = useNavigate();
  const [members, setMembers] = useState<CoBorrower[]>([]);

  const addMember = () =>
    setMembers([...members, { mobile: "", liability: "" }]);
  const removeMember = (index: number) =>
    setMembers(members.filter((_, i) => i !== index));
  const updateMember = (
    index: number,
    field: keyof CoBorrower,
    value: string,
  ) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  return (
    <MobileShell hideNav>
      <div className="flex flex-col min-h-full pb-10">
        <ScreenHeader title="New Loan" backTo="/loans" />

        <div className="px-5 mt-2">
          <div className="bg-primary/10 rounded-[20px] p-5 flex items-center gap-4 border border-primary/20 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Wallet size={24} />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-foreground leading-tight">
                Create a Loan
              </h2>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                Track your personal or shared loans.
              </p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/loans" });
            }}
            className="flex flex-col gap-6 mt-6"
          >
            <div className="space-y-5">
              <Field
                label="Loan Title"
                placeholder="e.g. Wedding Gold Loan"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Principal (₹)"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="200000"
                  required
                />
                <Field
                  label="Interest Rate (%)"
                  type="text"
                  inputMode="decimal"
                  placeholder="9.5"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Duration (Months)"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="12"
                  required
                />
                <Field
                  label="Start Date"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  required
                />
              </div>
            </div>

            <div className="h-px bg-border/60 my-2" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[15px] font-bold text-foreground flex items-center gap-2">
                    <Users size={18} className="text-primary" /> Co-Borrowers
                  </h3>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    Define liability splits for members.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {members.map((m, i) => (
                  <div key={i} className="flex gap-3 items-start group">
                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        type="tel"
                        value={m.mobile}
                        onChange={(e) =>
                          updateMember(i, "mobile", e.target.value)
                        }
                        placeholder="Mobile number"
                        className="w-full bg-card border border-border/60 rounded-[14px] px-4 py-3 text-[14px] focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                        required
                      />
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={m.liability}
                          onChange={(e) =>
                            updateMember(i, "liability", e.target.value)
                          }
                          placeholder="Liability split"
                          className="w-full bg-card border border-border/60 rounded-[14px] px-4 py-3 text-[14px] focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm pr-10"
                          required
                        />
                        <Percent
                          size={14}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeMember(i)}
                      className="w-12 h-12 rounded-[14px] bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center transition-colors shadow-sm shrink-0 mt-0.5"
                      aria-label="Remove member"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addMember}
                  className="w-full border-2 border-dashed border-border/60 hover:border-primary/40 bg-muted/10 rounded-[16px] py-4 flex items-center justify-center gap-2 text-[14px] font-semibold text-muted-foreground hover:text-primary transition-all active:scale-[0.98]"
                >
                  <Plus size={18} /> Add Participant
                </button>
              </div>
            </div>

            <div className="mt-4">
              <Button
                type="submit"
                className="w-full h-14 rounded-[16px] text-[16px] font-bold shadow-md"
              >
                Create Loan
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MobileShell>
  );
}
