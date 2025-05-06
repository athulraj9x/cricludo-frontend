import React from "react";
import Playground from "../assets/playground.png";
import Mobile from "../assets/figmamobile.png";
import { Link } from "react-router-dom";
import Navigation from "../Components/Navigation";

const Home = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-start h-[100dvh] bg-center bg-no-repeat bg-cover lg:pt-20 pt-54"
      style={{ backgroundImage: `url(${Playground})` }}
    >
      {/* Centered content */}
      <div className="flex items-center justify-center flex-col  mb-6">
        <h1 className="text-amber-300 lg:text-8xl text-6xl mb-4">Cric-Ludo</h1>
        <p className="text-white text-2xl">Roll, Bat, Win!</p>
      </div>
      <div className="">
        <img src={Mobile} alt="logo" className="h-[24rem] w-[rem] lg:h-[32rem] lg:w-[32rem]" />
      </div>

      {/* Bottom content */}
      <Navigation/>
     
    </div>
  );
};

export default Home;
