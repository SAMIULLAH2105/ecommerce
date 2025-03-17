import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import img3 from "@/assets/img3.png";
import img2 from "@/assets/img2.png";

function AuthLayout() {
  const location = useLocation();
  const isRegisterPage = location.pathname.includes("register");

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden">
      {/* Animated Background Div */}
      <motion.div
        initial={{ x: isRegisterPage ? "100%" : "0%" }}
        animate={{ x: isRegisterPage ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={`absolute lg:relative lg:flex items-center justify-center w-1/2 px-12 shadow-lg ${
          isRegisterPage
            ? "bg-gradient-to-r from-blue-600 to-purple-600"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        } text-primary-foreground ${
          isRegisterPage
            ? "rounded-r-[30px] rounded-l-none"
            : "rounded-l-[30px]"
        }`}
      >
        <div className="max-w-md space-y-6 text-center text-white flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {isRegisterPage ? "Join VibeCart" : "Welcome to VibeCart"}
          </h1>
          <h3 className="text-2xl font-bold tracking-tight text-gray-200">
            {isRegisterPage
              ? "Start your journey today!"
              : "Feel the Vibe, Love the Cart."}
          </h3>
        

        <div>
          <img
            src={isRegisterPage ? img2 : img3}
            alt="Auth Image"
            className="w-full h-auto"
          />
        </div>
        </div>

        
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ x: isRegisterPage ? "-100%" : "0%" }}
        animate={{ x: isRegisterPage ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}

export default AuthLayout;
