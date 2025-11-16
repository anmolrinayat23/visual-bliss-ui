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
  // ✅ UG form states
  const [ugFormData, setUgFormData] = useState({
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

  // ✅ PG form states
  const [pgFormData, setPgFormData] = useState({
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
    passingYear: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ug");

  // ✅ Handle UG form changes
  const handleUgChange = (key: string, value: string) => {
    setUgFormData({ ...ugFormData, [key]: value });
  };

  // ✅ Handle PG form changes
  const handlePgChange = (key: string, value: string) => {
    setPgFormData({ ...pgFormData, [key]: value });
  };

  // ✅ Validate form function
  const validateForm = (formData: any, isPg: boolean = false) => {
    const requiredFields = [
      'name', 'email', 'mobile', 'city', 'state', 'class', 'stream', 'grade10', 'grade12'
    ];
    
    if (isPg) {
      requiredFields.push('graduationScore', 'graduationStream', 'passingYear');
    }

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`Please fill all required fields! Missing: ${field}`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return false;
    }

    // Mobile validation (10 digits)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\D/g, ''))) {
      alert("Please enter a valid 10-digit mobile number!");
      return false;
    }

    return true;
  };

  // ✅ Handle Payment Process
  const handlePayment = async (applicationId: string, formData: any, isPg: boolean = false) => {
    try {
      setLoading(true);

      // 1️⃣ Create payment order
      const { data } = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: 500, // ₹500
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to create payment order");
      }

      const { key, order } = data;

      // 2️⃣ Open Razorpay checkout
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Educate Me",
        description: `EM-MAT ${isPg ? "PG" : "UG"} Application Fee`,
        order_id: order.id,

        // ✅ Payment Successful callback
        handler: async function (response: any) {
          try {
            // 3️⃣ Update application status to "completed"
            try {
              const updateUrl = `http://localhost:5000/user/${isPg ? "pg-applications" : "ug-applications"}/${applicationId}`;
              
              const updateData = {
                paymentStatus: "completed",
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              };

              console.log("Updating application status:", updateData);

              const updateResponse = await axios.put(updateUrl, updateData);

              if (updateResponse.data.success) {
                alert("✅ Payment successful! Your application has been completed.");
                
                // Reset form
                if (isPg) {
                  setPgFormData({
                    name: "", email: "", mobile: "", city: "", state: "",
                    class: "", stream: "", grade10: "", grade12: "",
                    graduationScore: "", graduationStream: "", passingYear: ""
                  });
                } else {
                  setUgFormData({
                    name: "", email: "", mobile: "", city: "", state: "",
                    class: "", stream: "", grade10: "", grade12: ""
                  });
                }
              } else {
                alert("❌ Payment status update failed: " + updateResponse.data.message);
              }
            } catch (updateError: any) {
              console.error("Error updating application:", updateError);
              alert("❌ Error updating application: " + (updateError.response?.data?.message || updateError.message));
            }
          } catch (error: any) {
            console.error("Payment processing error:", error);
            alert("❌ Payment processing failed");
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: { color: "#f97316" },
        modal: {
          ondismiss: function () {
            setLoading(false);
            alert("Payment cancelled. Your application is saved with pending status.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      alert("❌ Something went wrong: " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  const handleUgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(ugFormData, false)) return;

    try {
      setLoading(true);

      const saveUrl = "http://localhost:5000/user/ug-applications/createug";
      
      const applicationData = {
        ...ugFormData,
        paymentStatus: "pending",
        applicationDate: new Date()
      };

      console.log("Saving UG application:", applicationData);

      const saveResponse = await axios.post(saveUrl, applicationData);

      if (saveResponse.data.success) {
        const applicationId = saveResponse.data.application._id;
        alert("✅ Application saved! Now proceed with payment.");
        
        await handlePayment(applicationId, ugFormData, false);
      } else {
        alert("❌ Application submission failed: " + saveResponse.data.message);
      }
    } catch (saveError: any) {
      console.error("Error saving UG application:", saveError);
      alert("❌ Error saving application: " + (saveError.response?.data?.message || saveError.message));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle PG Form Submission
  const handlePgSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(pgFormData, true)) return;

    try {
      setLoading(true);

      const saveUrl = "http://localhost:5000/user/pg-applications/createpg";
      
      const applicationData = {
        ...pgFormData,
        paymentStatus: "pending",
        applicationDate: new Date()
      };

      console.log("Saving PG application:", applicationData);

      const saveResponse = await axios.post(saveUrl, applicationData);

      if (saveResponse.data.success) {
        const applicationId = saveResponse.data.application._id;
        alert("✅ Application saved! Now proceed with payment.");
        
        // 2️⃣ Now open payment gateway
        await handlePayment(applicationId, pgFormData, true);
      } else {
        alert("❌ Application submission failed: " + saveResponse.data.message);
      }
    } catch (saveError: any) {
      console.error("Error saving PG application:", saveError);
      alert("❌ Error saving application: " + (saveError.response?.data?.message || saveError.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="pt-16"> {/* Changed from pt-15 mt-20 to pt-16 */}
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

            <Tabs defaultValue="ug" className="w-full" onValueChange={setActiveTab}>
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
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">UG Application Form</h2>
                      <p className="text-gray-600 text-lg">Fill in your details to apply for the EM-MAT UG exam</p>
                    </div>

                    <form onSubmit={handleUgSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="ug-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="ug-name"
                            value={ugFormData.name}
                            onChange={(e) => handleUgChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="ug-class" className="text-sm font-semibold text-gray-800">
                            Class *
                          </Label>
                          <Select onValueChange={(value) => handleUgChange('class', value)} value={ugFormData.class}>
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
                          <Label htmlFor="ug-stream" className="text-sm font-semibold text-gray-800">
                            Stream *
                          </Label>
                          <Select onValueChange={(value) => handleUgChange('stream', value)} value={ugFormData.stream}>
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
                          <Label htmlFor="ug-email" className="text-sm font-semibold text-gray-800">
                            Email Address *
                          </Label>
                          <Input
                            id="ug-email"
                            type="email"
                            value={ugFormData.email}
                            onChange={(e) => handleUgChange('email', e.target.value)}
                            placeholder="you@example.com"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="ug-mobile" className="text-sm font-semibold text-gray-800">
                            Mobile Number *
                          </Label>
                          <Input
                            id="ug-mobile"
                            value={ugFormData.mobile}
                            onChange={(e) => handleUgChange('mobile', e.target.value)}
                            placeholder="Enter your mobile number"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="ug-city" className="text-sm font-semibold text-gray-800">
                            City *
                          </Label>
                          <Input
                            id="ug-city"
                            value={ugFormData.city}
                            onChange={(e) => handleUgChange('city', e.target.value)}
                            placeholder="Enter your city"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="ug-state" className="text-sm font-semibold text-gray-800">
                            State *
                          </Label>
                          <Input
                            id="ug-state"
                            value={ugFormData.state}
                            onChange={(e) => handleUgChange('state', e.target.value)}
                            placeholder="Enter your state"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="ug-grade10" className="text-sm font-semibold text-gray-800">
                            10th Grade (%) *
                          </Label>
                          <Input
                            id="ug-grade10"
                            value={ugFormData.grade10}
                            onChange={(e) => handleUgChange('grade10', e.target.value)}
                            placeholder="e.g. 85.5"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="ug-grade12" className="text-sm font-semibold text-gray-800">
                            12th Grade (%) *
                          </Label>
                          <Input
                            id="ug-grade12"
                            value={ugFormData.grade12}
                            onChange={(e) => handleUgChange('grade12', e.target.value)}
                            placeholder="e.g. 92.0"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          {/* Empty div for layout consistency */}
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        size="lg"
                        className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-md rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Saving Application..." : "Apply Now - ₹500"}
                      </Button>
                    </form>
                  </Card>

                  {/* Info Card */}
                  <Card className="p-8 bg-white border border-gray-200 relative overflow-hidden rounded-xl shadow-lg">
                    <div className="relative z-10">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">About EM-MAT</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-base">
                          EM-MAT opens doors to India's best private universities. Show your aptitude, stand out among the brightest, and join the top 200 for our elite Final Preparation Program — where preparation meets transformation.
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

                      <div className="mt-8 mb-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                        <p className="text-gray-600 text-center text-sm leading-relaxed font-bold">
                          "Educate-Me — Bridging education, innovation, and opportunity."
                        </p>
                      </div>
                    </div>

                    {/* Background Pattern */}
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
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">PG Application Form</h2>
                      <p className="text-gray-600 text-lg">Fill in your details to apply for the EM-MAT PG exam</p>
                    </div>

                    <form onSubmit={handlePgSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="pg-name" className="text-sm font-semibold text-gray-800">
                            Candidate Name *
                          </Label>
                          <Input
                            id="pg-name"
                            value={pgFormData.name}
                            onChange={(e) => handlePgChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="pg-class" className="text-sm font-semibold text-gray-800">
                            Class *
                          </Label>
                          <Select onValueChange={(value) => handlePgChange('class', value)} value={pgFormData.class}>
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
                          <Label htmlFor="pg-stream" className="text-sm font-semibold text-gray-800">
                            Stream *
                          </Label>
                          <Select onValueChange={(value) => handlePgChange('stream', value)} value={pgFormData.stream}>
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
                          <Label htmlFor="pg-email" className="text-sm font-semibold text-gray-800">
                            Email Address *
                          </Label>
                          <Input
                            id="pg-email"
                            type="email"
                            value={pgFormData.email}
                            onChange={(e) => handlePgChange('email', e.target.value)}
                            placeholder="you@example.com"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="pg-mobile" className="text-sm font-semibold text-gray-800">
                            Mobile Number *
                          </Label>
                          <Input
                            id="pg-mobile"
                            value={pgFormData.mobile}
                            onChange={(e) => handlePgChange('mobile', e.target.value)}
                            placeholder="Enter your mobile number"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="pg-city" className="text-sm font-semibold text-gray-800">
                            City *
                          </Label>
                          <Input
                            id="pg-city"
                            value={pgFormData.city}
                            onChange={(e) => handlePgChange('city', e.target.value)}
                            placeholder="Enter your city"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="pg-state" className="text-sm font-semibold text-gray-800">
                            State *
                          </Label>
                          <Input
                            id="pg-state"
                            value={pgFormData.state}
                            onChange={(e) => handlePgChange('state', e.target.value)}
                            placeholder="Enter your state"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="pg-grade10" className="text-sm font-semibold text-gray-800">
                            10th Grade (%) *
                          </Label>
                          <Input
                            id="pg-grade10"
                            value={pgFormData.grade10}
                            onChange={(e) => handlePgChange('grade10', e.target.value)}
                            placeholder="e.g. 85.5"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="pg-grade12" className="text-sm font-semibold text-gray-800">
                            12th Grade (%) *
                          </Label>
                          <Input
                            id="pg-grade12"
                            value={pgFormData.grade12}
                            onChange={(e) => handlePgChange('grade12', e.target.value)}
                            placeholder="e.g. 92.0"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="pg-graduationScore" className="text-sm font-semibold text-gray-800">
                            Graduation Score *
                          </Label>
                          <Input
                            id="pg-graduationScore"
                            value={pgFormData.graduationScore}
                            onChange={(e) => handlePgChange('graduationScore', e.target.value)}
                            placeholder="e.g. 8.5 CGPA or 82%"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label htmlFor="pg-graduationStream" className="text-sm font-semibold text-gray-800">
                            Graduation Stream *
                          </Label>
                          <Input
                            id="pg-graduationStream"
                            value={pgFormData.graduationStream}
                            onChange={(e) => handlePgChange('graduationStream', e.target.value)}
                            placeholder="e.g. Bachelor of Science (B.Sc) in Computer Science"
                            className="h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-xl transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label htmlFor="pg-passingYear" className="text-sm font-semibold text-gray-800">
                            Passing Year *
                          </Label>
                          <Input
                            id="pg-passingYear"
                            value={pgFormData.passingYear}
                            onChange={(e) => handlePgChange('passingYear', e.target.value)}
                            placeholder="e.g. 2024"
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
                        {loading ? "Saving Application..." : "Apply Now - ₹500"}
                      </Button>
                    </form>
                  </Card>

                  {/* Info Card */}
                  <Card className="p-8 bg-white border border-gray-200 relative overflow-hidden rounded-xl shadow-lg">
                    <div className="relative z-10">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">About EM-MAT</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-base">
                          EM-MAT opens doors to India's best private universities. Show your aptitude, stand out among the brightest, and join the top 200 for our elite Final Preparation Program — where preparation meets transformation.
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

                      <div className="mt-8 mb-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                        <p className="text-gray-600 text-center text-sm leading-relaxed font-bold">
                          "Educate-Me — Bridging education, innovation, and opportunity."
                        </p>
                      </div>
                    </div>

                    {/* Background Pattern */}
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