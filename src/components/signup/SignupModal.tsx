"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React from "react";
import SignupForm from "./SignupForm";

const MySwal = withReactContent(Swal);

export const showSignupModal = () => {
  MySwal.fire({
    title: "Sign Up",
    html: <SignupForm />, // Insert your LoginForm component
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      // Logic to handle login form submission
      // You can access form values here and perform your login logic
    },
    customClass: {
      container: "container-class", // You can add custom classes for styling
    },
  });
};
