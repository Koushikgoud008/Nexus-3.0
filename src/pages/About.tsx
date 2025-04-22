
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold mb-4">About DealFinder</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Your trusted companion for finding the best deals across the web.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-8">
              At DealFinder, we're dedicated to simplifying the online shopping experience. Our mission 
              is to help consumers save time and money by providing a comprehensive comparison platform 
              that aggregates products from multiple e-commerce websites, presenting them in an easy-to-compare format.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">What We Do</h2>
            <p className="text-gray-700 mb-8">
              Our sophisticated search technology scans hundreds of online retailers in real-time to find 
              the best prices, deals, and offers. We analyze everything from price history and product ratings 
              to shipping costs and seller reliability, ensuring you have all the information needed to make 
              smart purchasing decisions.
            </p>
            
            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Transparency</h3>
                <p className="text-gray-700">
                  We provide clear, unbiased information about products and retailers, empowering you to make 
                  informed decisions.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">User-Centric</h3>
                <p className="text-gray-700">
                  Everything we do is designed with your needs in mind, making the shopping experience as 
                  seamless as possible.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                <p className="text-gray-700">
                  We continuously improve our technology to provide you with the most accurate and up-to-date 
                  product information.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Reliability</h3>
                <p className="text-gray-700">
                  We strive to be your trusted source for product comparisons and shopping recommendations.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">Our Team</h2>
            <p className="text-gray-700 mb-4">
              DealFinder was founded by a team of technology enthusiasts and savvy shoppers who were frustrated 
              with having to visit multiple websites to find the best deals. Today, we're a growing team of 
              developers, data scientists, and e-commerce experts dedicated to revolutionizing how people shop online.
            </p>
            <p className="text-gray-700">
              We're always looking for talented individuals who share our passion for technology and e-commerce. 
              If you're interested in joining our team, please check our careers page for current opportunities.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
