"use client";

import React, { useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Razorpay global type
declare global {
  interface Window {
    Razorpay: any;
  }
}

const EmMat = ({ showFooter = true }) => {
  // ✅ form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    class: "",
    stream: "",
    grade10: "",
    grade12: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // ✅ handle payment
  const handleApplyNow = async (e: React.FormEvent) => {
    e.preventDefault();

    // simple validation
    if (!formData.name || !formData.email || !formData.mobile) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ create order from backend
      const { data } = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: 500, // ₹100
      });

      const { key, order } = data;

      // 2️⃣ open Razorpay checkout
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Educate Me",
        description: "EM-MAT Application Fee",
        order_id: order.id,
        handler: function (response: any) {
          alert("✅ Payment successful!");
          console.log("Payment:", response);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: "#f97316" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-10">
        <section className="py-8 sm:py-12 px-3 sm:px-4">
          <div className="container mx-auto max-w-8xl">
            {/* Header Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                EM-MAT Exam
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The Educate Me Aptitude Test (EM-MAT) is a standardized test used for admissions into various
                undergraduate and postgraduate programs. It assesses quantitative reasoning, verbal reasoning,
                and analytical skills.
              </p>
            </div>

            <Tabs defaultValue="ug" className="w-full ">

              <TabsList className="flex w-full max-w-md mx-auto mb-12  bg-[#f4f9fc] rounded-2xl p-1.5 gap-8">

                <TabsTrigger
                  value="ug"
                  className="flex-1 text-base font-semibold rounded-xl data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 text-center py-3.5 hover:bg-gray-200"
                >
                  UG Track
                </TabsTrigger>

                <TabsTrigger
                  value="pg"
                  className="flex-1 text-base font-semibold rounded-xl data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 text-center py-3.5 hover:bg-gray-200"
                >
                  PG Track
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ug" className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Application Form */}
                  <Card className="lg:col-span-2 p-8 bg-white border border-gray-200  rounded-xl">
                    <div className="mb-10">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Form</h2>
                      <p className="text-gray-600 text-lg">Fill in your details to apply for the EM-MAT exam</p>
                    </div>

                    <form className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="class" className="text-sm font-semibold text-gray-800">
                            Class *
                          </Label>
                          <Select>
                            <SelectTrigger className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300">
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="stream" className="text-sm font-semibold text-gray-800">
                            Stream *
                          </Label>
                          <Select>
                            <SelectTrigger className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300">
                              <SelectValue placeholder="Select your stream" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="commerce">Commerce</SelectItem>
                              <SelectItem value="arts">Arts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-800">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="mobile" className="text-sm font-semibold text-gray-800">
                            Mobile Number *
                          </Label>
                          <Input
                            id="mobile"
                            placeholder="Enter your mobile number"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="city" className="text-sm font-semibold text-gray-800">
                            City *
                          </Label>
                          <Input
                            id="city"
                            placeholder="Enter your city"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="state" className="text-sm font-semibold text-gray-800">
                            State *
                          </Label>
                          <Input
                            id="state"
                            placeholder="Enter your state"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="grade10" className="text-sm font-semibold text-gray-800">
                            10th Grade (%) *
                          </Label>
                          <Input
                            id="grade10"
                            placeholder="e.g. 85.5"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="grade12" className="text-sm font-semibold text-gray-800">
                            12th Grade (%) *
                          </Label>
                          <Input
                            id="grade12"
                            placeholder="e.g. 92.0"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>

                      </div>

                      <Button
                        size="lg"
                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-md rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6"
                      >
                        Apply Now
                      </Button>
                    </form>
                  </Card>

                  {/* Super 100 Batch Card */}
                  <Card className="p-8 bg-white border border-gray-200 relative overflow-hidden rounded-xl shadow-lg">
                    <div className="relative z-10">
                      <div className="mb-6">
                        {/* <span className="inline-block bg-orange-100 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-4">
        Exclusive Offer
      </span> */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">About EM-MAT</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-base">
                          EM-MAT opens doors to India’s best private universities. Show your aptitude, stand out among the brightest, and join the top 200 for our elite Final Preparation Program — where preparation meets transformation.
                        </p>
                      </div>

                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Personalized, data-driven guidance</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Trusted academic collaborations</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Affordable access to world-class education</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Industry-recognized certifications</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Career pathways that ensure employability</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">End-to-end student lifecycle support</span>
                        </li>
                      </ul>

                      {/* Why Join Section */}
                      <div className="mt-8 mb-8 mt-[200px] p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                        {/* <h3 className="font-semibold text-xl text-gray-900 text-center mb-3">Why Join Super 100?</h3> */}
                        <p className="text-gray-600 text-center text-sm leading-relaxed font-bold">
                          “Educate-Me — Bridging education, innovation, and opportunity.”
                        </p>
                      </div>

                      {/* <Button 
      size="lg" 
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-md rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 py-6"
    >
      Learn More
    </Button> */}
                    </div>

                    {/* Background Pattern - Light blur boxes */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full -translate-y-20 translate-x-20 blur-xl opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50 rounded-full translate-y-16 -translate-x-16 blur-xl opacity-60"></div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pg" className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Application Form */}
                  <Card className="lg:col-span-2 p-8 bg-white border border-gray-200  rounded-xl">
                    <div className="mb-10">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Form</h2>
                      <p className="text-gray-600 text-lg">Fill in your details to apply for the EM-MAT exam</p>
                    </div>

                    <form className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="class" className="text-sm font-semibold text-gray-800">
                            Class *
                          </Label>
                          <Select>
                            <SelectTrigger className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300">
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="stream" className="text-sm font-semibold text-gray-800">
                            Stream *
                          </Label>
                          <Select>
                            <SelectTrigger className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300">
                              <SelectValue placeholder="Select your stream" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="commerce">Commerce</SelectItem>
                              <SelectItem value="arts">Arts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-800">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="mobile" className="text-sm font-semibold text-gray-800">
                            Mobile Number *
                          </Label>
                          <Input
                            id="mobile"
                            placeholder="Enter your mobile number"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="city" className="text-sm font-semibold text-gray-800">
                            City *
                          </Label>
                          <Input
                            id="city"
                            placeholder="Enter your city"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="state" className="text-sm font-semibold text-gray-800">
                            State *
                          </Label>
                          <Input
                            id="state"
                            placeholder="Enter your state"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="grade10" className="text-sm font-semibold text-gray-800">
                            10th Grade (%) *
                          </Label>
                          <Input
                            id="grade10"
                            placeholder="e.g. 85.5"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="grade12" className="text-sm font-semibold text-gray-800">
                            12th Grade (%) *
                          </Label>
                          <Input
                            id="grade12"
                            placeholder="e.g. 92.0"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="grade12" className="text-sm font-semibold text-gray-800">
                            Graduation Score *
                          </Label>
                          <Input
                            id="grade12"
                            placeholder="e.g. 8.5 CGPA or 82%"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="graduationStream" className="text-sm font-semibold text-gray-800">
                            Graduation Stream *
                          </Label>
                          <Input
                            id="graduationStream"
                            placeholder="e.g. Bachelor of Science (B.Sc) in Computer Science"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="passingYear" className="text-sm font-semibold text-gray-800">
                            Passing Year *
                          </Label>
                          <Input
                            id="passingYear"
                            placeholder="e.g. 2024"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-md rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6"
                      >
                        Apply Now
                      </Button>
                    </form>
                  </Card>

                  {/* Super 100 Batch Card */}
                  <Card className="p-8 bg-white border border-gray-200 relative overflow-hidden rounded-xl shadow-lg">
                    <div className="relative z-10">
                      <div className="mb-6">
                        {/* <span className="inline-block bg-orange-100 text-orange-600 text-sm font-bold px-4 py-2 rounded-full mb-4">
        Exclusive Offer
      </span> */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">About EM-MAT</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-base">
                          EM-MAT opens doors to India’s best private universities. Show your aptitude, stand out among the brightest, and join the top 200 for our elite Final Preparation Program — where preparation meets transformation.
                        </p>
                      </div>

                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Personalized, data-driven guidance</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Trusted academic collaborations</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Affordable access to world-class education</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Industry-recognized certifications</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">Career pathways that ensure employability</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium">End-to-end student lifecycle support</span>
                        </li>
                      </ul>

                      {/* Why Join Section */}
                      <div className="mt-8 mb-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                        {/* <h3 className="font-semibold text-xl text-gray-900 text-center mb-3">Why Join Super 100?</h3> */}
                        <p className="text-gray-600 text-center text-sm leading-relaxed font-bold">
                          “Educate-Me — Bridging education, innovation, and opportunity.”
                        </p>
                      </div>

                      {/* <Button 
      size="lg" 
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-md rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 py-6"
    >
      Learn More
    </Button> */}
                    </div>

                    {/* Background Pattern - Light blur boxes */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full -translate-y-20 translate-x-20 blur-xl opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-50 rounded-full translate-y-16 -translate-x-16 blur-xl opacity-60"></div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default EmMat;
