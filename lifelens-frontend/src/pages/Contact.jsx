import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";

export default function Contact() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.sendForm(
        "service_0rdpjxg",
        "template_ontvo9h",
        formRef.current,
        "ZyBlIsQOmZQ92RYyC"
      );

      setSent(true);
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" 
         style={{ backgroundColor: '#f5f5f0', backgroundImage: 'radial-gradient(#e0e0d8 1px, transparent 0)', backgroundSize: '20px 20px' }}>
      <Navbar/>
      <div className="py-16">
        <div className="w-full max-w-2xl p-10 bg-white rounded-2xl shadow-2xl border-t-4 border-t-[#6c8f79] transition duration-500 hover:shadow-3xl">
          
          <h1 className="text-3xl font-serif font-bold mb-1 text-[#4b5b52] tracking-wider">
            LifeLens
          </h1>
          <p className="text-lg font-light text-gray-600 mb-6 border-b-2 border-b-gray-100 pb-3">
            Get Clarity. Reach Out.
          </p>
          
          <form ref={formRef} onSubmit={sendEmail} className="space-y-5">

            <div className="flex space-x-4">
              <input
                id="user_name"
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
                className="w-1/2 p-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#6c8f79] focus:ring-1 focus:ring-[#6c8f79] transition duration-200 shadow-sm"
              />
              <input
                id="user_email"
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
                className="w-1/2 p-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#6c8f79] focus:ring-1 focus:ring-[#6c8f79] transition duration-200 shadow-sm"
              />
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                className="w-full p-3 border-2 border-gray-200 rounded-xl resize-none bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#6c8f79] focus:ring-1 focus:ring-[#6c8f79] transition duration-200 shadow-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 mt-4 rounded-xl font-extrabold text-white text-lg bg-[#6c8f79] hover:bg-[#4b5b52] transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              style={{ boxShadow: '0 8px 15px -5px rgba(108, 143, 121, 0.7)' }}
            >
              {sending ? "Focusing..." : sent ? "Message Sent ✓" : "Send Message"}
            </button>

            {sent && (
              <p className="text-center text-sm font-medium text-green-700 pt-3">
                Your message is now in focus. We will reply shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}