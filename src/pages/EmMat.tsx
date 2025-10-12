import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EmMat = ({showFooter=true}) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-6">EM-MAT Exam</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                The Educate Me Aptitude Test (EM-MAT) is a standardized test used for admissions into various undergraduate and postgraduate programs. It assesses a candidate's aptitude in areas such as quantitative reasoning, verbal reasoning, and analytical skills.
              </p>
            </div>

            <Tabs defaultValue="ug" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="ug" className="text-base px-8">UG Track</TabsTrigger>
                <TabsTrigger value="pg" className="text-base px-8">PG Track</TabsTrigger>
              </TabsList>

              <TabsContent value="ug">
                <div className="grid lg:grid-cols-3 gap-8">
                  <Card className="lg:col-span-2 p-8">
                    <h2 className="text-3xl font-bold mb-8">Application Form</h2>
                    
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Candidate Name</Label>
                          <Input id="name" placeholder="Enter your full name" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="class">Class</Label>
                          <Select>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">Class 10</SelectItem>
                              <SelectItem value="11">Class 11</SelectItem>
                              <SelectItem value="12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="stream">Stream</Label>
                          <Select>
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select your stream" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="commerce">Commerce</SelectItem>
                              <SelectItem value="arts">Arts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="you@example.com" className="mt-2" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="mobile">Mobile</Label>
                          <Input id="mobile" placeholder="Enter your mobile number" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="Enter your city" className="mt-2" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="Enter your state" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="grade10">10th Grade (%)</Label>
                          <Input id="grade10" placeholder="e.g. 85.5" className="mt-2" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="grade12">12th Grade (%)</Label>
                          <Input id="grade12" placeholder="e.g. 92.0" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="cgpa">Semester Grade (CGPA)</Label>
                          <Input id="cgpa" placeholder="e.g. 8.8" className="mt-2" />
                        </div>
                      </div>

                      <Button size="lg" className="w-full">Apply Now</Button>
                    </form>
                  </Card>

                  <Card className="p-8 bg-gradient-to-br from-muted to-muted/50 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4">Super 100 Batch</h3>
                    <p className="text-muted-foreground mb-8">
                      Join our exclusive Super 100 Batch for personalized guidance and enhanced preparation for the EM-MAT exam.
                    </p>
                    <Button size="lg">Learn More</Button>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pg">
                <Card className="p-8">
                  <h2 className="text-3xl font-bold mb-4">PG Track Application</h2>
                  <p className="text-muted-foreground">Coming soon...</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    { showFooter && <Footer />}
    </div>
  );
};

export default EmMat;
