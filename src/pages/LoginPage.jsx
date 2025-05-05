import React from "react";
import Login from "../components/Login/Login";
import AnimatedFadeIn from "../components/AnimatedFadeIn";

function LoginPage() {
  return (
    <AnimatedFadeIn delay={0.2}>
      <Login />
    </AnimatedFadeIn>
  );
}

export default LoginPage;
