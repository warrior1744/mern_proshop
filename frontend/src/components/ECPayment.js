import React, { useState, useRef, useEffect } from "react";

const ECPayment = () => {
  const [ecpayState, setEcpayState] = useState(
    localStorage.getItem("ecpayState")
  );

  const contentRef = useRef();

  useEffect(() => {
    const fragment = document
      .createRange()
      .createContextualFragment(ecpayState);

    if (contentRef.current) {
      contentRef.current.appendChild(fragment);
    } else {
      return;
    }

    return () => {
      localStorage.removeItem("ecpayState")
    }
  });

  return <div ref={contentRef} />;
};

export default ECPayment;
