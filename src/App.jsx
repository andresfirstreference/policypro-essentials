import { useState } from "react";
import { Home, FolderOpen, Users, HelpCircle, Settings, ChevronRight, ShoppingCart, CheckCircle, X, ClipboardList, FileEdit, UserCheck, DollarSign, Monitor, Cog, Shield, Sparkles, Download, FileText, BookOpen, Package, ArrowUpRight, Search, Filter, RotateCcw, Plus, Upload, Pencil } from "lucide-react";

const BLUE = "#1A6AFF";
const BLUE_LIGHT = "#EBF2FF";
const BLUE_BG = "#E8F2FE";
const GREEN = "#12A150";
const GREEN_BG = "#E6F7ED";
const AMBER = "#E0850A";
const AMBER_BG = "#FFF4E0";
const RED = "#D93025";
const BG = "#F4F6F9";
const TEXT = "#1A1D23";
const TEXT_SEC = "#5A5F6B";
const BORDER = "#E2E5EB";
const WHITE = "#FFFFFF";

const essentialPolicies = [
  { id: 1, name: "Workplace Violence Prevention", area: "Human Resources", jurisdiction: "Ontario", category: "Health and Safety", lastUpdate: "Mar 27, 2026", status: "Published", version: "2.1 v", mandatory: true },
  { id: 2, name: "Workplace Harassment Prevention", area: "Human Resources", jurisdiction: "Ontario", category: "Health and Safety", lastUpdate: "Mar 27, 2026", status: "Published", version: "2.0 v", mandatory: true },
  { id: 3, name: "Disconnecting from Work Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Employment", lastUpdate: "Mar 15, 2026", status: "Published", version: "1.3 v", mandatory: true },
  { id: 4, name: "AODA Accessibility Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Accessibility Standards", lastUpdate: "Mar 10, 2026", status: "Published", version: "3.0 v", mandatory: true },
  { id: 5, name: "Occupational Health & Safety Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Health and Safety", lastUpdate: "Feb 28, 2026", status: "Published", version: "2.4 v", mandatory: true },
  { id: 6, name: "Employment Standards Compliance", area: "Human Resources", jurisdiction: "Ontario", category: "Employment", lastUpdate: "Feb 20, 2026", status: "Published", version: "1.8 v", mandatory: true },
  { id: 7, name: "Pay Transparency & Job Posting Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Employment", lastUpdate: "Feb 15, 2026", status: "Published", version: "1.0 v", mandatory: true },
  { id: 8, name: "Leave of Absence Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Benefits", lastUpdate: "Jan 30, 2026", status: "Published", version: "2.2 v", mandatory: false },
  { id: 9, name: "Privacy & Personal Information Policy", area: "Human Resources", jurisdiction: "Ontario", category: "Employee Relations", lastUpdate: "Jan 20, 2026", status: "Published", version: "1.5 v", mandatory: true },
  { id: 10, name: "New Hire Information Requirements", area: "Human Resources", jurisdiction: "Ontario", category: "Employment", lastUpdate: "Jan 10, 2026", status: "Published", version: "1.0 v", mandatory: true },
];

const addonPolicies = [
  { id: 101, name: "Expense Reimbursement Policy", area: "Finance & Accounting", jurisdiction: "All Canada", category: "Revenue Cycle", price: 149, docType: "Policy", issued: "Nov 12, 2025" },
  { id: 102, name: "Procurement & Purchasing Policy", area: "Finance & Accounting", jurisdiction: "All Canada", category: "Purchasing Cycle", price: 149, docType: "Policy", issued: "Oct 5, 2025" },
  { id: 103, name: "Travel Policy", area: "Finance & Accounting", jurisdiction: "All Canada", category: "Revenue Cycle", price: 129, docType: "Policy", issued: "Sep 18, 2025" },
  { id: 104, name: "Acceptable Use of Technology", area: "Information Technology", jurisdiction: "All Canada", category: "IT Governance", price: 149, docType: "Policy", issued: "Dec 3, 2025" },
  { id: 105, name: "Data Breach Response Policy", area: "Information Technology", jurisdiction: "All Canada", category: "IT Security", price: 179, docType: "Policy", issued: "Jan 8, 2026" },
  { id: 106, name: "BYOD Policy", area: "Information Technology", jurisdiction: "All Canada", category: "IT Governance", price: 129, docType: "Policy", issued: "Aug 22, 2025" },
  { id: 107, name: "Records Retention Policy", area: "Operations & Marketing", jurisdiction: "Ontario", category: "Operations", price: 149, docType: "Policy", issued: "Jul 14, 2025" },
  { id: 108, name: "Business Continuity Policy", area: "Operations & Marketing", jurisdiction: "All Canada", category: "Operations", price: 179, docType: "Policy", issued: "Nov 28, 2025" },
];

const readers = [
  { name: "Sarah Chen", role: "Reader", group: "HR Team 2026", status: "Active" },
  { name: "Marcus Williams", role: "Reader", group: "HR Team 2026", status: "Active" },
  { name: "Priya Sharma", role: "Reader", group: "Operations", status: "Active" },
  { name: "David Park", role: "Co-editor", group: "HR Team 2026", status: "Active" },
  { name: "Lisa Tremblay", role: "Reader", group: "Finance Team", status: "On Leave" },
];

const readerGroups = [
  { name: "HR Team 2026", members: 3 },
  { name: "Operations", members: 1 },
  { name: "Finance Team", members: 1 },
];

const reportData = [
  { reader: "Sarah Chen", policy: "Workplace Violence Prevention", manual: "Ontario HR Essentials Manual", status: "Completed", group: "HR Team 2026", viewDate: "Mar 28, 2026" },
  { reader: "Marcus Williams", policy: "Workplace Violence Prevention", manual: "Ontario HR Essentials Manual", status: "Completed", group: "HR Team 2026", viewDate: "Mar 29, 2026" },
  { reader: "David Park", policy: "Workplace Harassment Prevention", manual: "Ontario HR Essentials Manual", status: "Pending", group: "HR Team 2026", viewDate: "N/A" },
  { reader: "Priya Sharma", policy: "AODA Accessibility Policy", manual: "Ontario HR Essentials Manual", status: "Pending", group: "Operations", viewDate: "N/A" },
  { reader: "Lisa Tremblay", policy: "Expense Reimbursement Policy", manual: "Ontario HR Essentials Manual", status: "Pending", group: "Finance Team", viewDate: "N/A" },
];

const st = {
  app: { display: "flex", height: "100vh", fontFamily: "'Noto Sans', sans-serif", background: BG, color: TEXT, fontSize: 14, overflow: "hidden" },
  sidebar: { width: 200, minWidth: 200, background: WHITE, borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" },
  sidebarTop: { padding: "18px 16px 12px" },
  logo: { display: "flex", alignItems: "center", gap: 8, marginBottom: 24 },
  logoMark: { width: 32, height: 32, background: BLUE, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontWeight: 800, fontSize: 13 },
  logoText: { fontSize: 13, fontWeight: 700, lineHeight: 1.2, color: TEXT },
  logoSub: { fontSize: 10, fontWeight: 600, color: BLUE, letterSpacing: "0.02em" },
  navItem: (active) => ({ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", margin: "1px 8px", borderRadius: 8, cursor: "pointer", fontSize: 13.5, fontWeight: active ? 600 : 500, background: active ? BLUE : "transparent", color: active ? WHITE : TEXT_SEC, transition: "all 0.15s ease", whiteSpace: "nowrap" }),
  navSub: (active) => ({ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px 7px 44px", margin: "1px 8px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400, color: active ? BLUE : TEXT_SEC, background: active ? BLUE_LIGHT : "transparent", transition: "all 0.15s ease" }),
  main: { flex: 1, overflow: "auto", display: "flex", flexDirection: "column" },
  topbar: { background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: "12px 32px", display: "flex", justifyContent: "flex-end", alignItems: "center", minHeight: 52, flexShrink: 0 },
  avatar: { width: 34, height: 34, borderRadius: "50%", background: BLUE_LIGHT, color: BLUE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 },
  content: { flex: 1, padding: "28px 32px 40px", overflow: "auto" },
  pageTitle: { fontSize: 28, fontWeight: 700, color: BLUE, marginBottom: 12 },
  infoBanner: { background: BLUE_BG, borderRadius: 8, padding: "12px 18px", marginBottom: 24, fontSize: 13.5, color: TEXT, lineHeight: 1.6 },
  card: { background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px" },
  statCard: { background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 24px", flex: 1, minWidth: 160 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px 16px", fontSize: 11.5, fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: "0.04em", borderBottom: `2px solid ${BORDER}` },
  td: { padding: "14px 16px", fontSize: 13.5, borderBottom: `1px solid ${BORDER}`, verticalAlign: "top" },
  badge: (c, bg) => ({ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: c, background: bg || "transparent", padding: bg ? "3px 10px" : 0, borderRadius: 12 }),
  dot: (c) => ({ width: 7, height: 7, borderRadius: "50%", background: c, flexShrink: 0 }),
  btn: (v) => ({ fontFamily: "'Noto Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.15s ease", background: v === "outline" ? WHITE : BLUE, color: v === "outline" ? TEXT : WHITE, boxShadow: v === "outline" ? `inset 0 0 0 1.5px ${BORDER}` : "none" }),
  filterGroup: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 140 },
  filterLabel: { fontSize: 12, fontWeight: 600, color: TEXT_SEC },
  filterSelect: { fontFamily: "'Noto Sans', sans-serif", padding: "8px 12px", borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, color: TEXT_SEC, background: WHITE, cursor: "pointer", appearance: "none" },
  tabs: { display: "flex", borderBottom: `2px solid ${BORDER}`, marginBottom: 20 },
  tab: (a) => ({ padding: "12px 28px", fontSize: 14, fontWeight: a ? 600 : 400, color: a ? TEXT : TEXT_SEC, cursor: "pointer", borderBottom: a ? `2px solid ${BLUE}` : "2px solid transparent", marginBottom: -2 }),
  priceBadge: { display: "inline-flex", alignItems: "center", gap: 4, background: "#FFF8F0", border: "1px solid #F5D5A8", borderRadius: 20, padding: "4px 12px", fontSize: 13, fontWeight: 700, color: "#B8660E" },
  purchaseBtn: { fontFamily: "'Noto Sans', sans-serif", fontSize: 12.5, fontWeight: 600, padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: "#F0F7FF", color: BLUE, display: "inline-flex", alignItems: "center", gap: 5 },
  includedBadge: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: GREEN, background: GREEN_BG, padding: "4px 12px", borderRadius: 20 },
  modal: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modalContent: { background: WHITE, borderRadius: 14, padding: "32px", maxWidth: 520, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" },
  progressRing: (pct) => ({ width: 52, height: 52, borderRadius: "50%", background: `conic-gradient(${BLUE} ${pct * 3.6}deg, ${BORDER} ${pct * 3.6}deg)`, display: "flex", alignItems: "center", justifyContent: "center" }),
  progressInner: { width: 38, height: 38, borderRadius: "50%", background: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: TEXT },
  cartBadge: { position: "absolute", top: -6, right: -8, width: 17, height: 17, borderRadius: "50%", background: RED, color: WHITE, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
  essentialsBadge: { display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg, #EBF2FF 0%, #F0EAFF 100%)", border: `1px solid ${BLUE}40`, borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.03em" },
  upgradeCard: { background: "linear-gradient(135deg, #0B1120 0%, #1A3A5C 100%)", borderRadius: 12, padding: "24px 28px", color: WHITE, marginTop: 24 },
  iconWrap: (c, bg) => ({ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: c, flexShrink: 0 }),
};

export default function PolicyProEssentials() {
  const [page, setPage] = useState("home");
  const [subPage, setSubPage] = useState(null);
  const [cart, setCart] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [libraryTab, setLibraryTab] = useState("all");
  const [policyDetail, setPolicyDetail] = useState(null);

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "hub", label: "PolicyPro\u00AE hub", icon: <FolderOpen size={18} />, children: [
      { id: "my-policies", label: "My policies" },
      { id: "my-manuals", label: "My manuals" },
      { id: "archived", label: "Archived" },
      { id: "library", label: "PolicyPro\u00AE library" },
      { id: "store", label: "Policy store" },
    ]},
    { id: "readers", label: "Readers and reports", icon: <Users size={18} />, children: [
      { id: "reader-groups", label: "Reader groups" },
      { id: "list-readers", label: "List of readers" },
      { id: "reports", label: "Reports" },
    ]},
    { id: "help", label: "Help", icon: <HelpCircle size={18} /> },
  ];

  const handleNav = (id, parentId) => { if (parentId) { setPage(parentId); setSubPage(id); } else { setPage(id); setSubPage(null); } };
  const currentPage = subPage || page;
  const isActive = (id) => currentPage === id;
  const isParentActive = (pid, ch) => ch?.some(c => c.id === currentPage);
  const addToCart = (p) => { if (!cart.find(x => x.id === p.id) && !purchased.includes(p.id)) setCart([...cart, p]); };
  const removeFromCart = (id) => setCart(cart.filter(p => p.id !== id));
  const checkout = () => { setPurchased([...purchased, ...cart.map(p => p.id)]); setCart([]); setShowCart(false); setShowModal("success"); };
  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0);
  const allMyPolicies = [...essentialPolicies, ...addonPolicies.filter(p => purchased.includes(p.id)).map(p => ({ ...p, status: "Published", version: "1.0 v", lastUpdate: "Apr 1, 2026", mandatory: false }))];

  const renderHome = () => (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <span style={st.essentialsBadge}>ESSENTIALS</span>
        <span style={{ fontSize: 13, color: TEXT_SEC }}>PolicyPro\u00AE</span>
      </div>
      <h1 style={{ fontSize: 30, fontWeight: 700, color: TEXT, margin: "8px 0 6px" }}>Welcome, Andres Guzman!</h1>
      <p style={{ fontSize: 14, color: TEXT_SEC, marginBottom: 28 }}>This is a summary of your policies and updates. Click a tile to view more details.</p>
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { label: "Included policies", value: 10, link: "View all", icon: <ClipboardList size={20} />, color: BLUE, bg: BLUE_LIGHT, onClick: () => handleNav("my-policies", "hub") },
          { label: "Add-on policies", value: purchased.length, link: "Browse store", icon: <Package size={20} />, color: "#7C3AED", bg: "#F3EEFF", onClick: () => handleNav("store", "hub") },
          { label: "Policies to review", value: 0, link: "Check policies", icon: <FileEdit size={20} />, color: AMBER, bg: AMBER_BG },
          { label: "Readers with tasks", value: 2, link: "View report", icon: <UserCheck size={20} />, color: GREEN, bg: GREEN_BG, onClick: () => handleNav("reports", "readers") },
        ].map((item, i) => (
          <div key={i} style={st.statCard}>
            <div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SEC, marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: TEXT, marginBottom: 12 }}>{item.value}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span onClick={item.onClick} style={{ fontSize: 13, color: BLUE, fontWeight: 500, cursor: item.onClick ? "pointer" : "default" }}>{item.link}</span>
              <div style={st.iconWrap(item.color, item.bg)}>{item.icon}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 20, marginBottom: 0 }}>
        <div style={{ ...st.card, flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: BLUE, marginBottom: 16 }}>Policy updates</h3>
          {essentialPolicies.slice(0, 3).map(p => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${BORDER}` }}>
              <div><div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{p.category} · {p.lastUpdate}</div></div>
              <span style={st.badge(GREEN)}><span style={st.dot(GREEN)}/> Current</span>
            </div>
          ))}
        </div>
        <div style={{ ...st.card, flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: BLUE, marginBottom: 16 }}>New policies</h3>
          <div style={{ color: TEXT_SEC, fontSize: 13.5, textAlign: "center", padding: "32px 0" }}>There are no updates to display at the moment</div>
        </div>
      </div>
      <div style={st.upgradeCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#93B8FF", marginBottom: 6 }}>Expand your coverage</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Need policies beyond HR?</div>
            <div style={{ fontSize: 13.5, color: "#B0C4DE", lineHeight: 1.6 }}>Browse Finance, IT, and Operations policies in the Policy Store. Purchase individually or upgrade to full PolicyPro\u00AE for complete access to 500+ policies.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0, marginLeft: 24 }}>
            <button onClick={() => handleNav("store", "hub")} style={{ ...st.btn(), background: WHITE, color: BLUE }}>Browse store</button>
            <button style={{ ...st.btn(), background: "transparent", color: WHITE, boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.3)" }}>Upgrade plan</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyPolicies = () => (
    <div>
      <h1 style={st.pageTitle}>My policies</h1>
      <div style={st.infoBanner}>Get access to your documents. Your Essentials plan includes {essentialPolicies.length} Ontario HR policies. You can purchase additional policies from the <span onClick={() => handleNav("store", "hub")} style={{ color: BLUE, fontWeight: 600, cursor: "pointer" }}>Policy Store</span> or create one from scratch.</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
        <div style={st.filterGroup}><div style={st.filterLabel}>Area</div><select style={st.filterSelect}><option>Select...</option></select></div>
        <div style={st.filterGroup}><div style={st.filterLabel}>Category</div><select style={st.filterSelect}><option>Select...</option></select></div>
        <div style={st.filterGroup}><div style={st.filterLabel}>Jurisdiction</div><select style={st.filterSelect}><option>Select...</option></select></div>
        <div style={{ ...st.filterGroup, flex: 1.5 }}><div style={st.filterLabel}>&nbsp;</div><div style={{ position: "relative" }}><Search size={14} style={{ position: "absolute", left: 10, top: 10, color: TEXT_SEC }} /><input placeholder="Search" style={{ ...st.filterSelect, color: TEXT, paddingLeft: 30, width: "100%" }} /></div></div>
        <button style={st.btn()}><Filter size={14} /> Filter</button>
        <button style={st.btn("outline")}><RotateCcw size={14} /> Reset</button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 16 }}>
        <button style={st.btn("outline")}>Create policy</button>
        <button onClick={() => handleNav("library", "hub")} style={st.btn()}><Plus size={14} /> Add policy from library</button>
      </div>
      <div style={st.tabs}>{["All policies", "To review", "To update"].map((t, i) => <div key={i} style={st.tab(i === 0)}>{t}</div>)}</div>
      <div style={st.card}>
        <table style={st.table}>
          <thead><tr><th style={{ ...st.th, width: 30 }}><input type="checkbox" /></th><th style={st.th}>Name</th><th style={st.th}>Last Update</th><th style={st.th}>Status</th><th style={st.th}>Version</th></tr></thead>
          <tbody>{allMyPolicies.map(p => (
            <tr key={p.id} style={{ cursor: "pointer" }} onClick={() => setPolicyDetail(p)}>
              <td style={st.td}><input type="checkbox" onClick={e => e.stopPropagation()} /></td>
              <td style={st.td}><div style={{ fontWeight: 600, marginBottom: 2 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{p.area} · {p.jurisdiction} · {p.category} (Area: {p.area})</div></td>
              <td style={st.td}>{p.lastUpdate}</td>
              <td style={st.td}><span style={st.badge(GREEN)}><span style={st.dot(GREEN)}/> {p.status}</span></td>
              <td style={st.td}>{p.version}</td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, padding: "14px 16px", fontSize: 13, color: TEXT_SEC }}>Rows per page <select style={{ ...st.filterSelect, padding: "4px 8px", minWidth: 50 }}><option>10</option></select> Page 1 of 1</div>
      </div>
    </div>
  );

  const renderManuals = () => (<div><h1 style={st.pageTitle}>My manuals</h1><div style={st.infoBanner}>Manage your policy manuals from here. You can create, download, and maintain manuals.</div><div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}><button style={st.btn()}><Plus size={14} /> Create manual</button></div><div style={st.card}><table style={st.table}><thead><tr><th style={{ ...st.th, width: 30 }}><input type="checkbox" /></th><th style={st.th}>Name</th><th style={st.th}>Jurisdiction</th><th style={st.th}>Last Update</th></tr></thead><tbody><tr><td style={st.td}><input type="checkbox" /></td><td style={{ ...st.td, fontWeight: 600 }}>Ontario HR Essentials Manual</td><td style={st.td}>Ontario</td><td style={st.td}>Mar 27, 2026</td></tr></tbody></table></div></div>);

  const renderArchived = () => (<div><h1 style={st.pageTitle}>Archived</h1><div style={st.infoBanner}>All versions of your policies are stored here. You can review or download them whenever needed.</div><div style={st.card}><table style={st.table}><thead><tr><th style={st.th}>Name</th><th style={st.th}>Modified</th><th style={st.th}>Modified By</th></tr></thead><tbody><tr><td colSpan={3} style={{ ...st.td, textAlign: "center", color: TEXT_SEC, padding: 40 }}>No results.</td></tr></tbody></table></div></div>);

  const renderLibrary = () => {
    const all = [...essentialPolicies.map(p => ({ ...p, included: true, purchased: false, docType: "Policy", issued: p.lastUpdate })), ...addonPolicies.map(p => ({ ...p, included: false, purchased: purchased.includes(p.id) }))];
    const filtered = libraryTab === "essential" ? all.filter(p => p.included) : libraryTab === "addons" ? all.filter(p => !p.included) : all;
    return (<div>
      <h1 style={st.pageTitle}>PolicyPro\u00AE library</h1>
      <div style={st.infoBanner}>Access sample policies and documents from First Reference. Your Essentials plan includes {essentialPolicies.length} Ontario HR policies. Additional policies are available for individual purchase.</div>
      <div style={{ position: "relative", marginBottom: 20 }}><Search size={16} style={{ position: "absolute", left: 14, top: 13, color: TEXT_SEC }} /><input placeholder="Search..." style={{ ...st.filterSelect, width: "100%", padding: "11px 16px 11px 38px", fontSize: 14 }} /></div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
        <div style={st.filterGroup}><div style={st.filterLabel}>Area</div><select style={st.filterSelect}><option>Select...</option></select></div>
        <div style={st.filterGroup}><div style={st.filterLabel}>Category</div><select style={st.filterSelect}><option>Select...</option></select></div>
        <div style={st.filterGroup}><div style={st.filterLabel}>Jurisdiction</div><select style={st.filterSelect}><option>Select...</option></select></div>
        <button style={st.btn()}><Filter size={14} /> Filter</button>
        <button style={st.btn("outline")}><RotateCcw size={14} /> Reset</button>
      </div>
      <div style={st.tabs}>{[["all","All policies"],["essential","Included in plan"],["addons","Available add-ons"]].map(([k,l]) => <div key={k} style={st.tab(libraryTab===k)} onClick={() => setLibraryTab(k)}>{l}</div>)}</div>
      <div style={st.card}><table style={st.table}><thead><tr><th style={st.th}>Policy Name</th><th style={st.th}>Document Type</th><th style={st.th}>Issued Date</th><th style={{ ...st.th, textAlign: "right" }}></th></tr></thead>
      <tbody>{filtered.map(p => (<tr key={p.id}><td style={st.td}><div style={{ display: "flex", alignItems: "center" }}><span style={{ fontWeight: 600 }}>{p.name}</span>{p.mandatory && <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: AMBER, marginLeft: 10 }}><Shield size={12} /> Mandatory</span>}</div><div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 2 }}>{p.area} · {p.jurisdiction} · {p.category}</div></td>
        <td style={st.td}>{p.docType || "Policy"}</td><td style={st.td}>{p.issued || p.lastUpdate}</td>
        <td style={{ ...st.td, textAlign: "right" }}>{p.included ? <span style={st.includedBadge}><CheckCircle size={14} /> Included in plan</span> : p.purchased ? <span style={st.includedBadge}><CheckCircle size={14} /> Added to my policies</span> : <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}><span style={st.priceBadge}>${p.price} CAD</span>{cart.find(c => c.id === p.id) ? <span style={{ fontSize: 12.5, fontWeight: 600, color: GREEN, display: "inline-flex", alignItems: "center", gap: 4 }}><CheckCircle size={14} /> In cart</span> : <button onClick={() => addToCart(p)} style={st.purchaseBtn}><ShoppingCart size={14} /> Purchase</button>}</div>}</td></tr>))}</tbody></table></div>
    </div>);
  };

  const renderStore = () => (<div>
    <h1 style={st.pageTitle}>Policy store</h1>
    <div style={st.infoBanner}>Expand your policy coverage beyond HR essentials. Purchase individual policies from Finance & Accounting, Information Technology, and Operations & Marketing. Each policy includes expert commentary, compliance guidance, and automatic updates.</div>
    <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
      {[{ area: "Finance & Accounting", count: 3, icon: <DollarSign size={22} />, color: "#7C3AED", bg: "#F3EEFF" },{ area: "Information Technology", count: 3, icon: <Monitor size={22} />, color: "#0891B2", bg: "#ECFEFF" },{ area: "Operations & Marketing", count: 2, icon: <Cog size={22} />, color: "#B45309", bg: "#FFF7ED" }].map((cat, i) => (
        <div key={i} style={{ ...st.card, flex: 1, minWidth: 200, borderTop: `3px solid ${cat.color}` }}>
          <div style={{ ...st.iconWrap(cat.color, cat.bg), marginBottom: 12, width: 44, height: 44 }}>{cat.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{cat.area}</div>
          <div style={{ fontSize: 13, color: TEXT_SEC }}>{cat.count} policies available</div>
        </div>
      ))}
    </div>
    {["Finance & Accounting","Information Technology","Operations & Marketing"].map(area => (<div key={area} style={{ marginBottom: 28 }}><h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>{area}</h2><div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>{addonPolicies.filter(p => p.area === area).map(p => { const own = purchased.includes(p.id); const inC = cart.find(c => c.id === p.id); return (<div key={p.id} style={{ ...st.card, flex: "1 1 280px", maxWidth: 340, display: "flex", flexDirection: "column", justifyContent: "space-between" }}><div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}><div style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.4, paddingRight: 8 }}>{p.name}</div>{own ? <span style={{ ...st.badge(GREEN, GREEN_BG), fontSize: 11, whiteSpace: "nowrap" }}>Owned</span> : <span style={{ ...st.priceBadge, fontSize: 12 }}>${p.price}</span>}</div><div style={{ fontSize: 12.5, color: TEXT_SEC, marginBottom: 4 }}>{p.category}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>Jurisdiction: {p.jurisdiction}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>Issued: {p.issued}</div></div><div style={{ marginTop: 16 }}>{own ? <button style={{ ...st.btn("outline"), width: "100%", justifyContent: "center", fontSize: 12.5 }}>View policy</button> : inC ? <button onClick={() => removeFromCart(p.id)} style={{ ...st.btn("outline"), width: "100%", justifyContent: "center", fontSize: 12.5, color: RED, boxShadow: `inset 0 0 0 1.5px ${RED}30` }}>Remove from cart</button> : <button onClick={() => addToCart(p)} style={{ ...st.btn(), width: "100%", justifyContent: "center", fontSize: 12.5 }}><ShoppingCart size={14} /> Add to cart · ${p.price} CAD</button>}</div></div>); })}</div></div>))}
    <div style={st.upgradeCard}><div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#93B8FF", marginBottom: 6 }}>Full access</div><div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Upgrade to PolicyPro\u00AE Complete</div><div style={{ fontSize: 13.5, color: "#B0C4DE", lineHeight: 1.6, marginBottom: 16 }}>Get access to all 500+ policies across every area and jurisdiction for $1,699/year. Includes all current and future policies, priority support, and enterprise features.</div><button style={{ ...st.btn(), background: WHITE, color: BLUE }}><ArrowUpRight size={14} /> Learn about upgrade</button></div>
  </div>);

  const renderReaderGroups = () => (<div><h1 style={st.pageTitle}>Reader groups</h1><div style={st.infoBanner}>Manage your list of readers, add new ones, and organize them into groups.</div><div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}><button style={st.btn()}><Plus size={14} /> Create group</button></div><div style={st.card}><table style={st.table}><thead><tr><th style={{ ...st.th, width: 30 }}><input type="checkbox" /></th><th style={st.th}>Group Name</th><th style={st.th}>Members</th><th style={st.th}></th></tr></thead><tbody>{readerGroups.map((g, i) => <tr key={i}><td style={st.td}><input type="checkbox" /></td><td style={{ ...st.td, fontWeight: 600 }}>{g.name}</td><td style={st.td}>{g.members} readers <span style={{ color: BLUE, marginLeft: 8, cursor: "pointer", fontWeight: 500 }}>View List</span></td><td style={{ ...st.td, textAlign: "right" }}><span style={{ color: TEXT_SEC, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}><Pencil size={14} /> Edit</span></td></tr>)}</tbody></table></div></div>);

  const renderListReaders = () => (<div><h1 style={st.pageTitle}>List of readers</h1><div style={st.infoBanner}>Manage your list of readers, add new ones, organize them into groups, and assign manuals.</div><div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 16 }}><button style={st.btn("outline")}><Upload size={14} /> Import and export readers</button><button style={st.btn()}><Plus size={14} /> Add new reader</button></div><div style={st.card}><table style={st.table}><thead><tr><th style={{ ...st.th, width: 30 }}><input type="checkbox" /></th><th style={st.th}>Reader</th><th style={st.th}>Role</th><th style={st.th}>Group</th><th style={st.th}>Status</th><th style={st.th}></th></tr></thead><tbody>{readers.map((r, i) => <tr key={i}><td style={st.td}><input type="checkbox" /></td><td style={{ ...st.td, fontWeight: 600 }}>{r.name}</td><td style={st.td}>{r.role}</td><td style={st.td}><span style={{ color: BLUE }}>{r.group}</span></td><td style={st.td}><span style={{ color: r.status === "Active" ? GREEN : AMBER, fontWeight: 500 }}>{r.status}</span></td><td style={{ ...st.td, textAlign: "right", color: TEXT_SEC }}><ChevronRight size={16} /></td></tr>)}</tbody></table></div></div>);

  const renderReports = () => { const done = reportData.filter(r => r.status === "Completed").length; const tot = reportData.length; const pct = Math.round((done/tot)*100); return (<div><h1 style={st.pageTitle}>Reports</h1><div style={st.infoBanner}>This section provides a detailed summary of readers who haven't read the policies or who have pending tasks.</div><div style={{ display: "flex", gap: 16, marginBottom: 28 }}><div style={{ ...st.statCard, display: "flex", alignItems: "center", gap: 20 }}><div><div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SEC, marginBottom: 4 }}>Tasks completed</div><div style={{ fontSize: 28, fontWeight: 700 }}>{done}/{tot}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>Displays policies successfully completed by employees.</div></div><div style={st.progressRing(pct)}><div style={st.progressInner}>{pct}%</div></div></div><div style={st.statCard}><div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SEC, marginBottom: 4 }}>Out-of-date policies</div><div style={{ fontSize: 28, fontWeight: 700 }}>0</div><div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 6 }}>These policies must be re-read, and any accompanying quizzes redone.</div></div><div style={st.statCard}><div style={{ fontSize: 13, fontWeight: 500, color: TEXT_SEC, marginBottom: 4 }}>Expired tasks</div><div style={{ fontSize: 28, fontWeight: 700 }}>0</div><div style={{ fontSize: 12, color: TEXT_SEC, marginTop: 6 }}>Shows policies not completed by employees before the due date.</div></div></div><div style={st.card}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Activity: All readers</h3><button style={st.btn("outline")}><Download size={14} /> Export CSV</button></div><table style={st.table}><thead><tr><th style={st.th}>Reader</th><th style={st.th}>Policy</th><th style={st.th}>Manual</th><th style={st.th}>Status</th><th style={st.th}>Group</th><th style={st.th}>View Date</th></tr></thead><tbody>{reportData.map((r, i) => <tr key={i}><td style={{ ...st.td, fontWeight: 500 }}>{r.reader}</td><td style={st.td}>{r.policy}</td><td style={st.td}>{r.manual}</td><td style={st.td}><span style={{ color: r.status === "Completed" ? GREEN : AMBER, fontWeight: 500 }}>{r.status}</span></td><td style={st.td}>{r.group}</td><td style={st.td}>{r.viewDate}</td></tr>)}</tbody></table></div></div>); };

  const renderHelp = () => (<div><h1 style={st.pageTitle}>Ask First Reference</h1><div style={st.infoBanner}>Get quick and reliable answers to your most pressing HR, payroll, and internal controls questions with <strong>Ask First Reference</strong>. Our team is ready to assist you!</div><div style={st.card}><div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 20 }}><div style={{ flex: 1, minWidth: 200 }}><div style={st.filterLabel}>General area of my question</div><select style={{ ...st.filterSelect, width: "100%" }}><option>Select...</option></select></div><div style={{ flex: 1, minWidth: 200 }}><div style={st.filterLabel}>Jurisdiction</div><select style={{ ...st.filterSelect, width: "100%" }}><option>Select...</option></select></div></div><div style={st.filterLabel}>Question</div><textarea placeholder="Type your question here." style={{ ...st.filterSelect, width: "100%", minHeight: 120, resize: "vertical", color: TEXT, fontFamily: "'Noto Sans', sans-serif" }} /><div style={{ marginTop: 16, textAlign: "right" }}><button style={st.btn()}>Submit question</button></div></div></div>);

  const pages = { "home": renderHome, "my-policies": renderMyPolicies, "my-manuals": renderManuals, "archived": renderArchived, "library": renderLibrary, "store": renderStore, "reader-groups": renderReaderGroups, "list-readers": renderListReaders, "reports": renderReports, "help": renderHelp };

  return (
    <div style={st.app}>
      <div style={st.sidebar}>
        <div style={st.sidebarTop}>
          <div style={st.logo}><div style={st.logoMark}>FR</div><div><div style={st.logoText}>First Reference</div><div style={st.logoSub}>PolicyPro\u00AE Essentials</div></div></div>
          {navItems.map(item => (<div key={item.id} style={{ marginBottom: 4 }}><div style={st.navItem(isActive(item.id) || isParentActive(item.id, item.children))} onClick={() => item.children ? handleNav(item.children[0].id, item.id) : handleNav(item.id)}>{item.icon}<span>{item.label}</span></div>{item.children && (isActive(item.id) || isParentActive(item.id, item.children)) && <div style={{ marginTop: 2 }}>{item.children.map(ch => <div key={ch.id} style={st.navSub(isActive(ch.id))} onClick={() => handleNav(ch.id, item.id)}>{ch.label}</div>)}</div>}</div>))}
        </div>
        <div style={{ padding: "12px 8px 16px", borderTop: `1px solid ${BORDER}` }}><div style={st.navItem(false)}><Settings size={18} /><span>Settings</span></div></div>
      </div>

      <div style={st.main}>
        <div style={st.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setShowCart(true)}><ShoppingCart size={18} color={TEXT_SEC} />{cart.length > 0 && <div style={st.cartBadge}>{cart.length}</div>}</div>
            <div style={{ fontSize: 13, color: TEXT_SEC, textAlign: "right", lineHeight: 1.3 }}><div style={{ fontWeight: 600, color: TEXT }}>Canadian Company 2026</div><div>Andres Guzman</div></div>
            <div style={st.avatar}>AG</div>
          </div>
        </div>
        <div style={st.content}>{pages[currentPage] ? pages[currentPage]() : renderHome()}</div>
      </div>

      {showCart && <div style={st.modal} onClick={() => setShowCart(false)}><div style={{ ...st.modalContent, maxWidth: 440 }} onClick={e => e.stopPropagation()}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h2 style={{ fontSize: 20, fontWeight: 700 }}>Your cart</h2><div style={{ cursor: "pointer" }} onClick={() => setShowCart(false)}><X size={20} /></div></div>{cart.length === 0 ? <div style={{ textAlign: "center", padding: "32px 0", color: TEXT_SEC }}><ShoppingCart size={40} strokeWidth={1.2} style={{ marginBottom: 12, opacity: 0.4 }} /><div style={{ fontSize: 14 }}>Your cart is empty</div><div style={{ fontSize: 13, marginTop: 4 }}>Browse the Policy Store to add policies</div></div> : <>{cart.map(p => <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${BORDER}` }}><div><div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div><div style={{ fontSize: 12, color: TEXT_SEC }}>{p.area}</div></div><div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontWeight: 700 }}>${p.price}</span><span onClick={() => removeFromCart(p.id)} style={{ color: RED, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Remove</span></div></div>)}<div style={{ display: "flex", justifyContent: "space-between", padding: "18px 0 8px", fontSize: 16, fontWeight: 700 }}><span>Total</span><span>${cartTotal} CAD</span></div><button onClick={checkout} style={{ ...st.btn(), width: "100%", justifyContent: "center", marginTop: 12, padding: "12px 20px", fontSize: 15 }}>Complete purchase</button><div style={{ fontSize: 12, color: TEXT_SEC, textAlign: "center", marginTop: 10 }}>Policies will be instantly added to your library</div></>}</div></div>}

      {showModal === "success" && <div style={st.modal} onClick={() => setShowModal(null)}><div style={{ ...st.modalContent, textAlign: "center" }} onClick={e => e.stopPropagation()}><div style={{ width: 56, height: 56, borderRadius: "50%", background: GREEN_BG, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Sparkles size={28} color={GREEN} /></div><h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Purchase complete!</h2><p style={{ fontSize: 14, color: TEXT_SEC, lineHeight: 1.6, marginBottom: 24 }}>Your new policies have been added to My Policies and are ready to use. You can now create manuals, assign them to readers, and track compliance.</p><div style={{ display: "flex", gap: 10, justifyContent: "center" }}><button onClick={() => { setShowModal(null); handleNav("my-policies", "hub"); }} style={st.btn()}>View my policies</button><button onClick={() => setShowModal(null)} style={st.btn("outline")}>Close</button></div></div></div>}

      {policyDetail && <div style={st.modal} onClick={() => setPolicyDetail(null)}><div style={{ ...st.modalContent, maxWidth: 580 }} onClick={e => e.stopPropagation()}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}><div><h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{policyDetail.name}</h2><div style={{ fontSize: 13, color: TEXT_SEC }}>{policyDetail.area} · {policyDetail.jurisdiction} · {policyDetail.category}</div></div><div style={{ cursor: "pointer" }} onClick={() => setPolicyDetail(null)}><X size={20} /></div></div><div style={{ display: "flex", gap: 20, marginBottom: 20 }}>{[{ l: "Status", c: <span style={st.badge(GREEN)}><span style={st.dot(GREEN)}/> {policyDetail.status}</span> },{ l: "Version", c: <div style={{ fontWeight: 600 }}>{policyDetail.version}</div> },{ l: "Last update", c: <div style={{ fontWeight: 600 }}>{policyDetail.lastUpdate}</div> }].map((x, i) => <div key={i} style={{ flex: 1, padding: "12px 16px", background: BG, borderRadius: 8 }}><div style={{ fontSize: 11, fontWeight: 600, color: TEXT_SEC, marginBottom: 4 }}>{x.l}</div>{x.c}</div>)}</div>{policyDetail.mandatory && <div style={{ background: AMBER_BG, border: `1px solid ${AMBER}40`, borderRadius: 8, padding: "10px 16px", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Shield size={16} color={AMBER} /> This policy is mandatory for Ontario employers</div>}<div style={{ background: BG, borderRadius: 8, padding: "20px", marginBottom: 20 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Policy preview</div><div style={{ fontSize: 13, color: TEXT_SEC, lineHeight: 1.7 }}>This model policy provides a comprehensive framework for compliance with Ontario requirements. It includes detailed guidelines, procedures, and best practices developed by First Reference's legal editors. The policy is regularly updated to reflect changes in legislation and regulatory requirements.</div></div><div style={{ display: "flex", gap: 10 }}><button style={st.btn()}><Download size={14} /> Download PDF</button><button style={st.btn("outline")}><FileText size={14} /> Download Word</button><button style={st.btn("outline")}><BookOpen size={14} /> Add to manual</button></div></div></div>}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px}select,input,textarea,button{outline:none}button:hover{opacity:0.92}tr:hover{background:${BG}}`}</style>
    </div>
  );
}
