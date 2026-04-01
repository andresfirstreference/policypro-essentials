import { useState, useCallback } from "react";
import { jsPDF } from "jspdf";
import { Home, FolderOpen, Users, HelpCircle, Settings, ChevronRight, ChevronLeft, ShoppingCart, CheckCircle, X, ClipboardList, FileEdit, UserCheck, DollarSign, Monitor, Cog, Shield, Sparkles, Download, FileText, BookOpen, Package, ArrowUpRight, Search, Filter, RotateCcw, Plus, Upload, Pencil, Trash2, CreditCard, Building2, Loader2, Check, Eye, Lock, AlertCircle, Copy, ChevronDown } from "lucide-react";

const BLUE = "#1A6AFF", BLUE_LIGHT = "#EBF2FF", BLUE_BG = "#E8F2FE", GREEN = "#12A150", GREEN_BG = "#E6F7ED", AMBER = "#E0850A", AMBER_BG = "#FFF4E0", RED = "#D93025", BG = "#F4F6F9", TEXT = "#1A1D23", TEXT_SEC = "#5A5F6B", BORDER = "#E2E5EB", WHITE = "#FFFFFF";

const AREAS = ["Human Resources", "Finance & Accounting", "Information Technology", "Operations & Marketing"];
const CATEGORIES_HR = ["Employment", "Health and Safety", "Benefits", "Employee Relations", "Accessibility Standards"];
const JURISDICTIONS = ["Ontario", "All Canada", "Alberta", "British Columbia", "Manitoba", "Federal"];

const initEssentials = () => [
  { id: 1, name: "Workplace Violence Prevention", area: "Human Resources", jurisdiction: "Ontario", category: "Health and Safety", lastUpdate: "Mar 27, 2026", status: "Published", version: "2.1 v", mandatory: true, content: "This policy establishes the organization's commitment to preventing workplace violence in accordance with the Occupational Health and Safety Act (OHSA). All employers in Ontario are required to prepare and review annually a workplace violence policy and develop a program to implement it. This includes measures and procedures to control risks, a means of summoning immediate assistance, and a process for reporting incidents." },
  { id: 2, name: "Workplace Harassment Prevention", area: "Human Resources", jurisdiction: "Ontario", category: "Health and Safety", lastUpdate: "Mar 27, 2026", status: "Published", version: "2.0 v", mandatory: true, content: "This policy outlines the organization's zero-tolerance approach to workplace harassment as required under the OHSA. It defines harassment, outlines reporting procedures, investigation protocols, and consequences for violations. The policy must be reviewed annually and posted in a conspicuous location." },
  { id: 3, name: "Disconnecting from Work Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Employment", lastUpdate: "Mar 15, 2026", status: "Published", version: "1.3 v", mandatory: true, content: "As required under the Working for Workers Act for employers with 25 or more employees, this policy sets expectations regarding after-hours communication. It covers the right of employees to disconnect from work-related communications outside of working hours and must be provided within 30 days of hire." },
  { id: 4, name: "AODA Accessibility Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Accessibility Standards", lastUpdate: "Mar 10, 2026", status: "Published", version: "3.0 v", mandatory: true, content: "This policy ensures compliance with the Accessibility for Ontarians with Disabilities Act across five standards: customer service, employment, information and communication, public spaces, and transportation. Non-compliance penalties can reach $100,000 per day. Organizations must file accessibility compliance reports and maintain multi-year accessibility plans." },
  { id: 5, name: "Occupational Health & Safety Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Health and Safety", lastUpdate: "Feb 28, 2026", status: "Published", version: "2.4 v", mandatory: true, content: "This comprehensive OHS policy covers employer obligations under the Occupational Health and Safety Act including hazard identification, risk assessment, WHMIS training, workplace inspections, incident investigation, and joint health and safety committee requirements. Updated to reflect January 2026 washroom facility record requirements." },
  { id: 6, name: "Employment Standards Compliance", area: "Human Resources", jurisdiction: "Ontario", category: "Employment", lastUpdate: "Feb 20, 2026", status: "Published", version: "1.8 v", mandatory: true, content: "This policy ensures compliance with the Employment Standards Act covering minimum wage, hours of work, overtime, vacation, public holidays, leaves of absence, and termination requirements. Includes updates for Bill 149 pay transparency requirements and restrictions on Canadian experience requirements in job postings." },
  { id: 7, name: "Pay Transparency & Job Posting Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Employment", lastUpdate: "Feb 15, 2026", status: "Published", version: "1.0 v", mandatory: true, content: "As required under Bill 149, this policy mandates that all public job postings include salary ranges, disclose the use of AI in hiring processes, and exclude Canadian experience requirements. The policy applies to all positions posted externally and must be followed by all hiring managers and HR personnel." },
  { id: 8, name: "Leave of Absence Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Benefits", lastUpdate: "Jan 30, 2026", status: "Published", version: "2.2 v", mandatory: false, content: "This policy covers all statutory and discretionary leaves of absence including pregnancy loss leave (3 paid days), expanded bereavement leave (up to 8 weeks), extended illness leave, personal emergency leave, and restrictions on employer requests for sick notes on short absences. Updated to reflect 2025 and 2026 legislative changes." },
  { id: 9, name: "Privacy & Personal Information Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Employee Relations", lastUpdate: "Jan 20, 2026", status: "Published", version: "1.5 v", mandatory: true, content: "This policy governs the collection, use, disclosure, and retention of employee personal information in compliance with PIPEDA. It covers consent requirements, data minimization principles, secure storage, medical records separation, retention schedules, and employee rights to access their personal information." },
  { id: 10, name: "New Hire Information Requirements", area: "Human Resources", jurisdiction: "Ontario", category: "Employment", lastUpdate: "Jan 10, 2026", status: "Published", version: "1.0 v", mandatory: true, content: "As of July 2025, Ontario employers with 25 or more employees must provide new hires with prescribed written information before their first day or as soon as reasonably possible after employment begins. This policy outlines the required information and the standardized process for delivery and documentation." },
];

const initAddons = () => [
  { id: 101, name: "Expense Reimbursement Policy", area: "Finance & Accounting", jurisdiction: "All Canada", category: "Revenue Cycle", price: 149, docType: "Policy", issued: "Nov 12, 2025", content: "This policy establishes guidelines for employee expense reimbursement including eligible expenses, documentation requirements, approval workflows, per diem rates, and submission deadlines. Covers travel meals, business entertainment, professional development, and home office expenses." },
  { id: 102, name: "Procurement & Purchasing Policy", area: "Finance & Accounting", jurisdiction: "All Canada", category: "Purchasing Cycle", price: 149, docType: "Policy", issued: "Oct 5, 2025", content: "This policy governs the procurement process including vendor selection, purchase order requirements, approval thresholds, competitive bidding requirements, and contract management. Includes guidelines for sole-source justification and conflict of interest declarations." },
  { id: 103, name: "Travel Policy", area: "Finance & Accounting", jurisdiction: "All Canada", category: "Revenue Cycle", price: 129, docType: "Policy", issued: "Sep 18, 2025", content: "This policy covers business travel arrangements including booking procedures, class of travel, accommodation standards, meal allowances, personal vehicle use reimbursement rates, and international travel requirements including insurance and safety protocols." },
  { id: 104, name: "Acceptable Use of Technology", area: "Information Technology", jurisdiction: "All Canada", category: "IT Governance", price: 149, docType: "Policy", issued: "Dec 3, 2025", content: "This policy defines acceptable use of organizational technology resources including computers, networks, email, internet, mobile devices, and cloud services. Covers personal use limitations, security requirements, monitoring disclosure, and consequences of policy violations." },
  { id: 105, name: "Data Breach Response Policy", area: "Information Technology", jurisdiction: "All Canada", category: "IT Security", price: 179, docType: "Policy", issued: "Jan 8, 2026", content: "This policy establishes procedures for responding to data breaches including detection, containment, assessment, notification requirements under PIPEDA, remediation steps, and post-incident review. Includes roles and responsibilities, communication templates, and regulatory reporting timelines." },
  { id: 106, name: "BYOD Policy", area: "Information Technology", jurisdiction: "All Canada", category: "IT Governance", price: 129, docType: "Policy", issued: "Aug 22, 2025", content: "This policy governs the use of personal devices for work purposes including security requirements, supported devices, data separation, remote wipe capabilities, privacy considerations, and support boundaries. Covers smartphones, tablets, laptops, and wearable devices." },
  { id: 107, name: "Records Retention Policy", area: "Operations & Marketing", jurisdiction: "Ontario", category: "Operations", price: 149, docType: "Policy", issued: "Jul 14, 2025", content: "This policy establishes retention schedules for organizational records in compliance with provincial and federal requirements. Covers employee files, financial records, legal documents, contracts, correspondence, and electronic records. Includes destruction procedures and litigation hold protocols." },
  { id: 108, name: "Business Continuity Policy", area: "Operations & Marketing", jurisdiction: "All Canada", category: "Operations", price: 179, docType: "Policy", issued: "Nov 28, 2025", content: "This policy establishes the framework for maintaining critical business operations during disruptions. Covers risk assessment, business impact analysis, recovery strategies, communication plans, testing schedules, and plan maintenance. Includes pandemic, natural disaster, and cyber incident scenarios." },
];

const initReaders = () => [
  { id: 1, name: "Sarah Chen", role: "Reader", group: "HR Team 2026", status: "Active", email: "sarah.chen@company.ca" },
  { id: 2, name: "Marcus Williams", role: "Reader", group: "HR Team 2026", status: "Active", email: "m.williams@company.ca" },
  { id: 3, name: "Priya Sharma", role: "Reader", group: "Operations", status: "Active", email: "p.sharma@company.ca" },
  { id: 4, name: "David Park", role: "Co-editor", group: "HR Team 2026", status: "Active", email: "d.park@company.ca" },
  { id: 5, name: "Lisa Tremblay", role: "Reader", group: "Finance Team", status: "On Leave", email: "l.tremblay@company.ca" },
];

const initGroups = () => [
  { id: 1, name: "HR Team 2026", members: [1, 2, 4] },
  { id: 2, name: "Operations", members: [3] },
  { id: 3, name: "Finance Team", members: [5] },
];

const initManuals = () => [
  { id: 1, name: "Ontario HR Essentials Manual", jurisdiction: "Ontario", lastUpdate: "Mar 27, 2026", policyIds: [1,2,3,4,5,6,7,8,9,10] },
];

/* ── PDF Generator ─────────────────────────── */
function generatePDF(policy) {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(26, 106, 255);
  doc.text("FIRST REFERENCE", 20, 20);
  doc.setTextColor(90, 95, 107);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("PolicyPro® Essentials", 20, 26);
  doc.setDrawColor(226, 229, 235);
  doc.line(20, 30, 190, 30);
  doc.setTextColor(26, 29, 35);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(policy.name, 20, 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 95, 107);
  doc.text(`Area: ${policy.area}  |  Jurisdiction: ${policy.jurisdiction}  |  Category: ${policy.category}`, 20, 54);
  doc.text(`Version: ${policy.version || "1.0 v"}  |  Last Updated: ${policy.lastUpdate}  |  Status: ${policy.status}`, 20, 60);
  if (policy.mandatory) { doc.setTextColor(224, 133, 10); doc.text("MANDATORY POLICY", 20, 68); }
  doc.setDrawColor(226, 229, 235);
  doc.line(20, policy.mandatory ? 72 : 65, 190, policy.mandatory ? 72 : 65);
  const startY = policy.mandatory ? 82 : 75;
  doc.setTextColor(26, 29, 35);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Policy Statement", 20, startY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const content = policy.content || "This model policy provides a comprehensive framework for compliance with applicable requirements. It includes detailed guidelines, procedures, and best practices developed by First Reference's legal editors.";
  const lines = doc.splitTextToSize(content, 170);
  doc.text(lines, 20, startY + 10);
  const nextY = startY + 10 + lines.length * 5 + 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(26, 29, 35);
  doc.text("Scope", 20, nextY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("This policy applies to all employees, contractors, and third parties operating within the organization.", 20, nextY + 10);
  doc.text("Management is responsible for ensuring compliance and communicating updates to all affected parties.", 20, nextY + 16);
  doc.setDrawColor(226, 229, 235);
  doc.line(20, 275, 190, 275);
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text("This document is confidential and proprietary to the organization. Prepared by First Reference Inc.", 20, 280);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-CA")}`, 20, 284);
  doc.save(`${policy.name.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
}

function generateWord(policy) {
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><style>body{font-family:Calibri,sans-serif;margin:40px 60px;color:#1A1D23}h1{color:#1A6AFF;font-size:24px;margin-bottom:4px}h2{font-size:16px;margin-top:24px;border-bottom:1px solid #E2E5EB;padding-bottom:6px}.meta{color:#5A5F6B;font-size:11px;margin-bottom:20px}.mandatory{color:#E0850A;font-weight:bold;font-size:11px}p{line-height:1.7;font-size:12px}.footer{margin-top:40px;border-top:1px solid #E2E5EB;padding-top:10px;font-size:9px;color:#999}</style></head><body><p style="color:#1A6AFF;font-weight:bold;font-size:11px">FIRST REFERENCE | PolicyPro® Essentials</p><h1>${policy.name}</h1><p class="meta">Area: ${policy.area} | Jurisdiction: ${policy.jurisdiction} | Category: ${policy.category}<br>Version: ${policy.version || "1.0 v"} | Last Updated: ${policy.lastUpdate} | Status: ${policy.status}</p>${policy.mandatory ? '<p class="mandatory">MANDATORY POLICY</p>' : ''}<h2>Policy Statement</h2><p>${policy.content || "This model policy provides a comprehensive framework for compliance with applicable requirements."}</p><h2>Scope</h2><p>This policy applies to all employees, contractors, and third parties operating within the organization. Management is responsible for ensuring compliance and communicating updates to all affected parties.</p><h2>Responsibilities</h2><p>Senior management shall ensure adequate resources for policy implementation. Department heads are responsible for communicating this policy to their teams. All employees must acknowledge receipt and understanding of this policy.</p><h2>Review</h2><p>This policy shall be reviewed annually or when significant changes in legislation or organizational structure occur.</p><div class="footer">This document is confidential and proprietary. Prepared by First Reference Inc. Generated: ${new Date().toLocaleDateString("en-CA")}</div></body></html>`;
  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `${policy.name.replace(/[^a-zA-Z0-9]/g, "_")}.doc`; a.click();
  URL.revokeObjectURL(url);
}

function exportCSV(data, filename) {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(r => Object.values(r).map(v => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([headers + "\n" + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ── Styles ─────────────────────────────────── */
const S = {
  app: { display: "flex", height: "100vh", fontFamily: "'Noto Sans',sans-serif", background: BG, color: TEXT, fontSize: 14, overflow: "hidden" },
  sidebar: { width: 212, minWidth: 212, background: WHITE, borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", justifyContent: "space-between", overflowY: "auto", overflowX: "hidden" },
  navItem: a => ({ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", margin: "1px 8px", borderRadius: 8, cursor: "pointer", fontSize: 13.5, fontWeight: a ? 600 : 500, background: a ? BLUE : "transparent", color: a ? WHITE : TEXT_SEC, transition: "all 0.15s ease", whiteSpace: "nowrap" }),
  navSub: a => ({ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px 7px 40px", margin: "1px 8px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: a ? 600 : 400, color: a ? BLUE : TEXT_SEC, background: a ? BLUE_LIGHT : "transparent" }),
  content: { flex: 1, padding: "28px 32px 40px", overflow: "auto" },
  pageTitle: { fontSize: 28, fontWeight: 700, color: BLUE, marginBottom: 12 },
  infoBanner: { background: BLUE_BG, borderRadius: 8, padding: "12px 18px", marginBottom: 24, fontSize: 13.5, lineHeight: 1.6 },
  card: { background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px" },
  statCard: { background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px", flex: 1, minWidth: 160, cursor: "pointer", transition: "all 0.15s ease", boxShadow: "0 1px 3px rgba(11,17,32,0.06)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 11.5, fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: `2px solid ${BORDER}` },
  td: { padding: "14px 16px", fontSize: 13.5, borderBottom: `1px solid ${BORDER}`, verticalAlign: "top" },
  btn: (v, full) => ({ fontFamily: "'Noto Sans',sans-serif", fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.15s ease", background: v === "outline" ? WHITE : v === "danger" ? RED : BLUE, color: v === "outline" ? TEXT : WHITE, boxShadow: v === "outline" ? `inset 0 0 0 1.5px ${BORDER}` : "none", width: full ? "100%" : "auto", justifyContent: full ? "center" : "flex-start" }),
  input: { fontFamily: "'Noto Sans',sans-serif", padding: "10px 14px", borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13.5, color: TEXT, background: WHITE, width: "100%", outline: "none" },
  select: { fontFamily: "'Noto Sans',sans-serif", padding: "10px 14px", borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, color: TEXT_SEC, background: WHITE, width: "100%", cursor: "pointer" },
  modal: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modalBox: w => ({ background: WHITE, borderRadius: 14, padding: 32, maxWidth: w || 520, width: "92%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }),
  badge: (c, bg) => ({ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: c, background: bg || "transparent", padding: bg ? "3px 10px" : 0, borderRadius: 12 }),
  dot: c => ({ width: 7, height: 7, borderRadius: "50%", background: c, flexShrink: 0 }),
  tabs: { display: "flex", borderBottom: `2px solid ${BORDER}`, marginBottom: 20 },
  tab: a => ({ padding: "12px 28px", fontSize: 14, fontWeight: a ? 600 : 400, color: a ? TEXT : TEXT_SEC, cursor: "pointer", borderBottom: a ? `2px solid ${BLUE}` : "2px solid transparent", marginBottom: -2 }),
  priceBadge: { display: "inline-flex", alignItems: "center", gap: 4, background: "#FFF8F0", border: "1px solid #F5D5A8", borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 700, color: "#B8660E" },
  iconWrap: (c, bg) => ({ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: c, flexShrink: 0 }),
  toast: { position: "fixed", bottom: 24, right: 24, background: "#0B1120", color: WHITE, padding: "14px 22px", borderRadius: 10, fontSize: 13.5, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, zIndex: 2000, boxShadow: "0 8px 30px rgba(0,0,0,0.25)", animation: "slideUp 0.3s ease" },
  label: { fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 6, display: "block" },
  fieldGroup: { marginBottom: 16 },
  progressRing: p => ({ width: 52, height: 52, borderRadius: "50%", background: `conic-gradient(${BLUE} ${p*3.6}deg, ${BORDER} ${p*3.6}deg)`, display: "flex", alignItems: "center", justifyContent: "center" }),
  stripeCard: { background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px 18px", position: "relative" },
  cardBadge: { position: "absolute", top: -6, right: -8, width: 17, height: 17, borderRadius: "50%", background: RED, color: WHITE, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
};

const ModalHeader = ({ title, onClose }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h2>
    <div style={{ cursor: "pointer", padding: 4 }} onClick={onClose}><X size={20} /></div>
  </div>
);

const Pagination = ({ total, perPage, page, onChange }) => {
  const pages = Math.ceil(total / perPage);
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, padding: "14px 16px", fontSize: 13, color: TEXT_SEC }}>
      Rows per page
      <select style={{ fontFamily: "'Noto Sans',sans-serif", padding: "4px 8px", borderRadius: 6, border: `1px solid ${BORDER}`, fontSize: 12 }} value={perPage} readOnly><option>{perPage}</option></select>
      <span>Page {page} of {pages || 1}</span>
      <div style={{ display: "flex", gap: 4 }}>
        <span onClick={() => page > 1 && onChange(page - 1)} style={{ cursor: page > 1 ? "pointer" : "default", opacity: page > 1 ? 1 : 0.3 }}><ChevronLeft size={16} /></span>
        <span onClick={() => page < pages && onChange(page + 1)} style={{ cursor: page < pages ? "pointer" : "default", opacity: page < pages ? 1 : 0.3 }}><ChevronRight size={16} /></span>
      </div>
    </div>
  );
};

/* ── Main Component ─────────────────────────── */
export default function App() {
  // Navigation
  const [page, setPage] = useState("home");
  const [subPage, setSubPage] = useState(null);
  const [settingsPage, setSettingsPage] = useState("subscriptions");

  // Data
  const [myPolicies, setMyPolicies] = useState(initEssentials);
  const [manuals, setManuals] = useState(initManuals);
  const [readers, setReaders] = useState(initReaders);
  const [groups, setGroups] = useState(initGroups);
  const [archived] = useState([]);

  // Commerce
  const [cart, setCart] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [accessedPolicies, setAccessedPolicies] = useState(new Set());

  // Checkout flow
  const [checkoutStep, setCheckoutStep] = useState(null); // null, 'cart', 'method', 'details', 'review', 'processing', 'success'
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [receiptNo] = useState(() => `FR-${Date.now().toString(36).toUpperCase()}`);

  // UI
  const [searchQuery, setSearchQuery] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterJuris, setFilterJuris] = useState("");
  const [libraryTab, setLibraryTab] = useState("all");
  const [toast, setToast] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Modals
  const [policyDetail, setPolicyDetail] = useState(null);
  const [showCreatePolicy, setShowCreatePolicy] = useState(false);
  const [showCreateManual, setShowCreateManual] = useState(false);
  const [showAddReader, setShowAddReader] = useState(false);
  const [showAddToManual, setShowAddToManual] = useState(null);
  const [showEditGroup, setShowEditGroup] = useState(null);
  const [showRestore, setShowRestore] = useState(false);
  const [showEditManual, setShowEditManual] = useState(false);
  const [editManual, setEditManual] = useState(null);

  // Forms
  const [newPolicy, setNewPolicy] = useState({ name: "", area: "Human Resources", category: "Employment", jurisdiction: "Ontario" });
  const [newManual, setNewManual] = useState({ name: "", jurisdiction: "Ontario", policyIds: [] });
  const [newReader, setNewReader] = useState({ name: "", email: "", role: "Reader", group: "" });

  const currentPage = subPage || page;
  const handleNav = (id, pid) => { if (pid) { setPage(pid); setSubPage(id); } else { setPage(id); setSubPage(null); } setSearchQuery(""); setFilterArea(""); setFilterCat(""); setFilterJuris(""); setSelectedRows(new Set()); };
  const isActive = id => currentPage === id;
  const isParentActive = (pid, ch) => ch?.some(c => c.id === currentPage);

  const notify = useCallback((msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); }, []);

  // Commerce helpers
  const addToCart = p => { if (!cart.find(x => x.id === p.id) && !purchased.includes(p.id)) { setCart(c => [...c, p]); notify(`${p.name} added to cart`); } };
  const removeFromCart = id => setCart(c => c.filter(p => p.id !== id));
  const cartTotal = cart.reduce((s, p) => s + p.price, 0);

  const startCheckout = () => { if (cart.length > 0) setCheckoutStep("method"); };

  const processPayment = () => {
    setCheckoutStep("processing");
    setTimeout(() => {
      const newIds = cart.map(p => p.id);
      setPurchased(prev => [...prev, ...newIds]);
      const newPols = cart.map(p => ({ ...p, status: "Published", version: "1.0 v", lastUpdate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), mandatory: false }));
      setMyPolicies(prev => [...prev, ...newPols]);
      setCart([]);
      setCheckoutStep("success");
    }, 2500);
  };

  const closeCheckout = () => { setCheckoutStep(null); setPaymentMethod(null); setCardForm({ number: "", expiry: "", cvc: "", name: "" }); };

  const restorePolicy = (id) => {
    if (accessedPolicies.has(id)) return;
    setPurchased(p => p.filter(x => x !== id));
    setMyPolicies(p => p.filter(x => x.id !== id));
    notify("Policy removed and refunded");
  };

  // Policy actions
  const markAccessed = id => setAccessedPolicies(prev => new Set([...prev, id]));

  const handleDownloadPDF = (policy) => { markAccessed(policy.id); generatePDF(policy); notify(`${policy.name} downloaded as PDF`); };
  const handleDownloadWord = (policy) => { markAccessed(policy.id); generateWord(policy); notify(`${policy.name} downloaded as Word`); };

  const addFromLibrary = (policy) => {
    if (myPolicies.find(p => p.id === policy.id)) { notify("Already in your policies"); return; }
    setMyPolicies(prev => [...prev, { ...policy, status: "Published", version: policy.version || "1.0 v", lastUpdate: policy.lastUpdate || policy.issued }]);
    notify(`${policy.name} added to your policies`);
  };

  const createPolicy = () => {
    if (!newPolicy.name.trim()) return;
    const p = { id: Date.now(), name: newPolicy.name, area: newPolicy.area, category: newPolicy.category, jurisdiction: newPolicy.jurisdiction, lastUpdate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), status: "Draft", version: "1.0 v", mandatory: false, content: "" };
    setMyPolicies(prev => [...prev, p]);
    setShowCreatePolicy(false);
    setNewPolicy({ name: "", area: "Human Resources", category: "Employment", jurisdiction: "Ontario" });
    notify("Policy created");
  };

  const deleteSelected = () => {
    if (selectedRows.size === 0) return;
    setMyPolicies(prev => prev.filter(p => !selectedRows.has(p.id)));
    notify(`${selectedRows.size} policy(s) deleted`);
    setSelectedRows(new Set());
  };

  const createManual = () => {
    if (!newManual.name.trim() || newManual.policyIds.length === 0) return;
    setManuals(prev => [...prev, { id: Date.now(), name: newManual.name, jurisdiction: newManual.jurisdiction, lastUpdate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), policyIds: newManual.policyIds }]);
    setShowCreateManual(false);
    setNewManual({ name: "", jurisdiction: "Ontario", policyIds: [] });
    notify("Manual created");
  };

  const addReader = () => {
    if (!newReader.name.trim() || !newReader.email.trim()) return;
    const r = { id: Date.now(), ...newReader, status: "Active" };
    setReaders(prev => [...prev, r]);
    if (newReader.group) {
      setGroups(prev => prev.map(g => g.name === newReader.group ? { ...g, members: [...g.members, r.id] } : g));
    }
    setShowAddReader(false);
    setNewReader({ name: "", email: "", role: "Reader", group: "" });
    notify("Reader added");
  };

  const addPolicyToManual = (manualId) => {
    if (!showAddToManual) return;
    setManuals(prev => prev.map(m => m.id === manualId ? { ...m, policyIds: [...new Set([...m.policyIds, showAddToManual.id])] } : m));
    setShowAddToManual(null);
    notify("Policy added to manual");
  };

  const exportReportCSV = () => {
    const data = getReportData().map(r => ({ Reader: r.reader, Policy: r.policy, Manual: r.manual, Status: r.status, Group: r.group, "View Date": r.viewDate }));
    if (data.length) exportCSV(data, "policy_report.csv");
    notify("Report exported");
  };

  // Filtering
  const filterPolicies = (list) => {
    let f = list;
    if (searchQuery) f = f.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filterArea) f = f.filter(p => p.area === filterArea);
    if (filterCat) f = f.filter(p => p.category === filterCat);
    if (filterJuris) f = f.filter(p => p.jurisdiction === filterJuris);
    return f;
  };

  const resetFilters = () => { setSearchQuery(""); setFilterArea(""); setFilterCat(""); setFilterJuris(""); };

  const getReportData = () => {
    const data = [];
    manuals.forEach(m => {
      m.policyIds.forEach(pid => {
        const policy = myPolicies.find(p => p.id === pid);
        if (!policy) return;
        readers.forEach(r => {
          const group = groups.find(g => g.members.includes(r.id));
          if (!group) return;
          data.push({
            reader: r.name, policy: policy.name, manual: m.name,
            status: Math.random() > 0.5 ? "Completed" : "Pending",
            group: group.name, viewDate: Math.random() > 0.5 ? "Mar 28, 2026" : "N/A"
          });
        });
      });
    });
    return data.slice(0, 15);
  };

  const toggleRow = id => { const s = new Set(selectedRows); s.has(id) ? s.delete(id) : s.add(id); setSelectedRows(s); };

  const formatCardNumber = v => v.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + " / " + d.slice(2) : d; };

  // Filter bar component
  const FilterBar = ({ showSearch = true }) => (
    <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 130 }}><label style={S.label}>Area</label><select style={S.select} value={filterArea} onChange={e => setFilterArea(e.target.value)}><option value="">Select...</option>{AREAS.map(a => <option key={a}>{a}</option>)}</select></div>
      <div style={{ flex: 1, minWidth: 130 }}><label style={S.label}>Category</label><select style={S.select} value={filterCat} onChange={e => setFilterCat(e.target.value)}><option value="">Select...</option>{CATEGORIES_HR.map(c => <option key={c}>{c}</option>)}</select></div>
      <div style={{ flex: 1, minWidth: 130 }}><label style={S.label}>Jurisdiction</label><select style={S.select} value={filterJuris} onChange={e => setFilterJuris(e.target.value)}><option value="">Select...</option>{JURISDICTIONS.map(j => <option key={j}>{j}</option>)}</select></div>
      {showSearch && <div style={{ flex: 1.5, minWidth: 160 }}><label style={S.label}>&nbsp;</label><div style={{ position: "relative" }}><Search size={14} style={{ position: "absolute", left: 12, top: 12, color: TEXT_SEC }} /><input placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ ...S.input, paddingLeft: 34 }} /></div></div>}
      <button style={S.btn()} onClick={() => {}}><Filter size={14} /> Filter</button>
      <button style={S.btn("outline")} onClick={resetFilters}><RotateCcw size={14} /> Reset</button>
    </div>
  );

  /* ── CHECKOUT MODAL ──────────────────────── */
  const renderCheckout = () => {
    if (!checkoutStep) return null;
    return (
      <div style={S.modal} onClick={checkoutStep === "processing" ? undefined : closeCheckout}>
        <div style={S.modalBox(checkoutStep === "success" ? 520 : 480)} onClick={e => e.stopPropagation()}>
          {checkoutStep === "method" && (<>
            <ModalHeader title="Choose payment method" onClose={closeCheckout} />
            <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
              {[{ id: "card", icon: <CreditCard size={28} />, label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex" }, { id: "bank", icon: <Building2 size={28} />, label: "Bank Transfer", desc: "Direct debit from account" }].map(m => (
                <div key={m.id} onClick={() => setPaymentMethod(m.id)} style={{ flex: 1, padding: "20px 16px", border: `2px solid ${paymentMethod === m.id ? BLUE : BORDER}`, borderRadius: 12, cursor: "pointer", textAlign: "center", background: paymentMethod === m.id ? BLUE_LIGHT : WHITE, transition: "all 0.15s" }}>
                  <div style={{ color: paymentMethod === m.id ? BLUE : TEXT_SEC, marginBottom: 10 }}>{m.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 12, color: TEXT_SEC }}>{m.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ background: BG, borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 8 }}>Order summary</div>
              {cart.map(p => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}><span>{p.name}</span><span style={{ fontWeight: 600 }}>${p.price}</span></div>)}
              <div style={{ borderTop: `1px solid ${BORDER}`, marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15 }}><span>Total</span><span>${cartTotal} CAD</span></div>
            </div>
            <button disabled={!paymentMethod} onClick={() => setCheckoutStep("details")} style={{ ...S.btn(paymentMethod ? undefined : "outline", true), opacity: paymentMethod ? 1 : 0.5 }}>Continue</button>
          </>)}

          {checkoutStep === "details" && (<>
            <ModalHeader title={paymentMethod === "card" ? "Card details" : "Bank transfer details"} onClose={closeCheckout} />
            {paymentMethod === "card" ? (<>
              <div style={S.fieldGroup}><label style={S.label}>Cardholder name</label><input style={S.input} placeholder="Name on card" value={cardForm.name} onChange={e => setCardForm({ ...cardForm, name: e.target.value })} /></div>
              <div style={S.fieldGroup}><label style={S.label}>Card number</label><div style={{ position: "relative" }}><input style={{ ...S.input, paddingRight: 48 }} placeholder="1234 5678 9012 3456" value={cardForm.number} onChange={e => setCardForm({ ...cardForm, number: formatCardNumber(e.target.value) })} /><CreditCard size={18} style={{ position: "absolute", right: 14, top: 12, color: TEXT_SEC }} /></div></div>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ ...S.fieldGroup, flex: 1 }}><label style={S.label}>Expiry</label><input style={S.input} placeholder="MM / YY" value={cardForm.expiry} onChange={e => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })} /></div>
                <div style={{ ...S.fieldGroup, flex: 1 }}><label style={S.label}>CVC</label><input style={S.input} placeholder="123" maxLength={4} value={cardForm.cvc} onChange={e => setCardForm({ ...cardForm, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} /></div>
              </div>
            </>) : (<>
              <div style={S.fieldGroup}><label style={S.label}>Account holder name</label><input style={S.input} placeholder="Full legal name" /></div>
              <div style={S.fieldGroup}><label style={S.label}>Institution number</label><input style={S.input} placeholder="3 digits" maxLength={3} /></div>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ ...S.fieldGroup, flex: 1 }}><label style={S.label}>Transit number</label><input style={S.input} placeholder="5 digits" maxLength={5} /></div>
                <div style={{ ...S.fieldGroup, flex: 1 }}><label style={S.label}>Account number</label><input style={S.input} placeholder="7-12 digits" /></div>
              </div>
            </>)}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={() => setCheckoutStep("method")} style={S.btn("outline")}><ChevronLeft size={14} /> Back</button>
              <button onClick={() => setCheckoutStep("review")} style={{ ...S.btn(undefined, true) }}>Review order</button>
            </div>
          </>)}

          {checkoutStep === "review" && (<>
            <ModalHeader title="Review your order" onClose={closeCheckout} />
            <div style={{ background: BG, borderRadius: 8, padding: 16, marginBottom: 16 }}>
              {cart.map(p => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, padding: "6px 0", borderBottom: `1px solid ${BORDER}` }}><div><div style={{ fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{p.area}</div></div><span style={{ fontWeight: 700 }}>${p.price} CAD</span></div>)}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, fontSize: 17, fontWeight: 700 }}><span>Total</span><span>${cartTotal} CAD</span></div>
            </div>
            <div style={{ background: BG, borderRadius: 8, padding: 16, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              {paymentMethod === "card" ? <CreditCard size={20} color={BLUE} /> : <Building2 size={20} color={BLUE} />}
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>{paymentMethod === "card" ? "Credit / Debit Card" : "Bank Transfer"}</div>{paymentMethod === "card" && cardForm.number && <div style={{ fontSize: 12, color: TEXT_SEC }}>Ending in {cardForm.number.slice(-4)}</div>}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setCheckoutStep("details")} style={S.btn("outline")}><ChevronLeft size={14} /> Back</button>
              <button onClick={processPayment} style={{ ...S.btn(undefined, true) }}>Confirm and pay ${cartTotal} CAD</button>
            </div>
            <div style={{ fontSize: 11, color: TEXT_SEC, textAlign: "center", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><Lock size={12} /> Secured by First Reference. Policies added instantly.</div>
          </>)}

          {checkoutStep === "processing" && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <Loader2 size={44} color={BLUE} style={{ animation: "spin 1s linear infinite", marginBottom: 20 }} />
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Processing payment...</div>
              <div style={{ fontSize: 13.5, color: TEXT_SEC }}>Please do not close this window</div>
            </div>
          )}

          {checkoutStep === "success" && (<>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: GREEN_BG, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><CheckCircle size={28} color={GREEN} /></div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Payment successful!</h2>
              <div style={{ fontSize: 13, color: TEXT_SEC, marginBottom: 20 }}>Receipt #{receiptNo}</div>
            </div>
            <div style={{ background: BG, borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TEXT_SEC, marginBottom: 8 }}>Policies added to your account</div>
              {purchased.slice(-8).map(id => { const p = initAddons().find(x => x.id === id); return p ? <div key={id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 13.5 }}><CheckCircle size={14} color={GREEN} /><span style={{ fontWeight: 500 }}>{p.name}</span></div> : null; })}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { closeCheckout(); handleNav("my-policies", "hub"); }} style={S.btn(undefined, true)}>View my policies</button>
              <button onClick={closeCheckout} style={S.btn("outline")}>Close</button>
            </div>
          </>)}
        </div>
      </div>
    );
  };

  /* ── PAGES ───────────────────────────────── */
  const renderHome = () => (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}><span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg,#EBF2FF,#F0EAFF)", border: `1px solid ${BLUE}40`, borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.03em" }}>ESSENTIALS</span><span style={{ fontSize: 13, color: TEXT_SEC }}>PolicyPro®</span></div>
      <h1 style={{ fontSize: 30, fontWeight: 700, color: TEXT, margin: "8px 0 6px" }}>Welcome, Andres Guzman!</h1>
      <p style={{ fontSize: 14, color: TEXT_SEC, marginBottom: 28 }}>This is a summary of your policies and updates. Click a tile to view more details.</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        {[{ label: "Included policies", value: myPolicies.length, link: "View all", icon: <ClipboardList size={20} />, color: BLUE, bg: BLUE_LIGHT, onClick: () => handleNav("my-policies", "hub") },
          { label: "Add-on policies", value: purchased.length, link: "Browse store", icon: <Package size={20} />, color: "#7C3AED", bg: "#F3EEFF", onClick: () => handleNav("store", "hub") },
          { label: "Policies to review", value: myPolicies.filter(p => p.status === "Draft").length, link: "Check policies", icon: <FileEdit size={20} />, color: AMBER, bg: AMBER_BG, onClick: () => handleNav("my-policies", "hub") },
          { label: "Readers with tasks", value: readers.filter(r => r.status === "Active").length, link: "View report", icon: <UserCheck size={20} />, color: GREEN, bg: GREEN_BG, onClick: () => handleNav("reports", "readers") },
        ].map((item, i) => (
          <div key={i} style={S.statCard} onClick={item.onClick} role="button">
            <div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SEC, marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>{item.value}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: BLUE, fontWeight: 500, cursor: "pointer" }}>{item.link}</span>
              <div style={S.iconWrap(item.color, item.bg)}>{item.icon}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ ...S.card, flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: BLUE, marginBottom: 16 }}>Policy updates</h3>
          {myPolicies.slice(0, 4).map(p => (
            <div key={p.id} onClick={() => setPolicyDetail(p)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${BORDER}`, cursor: "pointer" }}>
              <div><div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{p.category} · {p.lastUpdate}</div></div>
              <span style={S.badge(p.status === "Published" ? GREEN : AMBER)}><span style={S.dot(p.status === "Published" ? GREEN : AMBER)} /> {p.status === "Published" ? "Current" : p.status}</span>
            </div>
          ))}
        </div>
        <div style={{ ...S.card, flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: BLUE, marginBottom: 16 }}>Recent activity</h3>
          {purchased.length > 0 ? purchased.slice(-3).map(id => { const p = initAddons().find(x => x.id === id); return p ? <div key={id} style={{ padding: "10px 0", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 8 }}><Package size={14} color={BLUE} /><div><div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>Purchased add-on policy</div></div></div> : null; }) : <div style={{ color: TEXT_SEC, fontSize: 13.5, textAlign: "center", padding: "32px 0" }}>There are no updates to display at the moment</div>}
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg,#0B1120,#1A3A5C)", borderRadius: 12, padding: "24px 28px", color: WHITE, marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#93B8FF", marginBottom: 6 }}>Expand your coverage</div><div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Need policies beyond HR?</div><div style={{ fontSize: 13.5, color: "#B0C4DE", lineHeight: 1.6 }}>Browse Finance, IT, and Operations policies in the Policy Store.</div></div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0, marginLeft: 24 }}><button onClick={() => handleNav("store", "hub")} style={{ ...S.btn(), background: WHITE, color: BLUE }}>Browse store</button></div>
        </div>
      </div>
    </div>
  );

  const renderMyPolicies = () => {
    const filtered = filterPolicies(myPolicies);
    return (<div>
      <h1 style={S.pageTitle}>My policies</h1>
      <div style={S.infoBanner}>Get access to your documents. Your Essentials plan includes Ontario HR policies. You can purchase additional policies from the <span onClick={() => handleNav("store", "hub")} style={{ color: BLUE, fontWeight: 600, cursor: "pointer" }}>Policy Store</span> or create one from scratch.</div>
      <FilterBar />
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>{selectedRows.size > 0 && <button style={S.btn("danger")} onClick={deleteSelected}><Trash2 size={14} /> Delete ({selectedRows.size})</button>}</div>
        <div style={{ display: "flex", gap: 10 }}><button style={S.btn("outline")} onClick={() => setShowCreatePolicy(true)}>Create policy</button><button onClick={() => handleNav("library", "hub")} style={S.btn()}><Plus size={14} /> Add policy from library</button></div>
      </div>
      <div style={S.card}><table style={S.table}><thead><tr><th style={{ ...S.th, width: 30 }}><input type="checkbox" onChange={e => { if (e.target.checked) setSelectedRows(new Set(filtered.map(p => p.id))); else setSelectedRows(new Set()); }} /></th><th style={S.th}>Name</th><th style={S.th}>Last Update</th><th style={S.th}>Status</th><th style={S.th}>Version</th></tr></thead>
      <tbody>{filtered.map(p => (<tr key={p.id} style={{ cursor: "pointer" }} onClick={() => { setPolicyDetail(p); markAccessed(p.id); }}><td style={S.td}><input type="checkbox" checked={selectedRows.has(p.id)} onClick={e => e.stopPropagation()} onChange={() => toggleRow(p.id)} /></td><td style={S.td}><div style={{ fontWeight: 600, marginBottom: 2 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{p.area} · {p.jurisdiction} · {p.category}</div></td><td style={S.td}>{p.lastUpdate}</td><td style={S.td}><span style={S.badge(p.status === "Published" ? GREEN : AMBER)}><span style={S.dot(p.status === "Published" ? GREEN : AMBER)} /> {p.status}</span></td><td style={S.td}>{p.version}</td></tr>))}</tbody></table>
      {filtered.length === 0 && <div style={{ textAlign: "center", padding: 32, color: TEXT_SEC }}>No policies found matching your filters.</div>}
      <Pagination total={filtered.length} perPage={10} page={1} onChange={() => {}} /></div>
    </div>);
  };

  const renderManuals = () => (<div>
    <h1 style={S.pageTitle}>My manuals</h1>
    <div style={S.infoBanner}>Manage your policy manuals from here. You can create, download, and maintain manuals.</div>
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}><button style={S.btn()} onClick={() => setShowCreateManual(true)}><Plus size={14} /> Create manual</button></div>
    <div style={S.card}><table style={S.table}><thead><tr><th style={S.th}>Name</th><th style={S.th}>Policies</th><th style={S.th}>Jurisdiction</th><th style={S.th}>Last Update</th><th style={{ ...S.th, textAlign: "right" }}>Actions</th></tr></thead>
    <tbody>{manuals.map(m => (<tr key={m.id}><td style={{ ...S.td, fontWeight: 600, cursor: "pointer" }} onClick={() => { setEditManual({ ...m }); setShowEditManual(true); }}>{m.name}</td><td style={S.td}>{m.policyIds.length} policies</td><td style={S.td}>{m.jurisdiction}</td><td style={S.td}>{m.lastUpdate}</td><td style={{ ...S.td, textAlign: "right", display: "flex", gap: 8, justifyContent: "flex-end" }}><button onClick={() => { setEditManual({ ...m }); setShowEditManual(true); }} style={{ ...S.btn("outline"), padding: "6px 12px", fontSize: 12.5 }}><Pencil size={13} /> Edit</button><button onClick={() => { const mPols = myPolicies.filter(p => m.policyIds.includes(p.id)); mPols.forEach(p => generatePDF(p)); notify("Manual downloaded as PDFs"); }} style={{ ...S.btn("outline"), padding: "6px 12px", fontSize: 12.5 }}><Download size={13} /> Download</button><button onClick={() => { setManuals(prev => prev.filter(x => x.id !== m.id)); notify("Manual deleted"); }} style={{ ...S.btn("outline"), padding: "6px 12px", fontSize: 12.5, color: RED, boxShadow: `inset 0 0 0 1.5px ${RED}30` }}><Trash2 size={13} /></button></td></tr>))}</tbody></table></div>
  </div>);

  const renderArchived = () => (<div><h1 style={S.pageTitle}>Archived</h1><div style={S.infoBanner}>All versions of your policies are stored here.</div><div style={S.card}><table style={S.table}><thead><tr><th style={S.th}>Name</th><th style={S.th}>Modified</th><th style={S.th}>Modified By</th></tr></thead><tbody><tr><td colSpan={3} style={{ ...S.td, textAlign: "center", color: TEXT_SEC, padding: 40 }}>No archived policies yet. Previous versions will appear here when you update a policy.</td></tr></tbody></table></div></div>);

  const renderLibrary = () => {
    const addons = initAddons();
    const all = [...initEssentials().map(p => ({ ...p, included: true, inMyPolicies: myPolicies.some(mp => mp.id === p.id), docType: "Policy", issued: p.lastUpdate })), ...addons.map(p => ({ ...p, included: false, isPurchased: purchased.includes(p.id), inMyPolicies: myPolicies.some(mp => mp.id === p.id), docType: p.docType, issued: p.issued }))];
    const byTab = libraryTab === "essential" ? all.filter(p => p.included) : libraryTab === "addons" ? all.filter(p => !p.included) : all;
    const filtered = filterPolicies(byTab);
    return (<div>
      <h1 style={S.pageTitle}>PolicyPro® library</h1>
      <div style={S.infoBanner}>Access sample policies and documents from First Reference. Your Essentials plan includes 10 Ontario HR policies. Additional policies are available for individual purchase.</div>
      <div style={{ position: "relative", marginBottom: 20 }}><Search size={16} style={{ position: "absolute", left: 14, top: 13, color: TEXT_SEC }} /><input placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ ...S.input, paddingLeft: 38 }} /></div>
      <FilterBar showSearch={false} />
      <div style={S.tabs}>{[["all","All policies"],["essential","Included in plan"],["addons","Available add-ons"]].map(([k,l]) => <div key={k} style={S.tab(libraryTab===k)} onClick={() => setLibraryTab(k)}>{l}</div>)}</div>
      <div style={S.card}><table style={S.table}><thead><tr><th style={S.th}>Policy Name</th><th style={S.th}>Type</th><th style={S.th}>Issued</th><th style={{ ...S.th, textAlign: "right" }}></th></tr></thead>
      <tbody>{filtered.map(p => (<tr key={p.id}><td style={S.td}><div style={{ display: "flex", alignItems: "center" }}><span style={{ fontWeight: 600 }}>{p.name}</span>{p.mandatory && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: AMBER, marginLeft: 10 }}><Shield size={12} /> Mandatory</span>}</div><div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 2 }}>{p.area} · {p.jurisdiction} · {p.category}</div></td>
        <td style={S.td}>{p.docType}</td><td style={S.td}>{p.issued}</td>
        <td style={{ ...S.td, textAlign: "right" }}>{p.included ? (p.inMyPolicies ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: GREEN, background: GREEN_BG, padding: "4px 12px", borderRadius: 20 }}><CheckCircle size={14} /> In my policies</span> : <button onClick={() => addFromLibrary(p)} style={{ ...S.btn(), fontSize: 12.5, padding: "6px 14px" }}><Plus size={14} /> Add to my policies</button>)
        : p.isPurchased ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: GREEN, background: GREEN_BG, padding: "4px 12px", borderRadius: 20 }}><CheckCircle size={14} /> Purchased</span>
        : <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}><span style={S.priceBadge}>${p.price} CAD</span>{cart.find(c => c.id === p.id) ? <span style={{ fontSize: 12.5, fontWeight: 600, color: GREEN, display: "inline-flex", alignItems: "center", gap: 4 }}><CheckCircle size={14} /> In cart</span> : <button onClick={() => addToCart(p)} style={{ fontFamily: "'Noto Sans',sans-serif", fontSize: 12.5, fontWeight: 600, padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: "#F0F7FF", color: BLUE, display: "inline-flex", alignItems: "center", gap: 5 }}><ShoppingCart size={14} /> Purchase</button>}</div>}</td></tr>))}</tbody></table></div>
    </div>);
  };

  const renderStore = () => (<div>
    <h1 style={S.pageTitle}>Policy store</h1>
    <div style={S.infoBanner}>Expand your policy coverage beyond HR essentials. Purchase individual policies with expert commentary, compliance guidance, and automatic updates.</div>
    <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
      {[{ area: "Finance & Accounting", count: 3, icon: <DollarSign size={22} />, color: "#7C3AED", bg: "#F3EEFF" },{ area: "Information Technology", count: 3, icon: <Monitor size={22} />, color: "#0891B2", bg: "#ECFEFF" },{ area: "Operations & Marketing", count: 2, icon: <Cog size={22} />, color: "#B45309", bg: "#FFF7ED" }].map((c,i) => (
        <div key={i} style={{ ...S.card, flex: 1, minWidth: 200, borderTop: `3px solid ${c.color}` }}><div style={{ ...S.iconWrap(c.color, c.bg), marginBottom: 12, width: 44, height: 44 }}>{c.icon}</div><div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{c.area}</div><div style={{ fontSize: 13, color: TEXT_SEC }}>{c.count} policies available</div></div>
      ))}
    </div>
    {["Finance & Accounting","Information Technology","Operations & Marketing"].map(area => (<div key={area} style={{ marginBottom: 28 }}><h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>{area}</h2><div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>{initAddons().filter(p => p.area === area).map(p => { const own = purchased.includes(p.id); const inC = cart.find(c => c.id === p.id); return (<div key={p.id} style={{ ...S.card, flex: "1 1 280px", maxWidth: 340, display: "flex", flexDirection: "column", justifyContent: "space-between" }}><div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}><div style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.4, paddingRight: 8 }}>{p.name}</div>{own ? <span style={{ ...S.badge(GREEN, GREEN_BG), fontSize: 11, whiteSpace: "nowrap" }}>Owned</span> : <span style={{ ...S.priceBadge, fontSize: 12 }}>${p.price}</span>}</div><div style={{ fontSize: 12.5, color: TEXT_SEC, marginBottom: 4 }}>{p.category}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>Jurisdiction: {p.jurisdiction}</div></div><div style={{ marginTop: 16 }}>{own ? <button onClick={() => { const pol = myPolicies.find(x => x.id === p.id); if (pol) { setPolicyDetail(pol); markAccessed(pol.id); } }} style={{ ...S.btn("outline", true), fontSize: 12.5 }}><Eye size={14} /> View policy</button> : inC ? <button onClick={() => removeFromCart(p.id)} style={{ ...S.btn("outline", true), fontSize: 12.5, color: RED, boxShadow: `inset 0 0 0 1.5px ${RED}30` }}>Remove from cart</button> : <button onClick={() => addToCart(p)} style={{ ...S.btn(undefined, true), fontSize: 12.5 }}><ShoppingCart size={14} /> Add to cart · ${p.price} CAD</button>}</div></div>); })}</div></div>))}
    <div style={{ background: "linear-gradient(135deg,#0B1120,#1A3A5C)", borderRadius: 12, padding: "24px 28px", color: WHITE }}><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#93B8FF", marginBottom: 6 }}>Full access</div><div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Upgrade to PolicyPro® Complete</div><div style={{ fontSize: 13.5, color: "#B0C4DE", lineHeight: 1.6, marginBottom: 16 }}>Get access to all 500+ policies across every area and jurisdiction for $1,699/year.</div><button style={{ ...S.btn(), background: WHITE, color: BLUE }}><ArrowUpRight size={14} /> Learn about upgrade</button></div>
  </div>);

  const renderReaderGroups = () => (<div><h1 style={S.pageTitle}>Reader groups</h1><div style={S.infoBanner}>Manage your list of readers, add new ones, and organize them into groups.</div><div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}><button style={S.btn()} onClick={() => { const name = prompt("Enter group name:"); if (name) { setGroups(prev => [...prev, { id: Date.now(), name, members: [] }]); notify("Group created"); } }}><Plus size={14} /> Create group</button></div><div style={S.card}><table style={S.table}><thead><tr><th style={S.th}>Group Name</th><th style={S.th}>Members</th><th style={S.th}></th></tr></thead><tbody>{groups.map(g => (<tr key={g.id}><td style={{ ...S.td, fontWeight: 600 }}>{g.name}</td><td style={S.td}>{g.members.length} readers <span onClick={() => handleNav("list-readers", "readers")} style={{ color: BLUE, marginLeft: 8, cursor: "pointer", fontWeight: 500 }}>View List</span></td><td style={{ ...S.td, textAlign: "right" }}><span style={{ color: TEXT_SEC, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}><Pencil size={14} /> Edit</span></td></tr>))}</tbody></table></div></div>);

  const renderListReaders = () => (<div><h1 style={S.pageTitle}>List of readers</h1><div style={S.infoBanner}>Manage your list of readers, add new ones, organize them into groups, and assign manuals.</div><div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 16 }}><button style={S.btn()} onClick={() => setShowAddReader(true)}><Plus size={14} /> Add new reader</button></div><div style={S.card}><table style={S.table}><thead><tr><th style={S.th}>Reader</th><th style={S.th}>Email</th><th style={S.th}>Role</th><th style={S.th}>Group</th><th style={S.th}>Status</th></tr></thead><tbody>{readers.map(r => (<tr key={r.id}><td style={{ ...S.td, fontWeight: 600 }}>{r.name}</td><td style={{ ...S.td, color: TEXT_SEC }}>{r.email}</td><td style={S.td}>{r.role}</td><td style={S.td}><span style={{ color: BLUE }}>{r.group}</span></td><td style={S.td}><span style={{ color: r.status === "Active" ? GREEN : AMBER, fontWeight: 500 }}>{r.status}</span></td></tr>))}</tbody></table></div></div>);

  const renderReports = () => {
    const data = getReportData();
    const done = data.filter(r => r.status === "Completed").length;
    const pct = data.length ? Math.round((done / data.length) * 100) : 0;
    return (<div><h1 style={S.pageTitle}>Reports</h1><div style={S.infoBanner}>This section provides a detailed summary of readers who haven't read the policies or who have pending tasks.</div>
      <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
        <div style={{ ...S.statCard, display: "flex", alignItems: "center", gap: 20 }}><div><div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SEC, marginBottom: 4 }}>Tasks completed</div><div style={{ fontSize: 28, fontWeight: 700 }}>{done}/{data.length}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>Policies successfully completed.</div></div><div style={S.progressRing(pct)}><div style={{ width: 38, height: 38, borderRadius: "50%", background: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{pct}%</div></div></div>
        <div style={S.statCard}><div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SEC, marginBottom: 4 }}>Out-of-date policies</div><div style={{ fontSize: 28, fontWeight: 700 }}>0</div></div>
        <div style={S.statCard}><div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SEC, marginBottom: 4 }}>Expired tasks</div><div style={{ fontSize: 28, fontWeight: 700 }}>0</div></div>
      </div>
      <div style={S.card}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Activity: All readers</h3><button style={S.btn("outline")} onClick={exportReportCSV}><Download size={14} /> Export CSV</button></div>
      <table style={S.table}><thead><tr><th style={S.th}>Reader</th><th style={S.th}>Policy</th><th style={S.th}>Manual</th><th style={S.th}>Status</th><th style={S.th}>Group</th><th style={S.th}>View Date</th></tr></thead>
      <tbody>{data.map((r, i) => <tr key={i}><td style={{ ...S.td, fontWeight: 500 }}>{r.reader}</td><td style={S.td}>{r.policy}</td><td style={S.td}>{r.manual}</td><td style={S.td}><span style={{ color: r.status === "Completed" ? GREEN : AMBER, fontWeight: 500 }}>{r.status}</span></td><td style={S.td}>{r.group}</td><td style={S.td}>{r.viewDate}</td></tr>)}</tbody></table></div>
    </div>);
  };

  const renderHelp = () => (<div><h1 style={S.pageTitle}>Ask First Reference</h1><div style={S.infoBanner}>Get quick and reliable answers to your most pressing HR, payroll, and internal controls questions with <strong>Ask First Reference</strong>. Our team is ready to assist you!</div><div style={S.card}><div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 20 }}><div style={{ flex: 1, minWidth: 200 }}><label style={S.label}>General area of my question</label><select style={S.select}><option>Select...</option>{AREAS.map(a => <option key={a}>{a}</option>)}</select></div><div style={{ flex: 1, minWidth: 200 }}><label style={S.label}>Jurisdiction</label><select style={S.select}><option>Select...</option>{JURISDICTIONS.map(j => <option key={j}>{j}</option>)}</select></div></div><label style={S.label}>Question</label><textarea placeholder="Type your question here." style={{ ...S.input, minHeight: 120, resize: "vertical" }} /><div style={{ marginTop: 16, textAlign: "right" }}><button style={S.btn()} onClick={() => notify("Question submitted! Our team will respond within 24 hours.")}>Submit question</button></div></div></div>);

  const renderSettings = () => (<div>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><ChevronLeft size={18} style={{ cursor: "pointer" }} onClick={() => handleNav("home")} /><span style={{ fontSize: 16, fontWeight: 700 }}>Settings</span></div>
    <div style={{ display: "flex", gap: 24 }}>
      <div style={{ width: 180, flexShrink: 0 }}>
        {["subscriptions", "billing", "company", "my-account"].map(s => (
          <div key={s} onClick={() => setSettingsPage(s)} style={{ padding: "9px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: settingsPage === s ? 600 : 400, background: settingsPage === s ? BLUE : "transparent", color: settingsPage === s ? WHITE : TEXT_SEC, marginBottom: 2 }}>
            {{ subscriptions: "Subscriptions", billing: "Billing & invoices", company: "Company information", "my-account": "My account" }[s]}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>
        {settingsPage === "subscriptions" && (<div>
          <h1 style={S.pageTitle}>Subscriptions</h1>
          <div style={S.infoBanner}>View your current subscription details and manage purchased add-ons.</div>
          <div style={{ ...S.card, maxWidth: 420, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 16, fontWeight: 700 }}>PolicyPro® Essentials</span><span style={{ ...S.badge(GREEN, GREEN_BG) }}>Active</span></div>
            <div style={{ fontSize: 24, fontWeight: 700, color: BLUE, marginBottom: 16 }}>$599.00/year</div>
            {["10 Ontario HR Essential Policies", "Auto Updates", "Customization", "Policy Distribution", "Compliance Monitor"].map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13 }}><Check size={14} color={GREEN} />{f}</div>)}
          </div>
          {purchased.length > 0 && (<div style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Purchased add-ons</h3><button onClick={() => setShowRestore(true)} style={S.btn("outline")}><RotateCcw size={14} /> Restore purchases</button></div>
            {purchased.map(id => { const p = initAddons().find(x => x.id === id); return p ? <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${BORDER}` }}><div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{p.area}</div></div><div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontWeight: 600 }}>${p.price} CAD</span>{accessedPolicies.has(id) && <span style={{ fontSize: 11, color: AMBER, display: "inline-flex", alignItems: "center", gap: 3 }}><Eye size={12} /> Accessed</span>}</div></div> : null; })}
          </div>)}
        </div>)}
        {settingsPage === "billing" && (<div><h1 style={S.pageTitle}>Billing & invoices</h1><div style={S.infoBanner}>View your current subscription invoice details below.</div><div style={S.card}><table style={S.table}><thead><tr><th style={S.th}>Plan</th><th style={S.th}>Billing</th><th style={S.th}>Status</th><th style={S.th}>Periods</th></tr></thead><tbody><tr><td style={S.td}>Essentials Plan</td><td style={S.td}>Annual</td><td style={S.td}><span style={{ color: GREEN, fontWeight: 500 }}>Active</span></td><td style={S.td}>Mar 25, 2026 to Mar 24, 2027</td></tr></tbody></table></div></div>)}
        {settingsPage === "company" && (<div><h1 style={S.pageTitle}>Company information</h1><div style={S.infoBanner}>Use this section to view and update your company information.</div><div style={S.card}><div style={S.fieldGroup}><label style={S.label}>Company name</label><input style={S.input} defaultValue="Canadian Company 2026" /></div><div style={S.fieldGroup}><label style={S.label}>Address</label><input style={S.input} defaultValue="501 Yonge Street" /></div><div style={{ display: "flex", gap: 14 }}><div style={{ ...S.fieldGroup, flex: 1 }}><label style={S.label}>City</label><input style={S.input} defaultValue="Toronto" /></div><div style={{ ...S.fieldGroup, flex: 1 }}><label style={S.label}>Province</label><select style={S.select}><option>Ontario</option></select></div></div><div style={{ textAlign: "right", marginTop: 8 }}><button style={S.btn()}>Save changes</button></div></div></div>)}
        {settingsPage === "my-account" && (<div><h1 style={S.pageTitle}>My profile</h1><div style={S.infoBanner}>In this section you can edit your personal information.</div><div style={S.card}><div style={{ display: "flex", gap: 14 }}><div style={{ ...S.fieldGroup, flex: 1 }}><label style={S.label}>First name</label><input style={{ ...S.input, background: "#F4F6F9" }} defaultValue="Andres" readOnly /></div><div style={{ ...S.fieldGroup, flex: 1 }}><label style={S.label}>Last name</label><input style={{ ...S.input, background: "#F4F6F9" }} defaultValue="Guzman" readOnly /></div></div><div style={S.fieldGroup}><label style={S.label}>Email</label><input style={{ ...S.input, background: "#F4F6F9" }} defaultValue="afguzmanc@gmail.com" readOnly /></div><div style={{ textAlign: "right" }}><button style={S.btn()}>Save changes</button></div></div></div>)}
      </div>
    </div>
  </div>);

  const pages = { home: renderHome, "my-policies": renderMyPolicies, "my-manuals": renderManuals, archived: renderArchived, library: renderLibrary, store: renderStore, "reader-groups": renderReaderGroups, "list-readers": renderListReaders, reports: renderReports, help: renderHelp, settings: renderSettings };

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "hub", label: "PolicyPro® hub", icon: <FolderOpen size={18} />, children: [{ id: "my-policies", label: "My policies" },{ id: "my-manuals", label: "My manuals" },{ id: "archived", label: "Archived" },{ id: "library", label: "PolicyPro® library" },{ id: "store", label: "Policy store" }] },
    { id: "readers", label: "Readers and reports", icon: <Users size={18} />, children: [{ id: "reader-groups", label: "Reader groups" },{ id: "list-readers", label: "List of readers" },{ id: "reports", label: "Reports" }] },
    { id: "help", label: "Help", icon: <HelpCircle size={18} /> },
  ];

  return (
    <div style={S.app}>
      {/* Sidebar */}
      <div style={S.sidebar}>
        <div style={{ padding: "18px 16px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}><div style={{ width: 32, height: 32, background: BLUE, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontWeight: 800, fontSize: 13 }}>FR</div><div><div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>First Reference</div><div style={{ fontSize: 10, fontWeight: 600, color: BLUE }}>PolicyPro® Essentials</div></div></div>
          {navItems.map(item => (<div key={item.id} style={{ marginBottom: 4 }}><div style={S.navItem(isActive(item.id) || isParentActive(item.id, item.children))} onClick={() => item.children ? handleNav(item.children[0].id, item.id) : handleNav(item.id)}>{item.icon}<span>{item.label}</span></div>{item.children && (isActive(item.id) || isParentActive(item.id, item.children)) && <div style={{ marginTop: 2 }}>{item.children.map(ch => <div key={ch.id} style={S.navSub(isActive(ch.id))} onClick={() => handleNav(ch.id, item.id)}>{ch.label}</div>)}</div>}</div>))}
        </div>
        <div style={{ padding: "12px 8px 16px", borderTop: `1px solid ${BORDER}` }}><div style={S.navItem(currentPage === "settings")} onClick={() => handleNav("settings")}><Settings size={18} /><span>Settings</span></div></div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "12px 32px", display: "flex", justifyContent: "flex-end", alignItems: "center", minHeight: 52, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => { if (cart.length) setCheckoutStep("method"); else setCheckoutStep(null); setCheckoutStep(prev => prev ? null : "cart"); }}><ShoppingCart size={18} color={TEXT_SEC} />{cart.length > 0 && <div style={S.cardBadge}>{cart.length}</div>}</div>
            <div style={{ fontSize: 13, color: TEXT_SEC, textAlign: "right", lineHeight: 1.3 }}><div style={{ fontWeight: 600, color: TEXT }}>Canadian Company 2026</div><div>Andres Guzman</div></div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: BLUE_LIGHT, color: BLUE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>AG</div>
          </div>
        </div>
        <div style={S.content}>{pages[currentPage] ? pages[currentPage]() : renderHome()}</div>
      </div>

      {/* Cart mini-modal */}
      {checkoutStep === "cart" && <div style={S.modal} onClick={() => setCheckoutStep(null)}><div style={S.modalBox(440)} onClick={e => e.stopPropagation()}><ModalHeader title="Your cart" onClose={() => setCheckoutStep(null)} />{cart.length === 0 ? <div style={{ textAlign: "center", padding: "32px 0", color: TEXT_SEC }}><ShoppingCart size={40} strokeWidth={1.2} style={{ marginBottom: 12, opacity: 0.4 }} /><div style={{ fontSize: 14 }}>Your cart is empty</div></div> : <>{cart.map(p => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${BORDER}` }}><div><div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{p.area}</div></div><div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontWeight: 700 }}>${p.price}</span><span onClick={() => removeFromCart(p.id)} style={{ color: RED, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Remove</span></div></div>)}<div style={{ display: "flex", justifyContent: "space-between", padding: "18px 0 8px", fontSize: 16, fontWeight: 700 }}><span>Total</span><span>${cartTotal} CAD</span></div><button onClick={startCheckout} style={{ ...S.btn(undefined, true), padding: "12px 20px", fontSize: 15, marginTop: 8 }}>Proceed to checkout</button></>}</div></div>}

      {/* Checkout flow */}
      {checkoutStep && checkoutStep !== "cart" && renderCheckout()}

      {/* Policy Detail */}
      {policyDetail && <div style={S.modal} onClick={() => setPolicyDetail(null)}><div style={S.modalBox(600)} onClick={e => e.stopPropagation()}><ModalHeader title={policyDetail.name} onClose={() => setPolicyDetail(null)} /><div style={{ fontSize: 13, color: TEXT_SEC, marginTop: -12, marginBottom: 16 }}>{policyDetail.area} · {policyDetail.jurisdiction} · {policyDetail.category}</div><div style={{ display: "flex", gap: 16, marginBottom: 16 }}>{[{ l: "Status", c: <span style={S.badge(policyDetail.status === "Published" ? GREEN : AMBER)}><span style={S.dot(policyDetail.status === "Published" ? GREEN : AMBER)} /> {policyDetail.status}</span> },{ l: "Version", c: <span style={{ fontWeight: 600 }}>{policyDetail.version}</span> },{ l: "Last update", c: <span style={{ fontWeight: 600 }}>{policyDetail.lastUpdate}</span> }].map((x, i) => <div key={i} style={{ flex: 1, padding: "12px 16px", background: BG, borderRadius: 8 }}><div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, marginBottom: 4 }}>{x.l}</div>{x.c}</div>)}</div>
        {policyDetail.mandatory && <div style={{ background: AMBER_BG, border: `1px solid ${AMBER}40`, borderRadius: 8, padding: "10px 16px", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Shield size={16} color={AMBER} /> This policy is mandatory for Ontario employers</div>}
        <div style={{ background: BG, borderRadius: 8, padding: 20, marginBottom: 20 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Policy content</div><div style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.7 }}>{policyDetail.content || "This model policy provides a comprehensive framework for compliance with applicable requirements."}</div></div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><button onClick={() => handleDownloadPDF(policyDetail)} style={S.btn()}><Download size={14} /> Download PDF</button><button onClick={() => handleDownloadWord(policyDetail)} style={S.btn("outline")}><FileText size={14} /> Download Word</button><button onClick={() => setShowAddToManual(policyDetail)} style={S.btn("outline")}><BookOpen size={14} /> Add to manual</button>{accessedPolicies.has(policyDetail.id) && <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: GREEN, marginLeft: 8 }}><Eye size={14} /> Accessed</span>}</div></div></div>}

      {/* Create Policy Modal */}
      {showCreatePolicy && <div style={S.modal} onClick={() => setShowCreatePolicy(false)}><div style={S.modalBox(480)} onClick={e => e.stopPropagation()}><ModalHeader title="Create new policy" onClose={() => setShowCreatePolicy(false)} /><div style={S.fieldGroup}><label style={S.label}>Policy name</label><input style={S.input} placeholder="Enter policy name" value={newPolicy.name} onChange={e => setNewPolicy({ ...newPolicy, name: e.target.value })} /></div><div style={S.fieldGroup}><label style={S.label}>Area</label><select style={S.select} value={newPolicy.area} onChange={e => setNewPolicy({ ...newPolicy, area: e.target.value })}>{AREAS.map(a => <option key={a}>{a}</option>)}</select></div><div style={S.fieldGroup}><label style={S.label}>Category</label><select style={S.select} value={newPolicy.category} onChange={e => setNewPolicy({ ...newPolicy, category: e.target.value })}>{CATEGORIES_HR.map(c => <option key={c}>{c}</option>)}</select></div><div style={S.fieldGroup}><label style={S.label}>Jurisdiction</label><select style={S.select} value={newPolicy.jurisdiction} onChange={e => setNewPolicy({ ...newPolicy, jurisdiction: e.target.value })}>{JURISDICTIONS.map(j => <option key={j}>{j}</option>)}</select></div><div style={{ display: "flex", gap: 10 }}><button onClick={() => setShowCreatePolicy(false)} style={S.btn("outline")}>Cancel</button><button onClick={createPolicy} style={{ ...S.btn(undefined, true) }}>Create policy</button></div></div></div>}

      {/* Create Manual Modal */}
      {showCreateManual && <div style={S.modal} onClick={() => setShowCreateManual(false)}><div style={S.modalBox(520)} onClick={e => e.stopPropagation()}><ModalHeader title="Create new manual" onClose={() => setShowCreateManual(false)} /><div style={S.fieldGroup}><label style={S.label}>Manual name</label><input style={S.input} placeholder="e.g. Ontario HR Manual 2026" value={newManual.name} onChange={e => setNewManual({ ...newManual, name: e.target.value })} /></div><div style={S.fieldGroup}><label style={S.label}>Jurisdiction</label><select style={S.select} value={newManual.jurisdiction} onChange={e => setNewManual({ ...newManual, jurisdiction: e.target.value })}>{JURISDICTIONS.map(j => <option key={j}>{j}</option>)}</select></div><div style={S.fieldGroup}><label style={S.label}>Select policies to include</label><div style={{ maxHeight: 220, overflowY: "auto", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 8 }}>{myPolicies.map(p => <label key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", cursor: "pointer", fontSize: 13 }}><input type="checkbox" checked={newManual.policyIds.includes(p.id)} onChange={e => { if (e.target.checked) setNewManual({ ...newManual, policyIds: [...newManual.policyIds, p.id] }); else setNewManual({ ...newManual, policyIds: newManual.policyIds.filter(x => x !== p.id) }); }} />{p.name}</label>)}</div></div><div style={{ display: "flex", gap: 10 }}><button onClick={() => setShowCreateManual(false)} style={S.btn("outline")}>Cancel</button><button onClick={createManual} style={{ ...S.btn(undefined, true) }}>Create manual ({newManual.policyIds.length} policies)</button></div></div></div>}

      {/* Add Reader Modal */}
      {showAddReader && <div style={S.modal} onClick={() => setShowAddReader(false)}><div style={S.modalBox(440)} onClick={e => e.stopPropagation()}><ModalHeader title="Add new reader" onClose={() => setShowAddReader(false)} /><div style={S.fieldGroup}><label style={S.label}>Full name</label><input style={S.input} placeholder="e.g. Jane Smith" value={newReader.name} onChange={e => setNewReader({ ...newReader, name: e.target.value })} /></div><div style={S.fieldGroup}><label style={S.label}>Email</label><input style={S.input} type="email" placeholder="jane.smith@company.ca" value={newReader.email} onChange={e => setNewReader({ ...newReader, email: e.target.value })} /></div><div style={S.fieldGroup}><label style={S.label}>Role</label><select style={S.select} value={newReader.role} onChange={e => setNewReader({ ...newReader, role: e.target.value })}><option>Reader</option><option>Co-editor</option></select></div><div style={S.fieldGroup}><label style={S.label}>Assign to group</label><select style={S.select} value={newReader.group} onChange={e => setNewReader({ ...newReader, group: e.target.value })}><option value="">Select group...</option>{groups.map(g => <option key={g.id}>{g.name}</option>)}</select></div><div style={{ display: "flex", gap: 10 }}><button onClick={() => setShowAddReader(false)} style={S.btn("outline")}>Cancel</button><button onClick={addReader} style={{ ...S.btn(undefined, true) }}>Add reader</button></div></div></div>}

      {/* Add to Manual Modal */}
      {showAddToManual && <div style={S.modal} onClick={() => setShowAddToManual(null)}><div style={S.modalBox(400)} onClick={e => e.stopPropagation()}><ModalHeader title="Add to manual" onClose={() => setShowAddToManual(null)} /><p style={{ fontSize: 13.5, marginBottom: 16 }}>Select a manual to add <strong>{showAddToManual.name}</strong> to:</p>{manuals.map(m => <div key={m.id} onClick={() => addPolicyToManual(m.id)} style={{ padding: "12px 16px", border: `1px solid ${BORDER}`, borderRadius: 8, marginBottom: 8, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{m.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{m.policyIds.length} policies</div></div>{m.policyIds.includes(showAddToManual.id) ? <span style={{ fontSize: 12, color: GREEN }}>Already added</span> : <Plus size={18} color={BLUE} />}</div>)}</div></div>}

      {/* Restore Purchases Modal */}
      {showRestore && <div style={S.modal} onClick={() => setShowRestore(false)}><div style={S.modalBox(480)} onClick={e => e.stopPropagation()}><ModalHeader title="Restore purchases" onClose={() => setShowRestore(false)} /><div style={S.infoBanner}>Policies that have been opened or downloaded cannot be restored. Only unused policies are eligible for removal and refund.</div>{purchased.map(id => { const p = initAddons().find(x => x.id === id); const accessed = accessedPolicies.has(id); return p ? <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${BORDER}` }}><div><div style={{ fontWeight: 600, fontSize: 13.5 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>${p.price} CAD · {p.area}</div></div>{accessed ? <span style={{ fontSize: 12, color: TEXT_SEC, display: "inline-flex", alignItems: "center", gap: 4 }}><Lock size={12} /> Cannot restore</span> : <button onClick={() => { restorePolicy(id); }} style={{ ...S.btn("outline"), fontSize: 12, padding: "6px 14px", color: RED, boxShadow: `inset 0 0 0 1.5px ${RED}30` }}><RotateCcw size={12} /> Restore</button>}</div> : null; })}{purchased.length === 0 && <div style={{ textAlign: "center", padding: 24, color: TEXT_SEC }}>No purchased add-ons to restore.</div>}</div></div>}

      {/* Edit Manual Modal */}
      {showEditManual && editManual && <div style={S.modal} onClick={() => setShowEditManual(false)}><div style={S.modalBox(520)} onClick={e => e.stopPropagation()}><ModalHeader title="Edit manual" onClose={() => setShowEditManual(false)} />
        <div style={S.fieldGroup}><label style={S.label}>Manual name</label><input style={S.input} value={editManual.name} onChange={e => setEditManual({ ...editManual, name: e.target.value })} /></div>
        <div style={S.fieldGroup}><label style={S.label}>Jurisdiction</label><select style={S.select} value={editManual.jurisdiction} onChange={e => setEditManual({ ...editManual, jurisdiction: e.target.value })}>{JURISDICTIONS.map(j => <option key={j}>{j}</option>)}</select></div>
        <div style={S.fieldGroup}><label style={S.label}>Policies in this manual</label><div style={{ maxHeight: 240, overflowY: "auto", border: `1px solid ${BORDER}`, borderRadius: 8, padding: 8 }}>{myPolicies.map(p => <label key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", cursor: "pointer", fontSize: 13 }}><input type="checkbox" checked={editManual.policyIds.includes(p.id)} onChange={e => { if (e.target.checked) setEditManual({ ...editManual, policyIds: [...editManual.policyIds, p.id] }); else setEditManual({ ...editManual, policyIds: editManual.policyIds.filter(x => x !== p.id) }); }} />{p.name}</label>)}</div></div>
        <div style={{ display: "flex", gap: 10 }}><button onClick={() => setShowEditManual(false)} style={S.btn("outline")}>Cancel</button><button onClick={() => { setManuals(prev => prev.map(m => m.id === editManual.id ? { ...editManual, lastUpdate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) } : m)); setShowEditManual(false); notify("Manual updated"); }} style={{ ...S.btn(undefined, true) }}>Save changes ({editManual.policyIds.length} policies)</button></div>
      </div></div>}

      {/* Toast */}
      {toast && <div style={S.toast}><CheckCircle size={16} color={GREEN} />{toast}</div>}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px}select,input,textarea,button{outline:none}button:hover{opacity:0.92}tr:hover td{background:${BG}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );
}
