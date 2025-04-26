import React, { useState } from 'react';
import axiosInstance from '@/axios/axiosConfig';
import Navbar from './shared/Navbar';
import { toast } from 'sonner';
import NavbarCompany from './shared/NavbarCompany';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const plans = [
  { id: 1, name: "Starter", price: 99, features: ["1 Interview Slot", "Basic Support"] },
  { id: 2, name: "Basic", price: 199, features: ["3 Interview Slots", "Priority Support"] },
  { id: 3, name: "Pro", price: 499, features: ["5 Interview Slots", "Dedicated Support"] },
  { id: 4, name: "Premium", price: 999, features: ["10 Interview Slots","Mock Interviews"] },
  { id: 5, name: "Elite", price: 1499, features: ["Unlimited Slots ", "Career Counselling"] },
];

const PaymentCompany = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (amount) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Please try again.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axiosInstance.post("payment/create-order", { amount: amount * 100 }); // ₹ -> paise
      const order = data.data; // assuming inside data.data
      
      const options = {
        key: "rzp_test_8QaSVEOkXKJiK9",
        amount: order.amount,
        currency: "INR",
        name: "HireHustle",
        description: "Subscription Payment",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const result = await axiosInstance.post("payment/verify", {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });
          //alert(result.data.message);
          toast.success(result?.data?.message);
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", async function (response) {
        await axiosInstance.post("payment/payment-failed", {
          orderId: response.error.metadata.order_id,
          status: "failed",
          reason: response.error.description,
        });
        alert("Payment failed: " + response.error.description);
      });

      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <NavbarCompany/>
    <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Choose Your Subscription Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold text-blue-600 mb-4">₹{plan.price}</p>
            <ul className="text-gray-600 mb-6 space-y-2 text-center">
              {plan.features.map((feature, idx) => (
                <li key={idx}>✔️ {feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handlePayment(plan.price/100)}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
};

export default PaymentCompany;
