import "@/styles/globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Component {...pageProps} />
          <SpeedInsights />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
