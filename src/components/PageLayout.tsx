import Navbar from "@/components/Navbar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
