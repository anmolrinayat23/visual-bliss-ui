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
    <div className="min-h-screen bg-vision-bg">
      <Header />
      <main className="pt-16">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src={counsellingImage} 
                  alt="Student counselling session" 
                  className="rounded-2xl shadow-lg w-full h-auto object-cover"
                />
              </div>

              <Card className="p-8 lg:p-12 order-1 lg:order-2 bg-background">
                <h1 className="text-4xl font-bold mb-4">Book a Free Session</h1>
                <p className="text-muted-foreground mb-8">Let's plan your future together.</p>
                
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your full name" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" placeholder="Enter your 10-digit number" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="class">Class / Semester</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
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

                  <Button size="lg" className="w-full">Submit</Button>
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
