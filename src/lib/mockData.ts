export type TxStatus = "verified" | "pending" | "rejected";

export type Transaction = {
  id: string;
  loanId: string;
  userName: string;
  amount: number;
  date: string;
  status: TxStatus;
  imageUrl?: string;
  note?: string;
};

export type Participant = {
  id: string;
  name: string;
  mobile: string;
  contribution: number;
  pending: number;
};

export type Loan = {
  id: string;
  name: string;
  total: number;
  remaining: number;
  interestRate: number;
  durationMonths: number;
  startDate: string;
  participants: Participant[];
};

export type Notification = {
  id: string;
  type: "added" | "verified" | "rejected" | "invite";
  title: string;
  desc: string;
  time: string;
  isRead: boolean;
};

export const currentUser = {
  name: "Prabhu Kiran",
  mobile: "+91 79818 47809",
};

export const loans: Loan[] = [
  {
    id: "l1",
    name: "Personal Gold Loan",
    total: 200000,
    remaining: 120000,
    interestRate: 9.5,
    durationMonths: 12,
    startDate: "2026-01-15",
    participants: [
      {
        id: "p1",
        name: "Aarav Sharma",
        mobile: "+91 98765 43210",
        contribution: 80000,
        pending: 120000,
      },
    ],
  },
  {
    id: "l2",
    name: "Family Gold Loan",
    total: 235000,
    remaining: 235000,
    interestRate: 10,
    durationMonths: 12,
    startDate: "2026-04-28",
    participants: [
      {
        id: "p1",
        name: "Aarav Sharma",
        mobile: "+91 98765 43210",
        contribution: 0,
        pending: 200000,
      },
      {
        id: "p2",
        name: "Priya Sharma",
        mobile: "+91 91234 56780",
        contribution: 0,
        pending: 200000,
      },
      {
        id: "p3",
        name: "Rohan Sharma",
        mobile: "+91 99887 76655",
        contribution: 0,
        pending: 200000,
      },
    ],
  },
];

export const transactions: Transaction[] = [
  {
    id: "t1",
    loanId: "l1",
    userName: "Aarav Sharma",
    amount: 20000,
    date: "2026-04-10",
    status: "verified",
  },
  {
    id: "t2",
    loanId: "l1",
    userName: "Aarav Sharma",
    amount: 15000,
    date: "2026-03-12",
    status: "verified",
    note: "Paid less than expected",
  },
  {
    id: "t3",
    loanId: "l2",
    userName: "Priya Sharma",
    amount: 25000,
    date: "2026-04-22",
    status: "pending",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
  },
  {
    id: "t4",
    loanId: "l2",
    userName: "Rohan Sharma",
    amount: 18000,
    date: "2026-04-05",
    status: "rejected",
    note: "Receipt unclear",
  },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "verified",
    title: "Payment verified",
    desc: "Your ₹20,000 payment was approved",
    time: "2h ago",
    isRead: true,
  },
  {
    id: "n2",
    type: "added",
    title: "New payment added",
    desc: "Priya added ₹25,000 to Family Gold Loan",
    time: "5h ago",
    isRead: false,
  },
  {
    id: "n3",
    type: "rejected",
    title: "Payment rejected",
    desc: "Rohan's ₹18,000 was rejected",
    time: "1d ago",
    isRead: true,
  },
  {
    id: "n4",
    type: "invite",
    title: "Loan invite",
    desc: "You were invited to 'Wedding Loan'",
    time: "3d ago",
    isRead: false,
  },
];

export const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

export function projectionFor(loan: Loan) {
  const monthly = loan.total / loan.durationMonths;
  const r = loan.interestRate / 100 / 12;
  let remaining = loan.total;
  const rows = [];
  for (let i = 1; i <= loan.durationMonths; i++) {
    const interest = remaining * r;
    const principal = monthly;
    remaining = Math.max(0, remaining - principal);
    rows.push({
      month: i,
      payment: monthly + interest,
      interest,
      principal,
      remaining,
    });
  }
  return rows;
}
