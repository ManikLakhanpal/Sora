"use client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

export default function Providers(props: Props) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        {props.children}
      </ThemeProvider>
    </SessionProvider>
  );
}