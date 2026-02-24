import TopBar from "../components/TopBar";

function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <TopBar />
      <main className="content">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
