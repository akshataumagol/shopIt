import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Package, Truck, CheckCircle, Clock, MapPin, Home } from "lucide-react";

const BASE_URL = "https://shopit-56mz.onrender.com";

const steps = [
  { key: "processing", label: "Order Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Package },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <Package className="w-8 h-8 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-700 text-lg font-medium mt-6">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center border border-red-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex(
    (step) => step.key === (order.status || "processing")
  );

  const currentStep = steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-purple-100">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Track Your Order
            </h1>
            <div className="inline-flex items-center gap-2 bg-purple-50 px-6 py-3 rounded-full border border-purple-200">
              <MapPin className="w-4 h-4 text-purple-600" />
              <p className="text-purple-900 text-sm font-semibold">
                Order #{order._id}
              </p>
            </div>
          </div>
        </div>

        {/* CURRENT STATUS CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-green-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                {React.createElement(currentStep.icon, {
                  className: "w-10 h-10 text-green-600 animate-pulse"
                })}
              </div>
              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-wider mb-1">
                  Current Status
                </p>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 capitalize">
                  {(order.status || "processing").replaceAll("_", " ")}
                </p>
              </div>
            </div>
            <div className="bg-green-50 px-6 py-3 rounded-xl border border-green-200">
              <p className="text-green-800 font-semibold">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
            </div>
          </div>
        </div>

        {/* PROGRESS TIMELINE */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Order Journey</h2>
          
          {/* Desktop Horizontal Progress */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Background Line */}
              <div className="absolute top-12 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
              {/* Progress Line */}
              <div 
                className="absolute top-12 left-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-lg"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {/* Steps */}
              <div className="relative flex justify-between">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  
                  return (
                    <div key={step.key} className="flex flex-col items-center" style={{ width: '25%' }}>
                      {/* Icon Circle */}
                      <div className={`relative z-10 w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                          : 'bg-gray-200 border-2 border-gray-300'
                      } ${isCurrent ? 'scale-110 ring-4 ring-purple-200 animate-pulse' : ''}`}>
                        <StepIcon className={`w-10 h-10 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      
                      {/* Label */}
                      <p className={`mt-4 text-center font-semibold text-sm px-2 ${
                        isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                      
                      {/* Status Indicator */}
                      {isCurrent && (
                        <div className="mt-2 flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <p className="text-xs text-green-700 font-semibold">In Progress</p>
                        </div>
                      )}
                      {isCompleted && !isCurrent && (
                        <div className="mt-2 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                          <p className="text-xs text-green-700 font-semibold">✓ Completed</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Vertical Progress */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.key} className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                      : 'bg-gray-200'
                  } ${isCurrent ? 'ring-4 ring-purple-200 animate-pulse' : ''}`}>
                    <StepIcon className={`w-8 h-8 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-sm text-green-600 font-medium">In Progress</p>
                    )}
                    {isCompleted && !isCurrent && (
                      <p className="text-sm text-green-600 font-medium">✓ Completed</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-all transform hover:scale-105 text-center"
          >
            Continue Shopping
          </Link>

          <Link
            to={`/order-confirmation/${order._id}`}
            className="flex-1 px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105 text-center"
          >
            View Order Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TrackOrder;
