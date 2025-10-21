import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const SignIn = ({ onSwitch }) => {
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({
        defaultValues: {
            email:"",
            password: "",
        },
        mode: "onBlur",
    });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/sign-in", data);
      const { token, user } = response.data.data;
      setUser(user);
      localStorage.setItem("token", token);

      navigate("/");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong during signin. Please try again.";
      console.error("Signin error:", message);
    }
  };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-5" >
            <InputField
                name="email"
                label="Email"
                placeholder="example@example.com"
                register={register}
                error={errors.email}
                validation={{required: "Email is required", pattern: /^\w+@\w+\.\w+$/ }}
            />
            <InputField
                name="password"
                label="Password"
                placeholder="Enter your password"
                register={register}
                error={errors.password}
                validation={{required: "password is required", minLength: 6 }}
            />
            <Button type="submit" className="w-full mt-5" disabled={isSubmitting} >
                {isSubmitting? "Singing In": "Sign In"}
            </Button>
            
            <FooterLink
                text="Don't have an account?"
                linkText="Sign Up"
                onSwitch={onSwitch}
            />
        </form>
    );
}

export default SignIn;