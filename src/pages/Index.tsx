import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Services from "./Services";
import Courses from "./Courses";
import EmMat from "./EmMat";
import BookSession from "./BookSession";
import About from "./About";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {loading && <Loader />}
      <div className={loading ? "opacity-0" : "animate-fade-in"}>
        <Header />
        <main className="pt-16">
          <Hero />
          <Services showFooter={false}/>
          <Courses showFooter={false}/>
          {/* <EmMat showFooter={false}/> */}
          {/* <BookSession showFooter={false}/> */}
          <About showFooter={false}/>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
