"use client";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from "@/lib/Redux/Store";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import NavBar from "@/_components/NavBar/NavBar";
import theme from "@/theme";



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <title>Linked Posts</title>
      <body
        className={` antialiased bg-black`}
      >
        <Provider store={store}>
          <div className="z-10">
            <NavBar />
          </div>
          <div className="container mx-auto mt-20 ">
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                {children}
                <Toaster />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </div>
        </Provider>
      </body>
    </html>
  );
}
