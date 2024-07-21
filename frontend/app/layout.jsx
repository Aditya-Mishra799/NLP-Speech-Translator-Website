import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import React, { Children } from "react";

const HomeLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Box>
            <Nav />
            {children}
            <Footer />
          </Box>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default HomeLayout;
