import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import counsellingImage from "@/assets/counselling.jpg";
import { Calendar, Clock, User, Phone, GraduationCap } from "lucide-react";

const BookSession = ({showFooter=true}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 w-2xl">
              Let's Plan Your Roadmap for an Elevated Career Ahead.
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
    Don’t just dream it—plan it! Our counsellors help you discover your strengths and choose the right career path with confidence.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image Section */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <img 
                    src={counsellingImage} 
                    alt="Student counselling session" 
                    className="rounded-xl  w-full h-[660px] object-cover"
                  />
                  {/* Overlay Stats */}
                  {/* <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-orange-500">5000+</div>
                        <div className="text-sm text-gray-600">Students Guided</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-500">98%</div>
                        <div className="text-sm text-gray-600">Success Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-500">50+</div>
                        <div className="text-sm text-gray-600">Expert Counsellors</div>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* Features List */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Calendar className="w-6 h-6 text-orange-500 mr-3" />
                    <span className="text-gray-700 font-medium">Personal Tutoring</span>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <User className="w-6 h-6 text-orange-500 mr-3" />
                    <span className="text-gray-700 font-medium">Academic Mentorship</span>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Clock className="w-6 h-6 text-orange-500 mr-3" />
                    <span className="text-gray-700 font-medium">Learning Facilitation</span>
                  </div>
                  <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <GraduationCap className="w-6 h-6 text-orange-500 mr-3" />
                    <span className="text-gray-700 font-medium">Scholastic Navigator</span>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <Card className="p-8 lg:p-10 order-1 lg:order-2 bg-white border-0  rounded-xl">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Get Started Today</h2>
                  <p className="text-gray-600 text-lg">
                    Fill in your details and our counsellor will contact you within 24 hours.
                  </p>
                </div>
                
               <form className="space-y-6 outline-none">
  <div className="space-y-2">
    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
      Full Name *
    </Label>
    <div className="relative">
      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        id="name"
        placeholder="Enter your full name"
        className="pl-10 h-12  outline-none rounded-xl transition-all duration-300"
      />
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="mobile" className="text-sm font-semibold text-gray-700">
      Mobile Number *
    </Label>
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        id="mobile"
        placeholder="Enter your 10-digit number"
        className="pl-10 h-12 focus:outline focus:outline-2 focus:outline-orange-500 rounded-xl transition-all duration-300"
      />
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
      Email Address
    </Label>
    <Input
      id="email"
      type="email"
      placeholder="you@example.com"
      className="h-12  focus:outline focus:outline-2 focus:outline-orange-500 rounded-xl transition-all duration-300"
    />
  </div>

  <div className="space-y-2">
    <Label htmlFor="class" className="text-sm font-semibold text-gray-700">
      Current Class / Semester *
    </Label>
    <div className="relative">
      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
      <Select>
        <SelectTrigger className="pl-10 h-12 focus:outline focus:outline-2 focus:outline-orange-500 rounded-xl transition-all duration-300">
          <SelectValue placeholder="Select your class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="12">Class 12</SelectItem>
          <SelectItem value="ug1">UG - 1st Year</SelectItem>
          <SelectItem value="ug2">UG - 2nd Year</SelectItem>
          <SelectItem value="ug3">UG - 3rd Year</SelectItem>
          <SelectItem value="ug4">UG - 4th Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="interest" className="text-sm font-semibold text-gray-700">
      Area of Interest
    </Label>
    <Select>
      <SelectTrigger className="h-12  focus:outline focus:outline-2 focus:outline-orange-500 rounded-xl transition-all duration-300">
        <SelectValue placeholder="Select your interest" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="engineering">Engineering</SelectItem>
        <SelectItem value="medical">Medical</SelectItem>
        <SelectItem value="management">Management</SelectItem>
        <SelectItem value="arts">Arts & Humanities</SelectItem>
        <SelectItem value="commerce">Commerce</SelectItem>
        <SelectItem value="law">Law</SelectItem>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <Button
    size="lg"
    className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-md rounded-xl transition-all duration-300  transform hover:scale-105"
  >
    Book Free Session
  </Button>

  <p className="text-center text-sm text-gray-500">
    By continuing, you agree to our Terms and Privacy Policy
  </p>
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