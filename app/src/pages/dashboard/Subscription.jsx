import { BsCheck2Circle } from "react-icons/bs";

const Subscription = () => {
  const plans = [
    {
      title: "Premium",
      price: "30€/month",
      features: ["Analyze Melanoma", "Analyze Pneumonia", "Patient Administration", "Unlimited Analysis", "Priority Support"],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your actual plan</h2>
      </div>
      <div className="mt-8 flex flex-col gap-5 items-center justify-center">
        {plans.map((plan, index) => (
          <div key={index} className={`border border-gray-200 hover:border-gray-400 p-6 rounded-lg cursor-pointer transition-colors`}>
            <h3 className="text-lg font-semibold">{plan.title}</h3>
            <p className="mt-2 text-gray-600">{plan.price}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <BsCheck2Circle className="text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>To change or cancel your plan, please navigate to our dedicated site</div>
      </div>
    </div>
  );
};

export default Subscription;
