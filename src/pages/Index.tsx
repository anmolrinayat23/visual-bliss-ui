import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";
import Services from "./Services";
import Courses from "./Courses";
import EmMat from "./EmMat";
import BookSession from "./BookSession";
import About from "./About";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <Vision />
        <Services showFooter={false}/>
        <Courses showFooter={false}/>
        <EmMat showFooter={false}/>
        <BookSession showFooter={false}/>
        <About showFooter={false}/>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
