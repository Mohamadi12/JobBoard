import React from "react";

const Hero = () => {
  return (
    <section className="container my-16">
      <div className="text-4xl font-bold text-center">
        Find your next <br /> dream job
      </div>
      {/* <p className="text-center text-gray-600 mt-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
        temporibus architecto pariatur porro sapiente quidem expedita, deleniti
        dicta perspiciatis obcaecati.
      </p> */}
      <form className="flex gap-2 mt-4 max-w-md mx-auto">
        <input
          type="search"
          className="border w-full py-2 px-3 rounded-md border-gray-400"
          placeholder="Search phrase..."
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Search
        </button>
      </form>
    </section>
  );
};

export default Hero;
