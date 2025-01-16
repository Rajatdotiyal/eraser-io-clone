
import { ArrowRight } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-screen-xl px-4 py-32  h-screen lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl text-sky-400 font-extrabold sm:text-5xl">
          AI co-pilot
            <strong className="font-extrabold text-white sm:block">
              {" "}
              for technical design
            </strong>
          </h1>

          <p className="mt-4 sm:text-sm/relaxed text-slate-200">
          Deliver accurate, consistent designs faster
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className=" flex justify-between items-center  w-full rounded bg-white  px-12 py-3  font-medium shadow hover:bg-gray-400 focus:outline-none focus:ring active:bg-gray-400 sm:w-auto"
              href="#"
            >
              <p className="text-black text-sm">
              Learn More
              </p> <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
