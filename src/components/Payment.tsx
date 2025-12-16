import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

// 🧩 TypeScript declaration for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

// ✅ Helper to dynamically load Razorpay SDK
const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return resolve(true); // already loaded
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject("Razorpay SDK failed to load");
    document.body.appendChild(script);
  });
};

const EmMat = ({ showFooter = true }) => {
  const [loading, setLoading] = useState(false);

  // ✅ Handle payment
  const handleApplyNow = async () => {
    try {
      setLoading(true);

      // 1️⃣ Load Razorpay script safely
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Razorpay SDK failed to load. Please check your internet connection.");
        return;
      }

      // 2️⃣ Create order from backend (use your running backend port)
      const { data } = await axios.post(  `${import.meta.env.VITE_API_URL}/api/payments/create-order`, {
        amount: 100, // ₹100 for testing
      });

      const { key, order } = data;

      // 3️⃣ Setup Razorpay options
      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "EM-MAT Exam",
        description: "Application Fee Payment",
        order_id: order.id,
        handler: function (response: any) {
          alert("✅ Payment successful!");
          console.log("Payment response:", response);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#F37254" },
      };

      // 4️⃣ Open Razorpay
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong while starting payment!");
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
                The Educate Me Aptitude Test (EM-MAT) is a standardized test used for admissions into various
                undergraduate and postgraduate programs. It assesses quantitative reasoning, verbal reasoning,
                and analytical skills.
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

              {/* UG Form */}
              <TabsContent value="ug" className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Application Form */}
                  <Card className="lg:col-span-2 p-4 sm:p-6 md:p-8 bg-white border border-gray-200 rounded-xl w-full">
                    <div className="mb-6 sm:mb-8 md:mb-10">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Application Form</h2>
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                        Fill in your details to apply for the EM-MAT exam
                      </p>
                    </div>

                    <form className="space-y-6 sm:space-y-8">
                      {/* Example input fields */}
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="name" className="text-xs sm:text-sm font-semibold text-gray-800">
                          Candidate Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="h-12 sm:h-14 border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 rounded-lg sm:rounded-xl transition-all duration-300 w-full"
                        />
                      </div>

                      {/* Apply Now Button with Razorpay */}
                      <Button
                        size="lg"
                        onClick={handleApplyNow}
                        disabled={loading}
                        className="w-full h-12 sm:h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-sm sm:text-md rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-4 sm:mt-6"
                      >
                        {loading ? "Processing..." : "Apply Now"}
                      </Button>
                    </form>
                  </Card>

                  {/* Super 100 Batch (unchanged) */}
                  <Card className="p-4 sm:p-6 md:p-8 bg-white border border-gray-200 relative overflow-hidden rounded-xl shadow-lg w-full">
                    <div className="relative z-10">
                      <span className="inline-block bg-orange-100 text-orange-600 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full mb-3 sm:mb-4">
                        Exclusive Offer
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Super 100 Batch
                      </h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                        Join our exclusive Super 100 Batch for personalized guidance and enhanced preparation for the EM-MAT exam.
                      </p>
                      <Button
                        size="lg"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-md rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 py-4 sm:py-6"
                      >
                        Learn More
                      </Button>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* PG Tab */}
              <TabsContent value="pg">
                <Card className="p-6 sm:p-8 md:p-16 text-center bg-white border border-gray-200 shadow-xl rounded-2xl sm:rounded-3xl">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                    PG Track Application
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                    The PG track application will be available soon.
                  </p>
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                    Notify Me When Available
                  </Button>
                </Card>
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
