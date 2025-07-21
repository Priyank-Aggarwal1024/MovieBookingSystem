import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How to cancel?",
      answer:
        'You can cancel your booking up to 4 hours before showtime for a full refund. Go to "My Bookings" and select the booking you wish to cancel.',
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept UPI, Credit/Debit Cards, Net Banking, and most wallets like Paytm, PhonePe, Google Pay.",
    },
    {
      question: "Where to download ticket?",
      answer:
        'After a successful payment, go to "My Bookings" and tap the download icon next to your booking.',
    },
  ];

  const toggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full max-w-2xl mr-auto bg-white rounded-xl p-6 shadow-md">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 py-4">
          <button
            className="w-full flex justify-between items-center text-left cursor-pointer"
            onClick={() => toggle(index)}
          >
            <h3 className="text-lg font-medium text-black font-['Poppins']">
              {faq.question}
            </h3>
            <span className="text-xl text-black">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          {openIndex === index && (
            <div className="mt-3 bg-[#f7fafd] p-4 rounded-xl text-base text-black opacity-80 leading-relaxed font-normal font-['Poppins']">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
