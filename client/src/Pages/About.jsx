import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <Card className="md:max-w-4xl w-full mx-auto mt-10 md:p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <CardTitle className="flex justify-center items-center text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        About Project
      </CardTitle>

      <CardContent>
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
          <p>
            <span className="font-medium">Project Name:</span> MERN Stack Blog
            App
          </p>
          <p>
            <span className="font-medium">Developer:</span> Utsab Adhikari
          </p>
          <p>
  <span className="font-medium">Contact: </span>
  <a href="tel:+9779867508725" className="text-blue-600 hover:underline">+977 9867508725</a>
</p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:utsabadhikari075@gmail.com"
              className="text-blue-600 hover:underline"
            >
              utsabadhikari075@gmail.com
            </a>
          </p>
          <p>
            <span className="font-medium">Development Time:</span> 16+ hours
          </p>
          <p>
            <span className="font-medium">Error Handling:</span> 2+ hours
          </p>
          <p>
            <span className="font-medium">Experience:</span> Great! Became
            familiar with modular programming, error handling, debugging, and deployment processes.
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="md:mt-6 md:flex md:gap-4 flex-wrap m-2">
          <a
            href="https://wa.me/9867508725"
            target="_blank"
            className="flex md:justify-between justify-center md:gap-2 gap-1 items-center bg-green-600 text-white border hover:border hover:bg-white hover:text-green-600 px-4 py-2 rounded-md transition"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href="https://m.facebook.com/utsab.adhikari.43691/"
            target="_blank"
            className="flex md:justify-between justify-center md:gap-2 gap-1 items-center bg-blue-600 text-white border hover:border hover:bg-white hover:text-blue-800 px-4 py-2 rounded-md transition"
          >
            <FaFacebook /> Facebook
          </a>
          <a
            href="https://github.com/utsab-ad"
            target="_blank"
            className="flex md:justify-between justify-center md:gap-2 gap-1 items-center bg-gray-900 text-white border hover:border hover:bg-white hover:text-gray-900 px-4 py-2 rounded-md transition"
          >
            <FaGithub /> Github
          </a>
          <a
            href="https://github.com/utsab-ad"
            target="_blank"
            className="flex md:justify-between justify-center md:gap-2 gap-1 items-center bg-blue-600 text-white border hover:border hover:bg-white hover:text-blue-800 px-4 py-2 rounded-md transition"
          >
            <FaLinkedin /> Linkedin
          </a>
    
        </div>

        {/* Technologies Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Technologies Used
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "React", description: "Frontend library" },
              { name: "Node.js", description: "JS runtime for backend" },
              { name: "Express.js", description: "Backend web framework" },
              { name: "MongoDB Atlas", description: "Cloud-based NoSQL DB" },
              { name: "ShadCN UI", description: "Modern UI components" },
              { name: "Cloudinary", description: "Media storage & delivery" },
              {
                name: "CKEditor",
                description: "Rich text editor for post creation",
              },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {tech.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
