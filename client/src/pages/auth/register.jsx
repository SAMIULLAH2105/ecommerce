// import CommonForm from "@/components/common/form";
// import { registerFormControls } from "@/config";
// import { useToast } from "@/hooks/use-toast";
// import { registerUser } from "@/store/auth-slice";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const initialState = {
//   userName: "",
//   email: "",
//   password: "",
// };

// const AuthRegister = () => {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const onSubmit = (event) => {
//     event.preventDefault(); // Prevents the default form submission behavior
//     console.log("onSubmit triggered");

//     dispatch(registerUser(formData))
//       .then((data) => {
//         console.log("Data: ", data);
//         //navigate("/auth/login"); added bcz non sometimes was creating issue with below data was being saved but no navigation
//         if (data?.payload?.success) {
//           toast({
//             title: data?.payload?.message,
//           });
//           navigate("/auth/login");
//         } else {
//           console.log("error");

//           toast({
//             title: data?.payload?.message,
//             variant: "destructive",
//           });
//           // navigate("/auth/login");
//         }
//       })

//       .catch((error) => {
//         console.error("Error during registration:", error);
//       });
//   };

//   return (
//     <div className="mx-auto w-full max-w-md space-y-6">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">
//           Create new account
//         </h1>
//         <p className="mt-2">
//           Already have an account
//           <Link
//             className="font-medium text-primary hover:underline "
//             to="/auth/login"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={registerFormControls}
//         buttonText={"Sign Up"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   );
// };

// export default AuthRegister;
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOAuthLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast({ title: data?.payload?.message });
          navigate("/auth/login");
        } else {
          toast({ title: data?.payload?.message, variant: "destructive" });
        }
      })
      .catch((error) => console.error("Error during registration:", error));
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
