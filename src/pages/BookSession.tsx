import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import counsellingImage from "@/assets/counselling.jpg";

const BookSession = ({showFooter=true}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-vision-bg via-background to-vision-bg relative overflow-hidden">
      {/* Decorative blur elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      <Header />
      <main className="pt-16 relative z-10">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-fade-in group" style={{ animationDelay: "0.3s" }}>
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={counsellingImage} 
                    alt="Student counselling session" 
                    className="rounded-2xl shadow-hover w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hero-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <Card className="p-8 lg:p-12 order-1 lg:order-2 bg-card/95 backdrop-blur-sm shadow-soft hover:shadow-hover transition-all duration-300 border-border/50 animate-fade-in">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Book a Free Session
                </h1>
                <p className="text-muted-foreground mb-8">Let's plan your future together.</p>
                
                <form className="space-y-6">
                  <div className="group">
                    <Label htmlFor="name" className="group-hover:text-primary transition-colors duration-300">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name" 
                      className="mt-2 focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:border-primary/50" 
                    />
                  </div>

                  <div className="group">
                    <Label htmlFor="mobile" className="group-hover:text-primary transition-colors duration-300">Mobile Number</Label>
                    <Input 
                      id="mobile" 
                      placeholder="Enter your 10-digit number" 
                      className="mt-2 focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:border-primary/50" 
                    />
                  </div>

                  <div className="group">
                    <Label htmlFor="class" className="group-hover:text-primary transition-colors duration-300">Class / Semester</Label>
                    <Select>
                      <SelectTrigger className="mt-2 focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:border-primary/50">
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                        <SelectItem value="ug1">UG - 1st Year</SelectItem>
                        <SelectItem value="ug2">UG - 2nd Year</SelectItem>
                        <SelectItem value="ug3">UG - 3rd Year</SelectItem>
                        <SelectItem value="ug4">UG - 4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button size="lg" className="w-full group hover:scale-[1.02] transition-all duration-300">
                    Submit
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default BookSession;
