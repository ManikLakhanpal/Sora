"use client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext.js";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Providers(props: Props) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        {props.children}
      </ThemeProvider>
    </AuthProvider>
  );
}