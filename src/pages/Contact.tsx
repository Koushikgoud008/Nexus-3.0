
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Map, Mail, Phone } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Have a question or feedback? We're here to help!
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="text-gray-700 mb-8">
                  We'd love to hear from you! Whether you have a question about our service, 
                  need help with finding a specific product, or want to provide feedback, 
                  our team is ready to assist you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Map className="text-blue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Our Address</h3>
                      <address className="text-gray-700 not-italic">
                        123 Deal Street<br />
                        Tech Valley, CA 94103<br />
                        United States
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-blue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <a href="mailto:info@dealfinder.com" className="text-blue-600 hover:text-blue-800">
                        info@dealfinder.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-blue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <a href="tel:+15551234567" className="text-blue-600 hover:text-blue-800">
                        +1 (555) 123-4567
                      </a>
                      <p className="text-gray-600 text-sm">
                        Monday-Friday, 9am-5pm PT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
