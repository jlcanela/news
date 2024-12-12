/* @refresh reload */

import Home from "./pages/Home";
import { Route, RouteDefinition, Router } from "@solidjs/router";

import { Box } from "@suid/material";
import { Header } from "./components/Header";


//import BusinessEditor from "./pages/BusinessEditor";
// theme.ts
import { createTheme } from "@suid/material/styles";

// First, extend the Breakpoint type
declare module "@suid/material/styles" {
  interface BreakpointOverrides {
    xxl: true; // adds the xxl breakpoint
  }
}

// Create the custom theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920, // add your custom breakpoint value
    },
  },
});

// App.tsx
import { ThemeProvider } from "@suid/material/styles";
import News from "./pages/News";
import Mailing from "./pages/Mailing";
import MailingRemote from "./pages/MailingRemote";
import { JSX } from "solid-js";
//import MailingRemote from "./pages/MailingRemote";


function Layout(props: any) {
  return (
    <>
      <Header />
      <Box
        sx={{
          maxWidth: "80%", // Set maximum width
          margin: "30px auto", // Center the box
        }}
      >
        {props.children}
      </Box>
    </>
  );
}

export default function App() {
  const base = import.meta.env.MODE === 'production' 
  ? '/news' 
  : '';

  return (
    <ThemeProvider theme={theme}>
        <Router root={Layout} base={base}>
          <Route path="/" component={Home} />   
          <Route path="/news" component={News} />    
          <Route path="/mailing" component={Mailing} />
          <Route path="/mailing-remote" component={MailingRemote} />
        </Router>
    </ThemeProvider>
  );
}
