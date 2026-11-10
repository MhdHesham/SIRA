import { useState } from "react";
import "./App.css";

type View = "overview" | "courses" | "learning-path";

const cards = [
  { label: "الدورات النشطة", value: "04", tone: "blue" },
  { label: "نسبة الإنجاز", value: "72%", tone: "green" },
  { label: "ساعات التعلم", value: "38", tone: "orange" },
];

function App() {
  const [view, setView] = useState<View>("overview");

  return (
    <div className="app-shell" dir="rtl">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">S</span><span>SIRA</span></div>
        <p className="workspace-label">مساحة المتدرب</p>
        <nav>
          <button className={view === "overview" ? "nav-item active" : "nav-item"} onClick={() => setView("overview")}>نظرة عامة</button>
          <button className={view === "courses" ? "nav-item active" : "nav-item"} onClick={() => setView("courses")}>دوراتي</button>
          <button className={view === "learning-path" ? "nav-item active" : "nav-item"} onClick={() => setView("learning-path")}>مساري التكيفي</button>
          <button className="nav-item">الاختبارات والواجبات</button>
          <button className="nav-item">منتدى النقاش</button>
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item">الإشعارات <span className="badge">3</span></button>
          <button className="nav-item">الإعدادات</button>
          <div className="user-mini"><div className="avatar">م</div><div><strong>محمد هشام</strong><small>متدرب</small></div></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div><p className="eyebrow">الأربعاء، 11 تشرين الثاني 2026</p><h1>{view === "overview" ? "مرحباً محمد 👋" : view === "courses" ? "دوراتي التدريبية" : "مساري التكيفي"}</h1></div><div className="top-actions"><button className="icon-btn">⌕</button><button className="icon-btn notification">♢<i /></button></div></header>
        {view === "overview" && <Overview onPath={() => setView("learning-path")} />}
        {view === "courses" && <Courses />}
        {view === "learning-path" && <LearningPath />}
      </main>
    </div>
  );
}

function Overview({ onPath }: { onPath: () => void }) {
  return <section>
    <div className="stats-grid">{cards.map((card) => <div className="stat-card" key={card.label}><div className={`stat-icon ${card.tone}`}>◈</div><div><span>{card.label}</span><strong>{card.value}</strong></div><em>+12%</em></div>)}</div>
    <div className="content-grid">
      <div className="panel progress-panel">
        <div className="panel-heading"><h2>تقدمك هذا الأسبوع</h2><button className="text-button">عرض التفاصيل ←</button></div>
        <div className="chart"><div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-area"><div className="line line-one" /><div className="line line-two" />{["السبت","الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"].map((day, i) => <div className="bar-wrap" key={day}><div className={`bar b${i}`} /><span>{day}</span></div>)}</div></div>
      </div>
      <div className="panel path-card"><div className="ai-orb">✦</div><p className="eyebrow">مدعوم بالذكاء الاصطناعي</p><h2>مسارك التعليمي<br />يتطور معك</h2><p>لديك توصيتان جديدتان مبنيتان على نتائج اختبارك الأخير.</p><button className="primary-button" onClick={onPath}>استكشف مساري ←</button></div>
    </div>
    <div className="panel courses-panel"><div className="panel-heading"><h2>متابعة الدورات</h2><button className="text-button">كل الدورات ←</button></div><div className="course-list">{["أساسيات تحليل البيانات","تطوير تطبيقات الويب","مهارات التواصل"].map((course, i) => <div className="course-row" key={course}><div className={`course-cover cover-${i}`}><span>{i === 0 ? "▥" : i === 1 ? "</>" : "✦"}</span></div><div className="course-info"><strong>{course}</strong><small>{i === 0 ? "د. سارة أحمد" : i === 1 ? "م. نورس العلي" : "أ. رامي خالد"}</small><div className="progress-track"><div style={{ width: `${[78, 54, 35][i]}%` }} /></div></div><b>{[78, 54, 35][i]}%</b><button className="more">⋮</button></div>)}</div></div>
  </section>;
}

function Courses() { return <section><div className="course-grid">{["أساسيات تحليل البيانات", "تطوير تطبيقات الويب", "مهارات التواصل", "قواعد البيانات المتقدمة"].map((course, i) => <article className="course-tile" key={course}><div className={`tile-cover cover-${i % 3}`}><span>{["▥", "</>", "✦"][i % 3]}</span></div><div className="tile-body"><small>دورة تدريبية</small><h3>{course}</h3><p>الوحدة {i + 1} · 8 دروس</p><div className="progress-track"><div style={{ width: `${[78, 54, 35, 18][i]}%` }} /></div></div></article>)}</div></section>; }

function LearningPath() { return <section><div className="path-header"><div className="ai-orb large">✦</div><div><p className="eyebrow">تحليل الذكاء الاصطناعي</p><h2>خطة مقترحة بناءً على تقدمك</h2><p>تم تحديث المسار في 10 تشرين الثاني بعد تحليل اختبار تحليل البيانات.</p></div></div><div className="recommendations">{["الانحدار الخطي", "تنظيف البيانات", "تصوير البيانات"].map((item, i) => <div className="recommendation" key={item}><span className="step">{i + 1}</span><div><strong>{item}</strong><p>{i === 0 ? "فجوة مهارية تحتاج إلى مراجعة" : "توصية لتثبيت المهارة"}</p></div><button className="secondary-button">ابدأ الدرس</button></div>)}</div></section>; }

export default App;
