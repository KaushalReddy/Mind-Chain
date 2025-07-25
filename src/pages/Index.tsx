import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RegisterIdeaForm from "@/components/RegisterIdeaForm";
import IdeaDashboard from "@/components/IdeaDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <RegisterIdeaForm />
        <IdeaDashboard />
      </main>
    </div>
  );
};

export default Index;
