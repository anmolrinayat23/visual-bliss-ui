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
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                The Educate Me Aptitude Test (EM-MAT) is a standardized test used
                for admissions into various undergraduate and postgraduate programs.
                It assesses quantitative reasoning, verbal reasoning, and analytical
                skills.
              </p>
            </div>

            <Tabs defaultValue="ug" className="w-full">
              {/* Tabs List */}
              <TabsList className="flex w-full max-w-full sm:max-w-md mx-auto mb-8 sm:mb-12 bg-[#f4f9fc] rounded-xl sm:rounded-2xl p-1 sm:p-1.5 gap-2 sm:gap-8">
                <TabsTrigger
                  value="ug"
                  className="flex-1 text-xs sm:text-base font-semibold rounded-lg sm:rounded-xl data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 text-center py-2 sm:py-3.5 hover:bg-gray-200"
                >
                  UG Track
                </TabsTrigger>
                <TabsTrigger
                  value="pg"
                  className="flex-1 text-xs sm:text-base font-semibold rounded-lg sm:rounded-xl data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 text-center py-2 sm:py-3.5 hover:bg-gray-200"
                >
                  PG Track
                </TabsTrigger>
              </TabsList>

              {/* UG FORM */}
              <TabsContent value="ug" className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Application Form */}
                  <Card className="lg:col-span-2 p-4 sm:p-6 md:p-8 bg-white border border-gray-200 rounded-xl w-full">
                    <div className="mb-6 sm:mb-8 md:mb-10">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                        Application Form
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                        Fill in your details to apply for the EM-MAT exam
                      </p>
                    </div>

                    <form onSubmit={handleApplyNow} className="space-y-6 sm:space-y-8">
                      {/* Candidate Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="name">Candidate Name *</Label>
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="class">Class *</Label>
                          <Select
                            onValueChange={(v) => handleChange("class", v)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Stream / Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="stream">Stream *</Label>
                          <Select
                            onValueChange={(v) => handleChange("stream", v)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your stream" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="commerce">Commerce</SelectItem>
                              <SelectItem value="arts">Arts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Mobile / City */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="mobile">Mobile Number *</Label>
                          <Input
                            id="mobile"
                            placeholder="Enter your mobile number"
                            value={formData.mobile}
                            onChange={(e) => handleChange("mobile", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* State / Grades */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            placeholder="Enter your state"
                            value={formData.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="grade10">10th Grade (%) *</Label>
                          <Input
                            id="grade10"
                            placeholder="e.g. 85.5"
                            value={formData.grade10}
                            onChange={(e) => handleChange("grade10", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        <div className="space-y-2 sm:space-y-3">
                          <Label htmlFor="grade12">12th Grade (%) *</Label>
                          <Input
                            id="grade12"
                            placeholder="e.g. 92.0"
                            value={formData.grade12}
                            onChange={(e) => handleChange("grade12", e.target.value)}
                          />
                        </div>
                        <div></div>
                      </div>

                      <Button
                        size="lg"
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 sm:h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-sm sm:text-md rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-4 sm:mt-6"
                      >
                        {loading ? "Processing..." : "Apply Now & Pay ₹500"}
                      </Button>
                    </form>
                  </Card>

                    {/* Super 100 Batch Card */}
                  <Card className="p-4 sm:p-6 md:p-8 bg-white border border-gray-200 relative overflow-hidden rounded-xl shadow-lg w-full">
                    <div className="relative z-10">
                      <div className="mb-4 sm:mb-6">
                        <span className="inline-block bg-orange-100 text-orange-600 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full mb-3 sm:mb-4">
                          Exclusive Offer
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Super 100 Batch</h3>
                        <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                          Join our exclusive Super 100 Batch for personalized guidance and enhanced preparation for the EM-MAT exam.
                        </p>
                      </div>
                      
                      <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        {[
                          "Personalized mentorship",
                          "Comprehensive study material",
                          "Regular mock tests",
                          "Expert faculty guidance",
                          "Performance Growth Report",
                          "Student Progress Review",
                          "Achievement Tracking Tool"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full"></div>
                            </div>
                            <span className="text-gray-700 font-medium text-xs sm:text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Why Join Section */}
                      <div className="mt-6 sm:mt-8 mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg sm:rounded-xl border border-orange-100">
                        <h3 className="font-semibold text-base sm:text-xl text-gray-900 text-center mb-2 sm:mb-3">Why Join Super 100?</h3>
                        <p className="text-gray-600 text-center text-xs sm:text-sm leading-relaxed">
                          Because success needs strategy — and the Super 100 Batch gives you everything you need to crack EM-MAT with confidence!
                        </p>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-md rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 py-4 sm:py-6"
                      >
                        Learn More
                      </Button>
                    </div>
                    
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-40 sm:h-40 bg-orange-50 rounded-full -translate-y-10 sm:-translate-y-20 translate-x-10 sm:translate-x-20 blur-xl opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-32 sm:h-32 bg-orange-50 rounded-full translate-y-8 sm:translate-y-16 -translate-x-8 sm:-translate-x-16 blur-xl opacity-60"></div>
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
