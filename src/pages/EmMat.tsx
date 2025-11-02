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
    graduationScore: "",
    graduationStream: "",
    passingYear: ""
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ug");

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // ✅ Validate form data
  const validateForm = () => {
    const requiredFields = [
      'name', 'email', 'mobile', 'city', 'state', 
      'class', 'stream', 'grade10', 'grade12'
    ];
    
    if (activeTab === "pg") {
      requiredFields.push('graduationScore', 'graduationStream', 'passingYear');
    }

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill ${field} field!`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return false;
    }

    // Mobile validation
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number!");
      return false;
    }

    return true;
  };

  // ✅ handle payment
  const handleApplyNow = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ create order from backend
      const { data } = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: 50000, // ₹500 in paise (Razorpay expects amount in paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
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
          console.log("Payment successful:", response);
          
          // You can send payment verification to your backend here
          // handlePaymentVerification(response);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        notes: {
          applicationType: activeTab === "ug" ? "UG" : "PG",
          studentEmail: formData.email
        },
        theme: { color: "#f97316" },
        modal: {
          ondismiss: function() {
            alert("Payment cancelled by user");
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', function(response: any) {
        alert("Payment failed. Please try again.");
        console.error("Payment failed:", response.error);
        setLoading(false);
      });

    } catch (error: any) {
      console.error("Payment error:", error);
      if (error.response) {
        // Backend error
        alert(`Payment failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        // Network error
        alert("Cannot connect to payment server. Please check your internet connection.");
      } else {
        // Other errors
        alert("Something went wrong during payment.");
      }
      setLoading(false);
    }
  };

  // Handle payment verification (optional - for better UX)
  const handlePaymentVerification = async (paymentResponse: any) => {
    try {
      const verificationResponse = await axios.post("http://localhost:5000/api/payments/verify-payment", {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        formData: formData,
        applicationType: activeTab
      });
      
      console.log("Payment verified:", verificationResponse.data);
      // You can redirect to success page or show success message here
      
    } catch (error) {
      console.error("Payment verification failed:", error);
    }
  };

  // Reset form when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Optional: Reset form or keep form data as per requirement
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-15 mt-20">
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

            <Tabs defaultValue="ug" className="w-full" onValueChange={handleTabChange}>

              <TabsList className="flex w-full max-w-md mx-auto mb-12 bg-[#f4f9fc] rounded-2xl p-1.5 gap-8">
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

              {/* UG Tab Content */}
              <TabsContent value="ug" className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Application Form */}
                  <Card className="lg:col-span-2 p-8 bg-white border border-gray-200 rounded-xl">
                    <div className="mb-10">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Form</h2>
                      <p className="text-gray-600 text-lg">Fill in your details to apply for the EM-MAT exam</p>
                    </div>

                    <form onSubmit={handleApplyNow} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="class" className="text-sm font-semibold text-gray-800">
                            Class *
                          </Label>
                          <Select onValueChange={(value) => handleChange("class", value)} value={formData.class}>
                            <SelectTrigger className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300">
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">Class 12</SelectItem>
                              <SelectItem value="11">Class 11</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="stream" className="text-sm font-semibold text-gray-800">
                            Stream *
                          </Label>
                          <Select onValueChange={(value) => handleChange("stream", value)} value={formData.stream}>
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
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
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
                            value={formData.mobile}
                            onChange={(e) => handleChange("mobile", e.target.value)}
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
                            value={formData.city}
                            onChange={(e) => handleChange("city", e.target.value)}
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
                            value={formData.state}
                            onChange={(e) => handleChange("state", e.target.value)}
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
                            value={formData.grade10}
                            onChange={(e) => handleChange("grade10", e.target.value)}
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
                            value={formData.grade12}
                            onChange={(e) => handleChange("grade12", e.target.value)}
                            placeholder="e.g. 92.0"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        size="lg"
                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-md rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Processing..." : "Apply Now - ₹500"}
                      </Button>
                    </form>
                  </Card>

                  {/* About EM-MAT Card */}
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

              {/* PG Tab Content */}
              <TabsContent value="pg" className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Application Form */}
                  <Card className="lg:col-span-2 p-8 bg-white border border-gray-200 rounded-xl">
                    <div className="mb-10">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Form</h2>
                      <p className="text-gray-600 text-lg">Fill in your details to apply for the EM-MAT exam</p>
                    </div>

                    <form onSubmit={handleApplyNow} className="space-y-8">
                      {/* PG form fields with state binding */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="pg-class" className="text-sm font-semibold text-gray-800">
                            Class *
                          </Label>
                          <Select onValueChange={(value) => handleChange("class", value)} value={formData.class}>
                            <SelectTrigger className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300">
                              <SelectValue placeholder="Select your class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="graduate">Graduate</SelectItem>
                              <SelectItem value="post-graduate">Post Graduate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                          <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>

                          <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>

                          <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>

                          <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>


                          <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>


                          <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>

                          <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>

                          <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        
                      </div>

                      {/* Add all other PG form fields with proper state binding */}
                      {/* ... similar to UG but with graduation fields */}

                      <Button
                        type="submit"
                        disabled={loading}
                        size="lg"
                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-md rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Processing..." : "Apply Now - ₹500"}
                      </Button>
                    </form>
                  </Card>

                  {/* About EM-MAT Card */}
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