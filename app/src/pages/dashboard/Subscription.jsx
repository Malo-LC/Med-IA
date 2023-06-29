import { useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      title: "Free",
      price: "0€",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      title: "Standard",
      price: "10€/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      title: "Premium",
      price: "30€/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
  ];

  const handlePlanSelection = (index) => {
    setSelectedPlan(index);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose a Plan</h2>
        <p className="mt-2 text-gray-600">Select the subscription plan that suits you best.</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`${
              selectedPlan === index ? "bg-blue-500 text-white" : "bg-white"
            } border border-gray-200 hover:border-gray-400 p-6 rounded-lg cursor-pointer transition-colors`}
            onClick={() => handlePlanSelection(index)}>
            <h3 className="text-lg font-semibold">{plan.title}</h3>
            <p className="mt-2 text-gray-600">{plan.price}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-1">
                  <BsCheck2Circle className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        {selectedPlan !== null ? (
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Subscribe to {plans[selectedPlan].title}</button>
        ) : (
          <p>Please select a plan.</p>
        )}
      </div>
    </div>
  );
};

export default Subscription;
