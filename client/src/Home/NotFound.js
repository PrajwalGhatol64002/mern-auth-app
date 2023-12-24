import React from "react";
import Lottie from "lottie-react";

import Page_404 from '../Assests/Lottie/Page_404.json'
export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center bg-[#b8dbdc] h-screen">
        <Lottie
          style={{ height: "80vh", maxwidth: "auto" }}
          animationData={Page_404}
        />
      </div>
    </>
  );
}