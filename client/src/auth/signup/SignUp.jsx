import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/inputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountryField";
import FooterLink from "@/components/forms/FooterLink";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import useAuth from "@/hooks/useAuth";

const SignUp = ({ onSwitch }) => {
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            country: "US",
            investmentGoals: "Growth",
            riskTolerance: "Medium",
            preferredIndustry: "Technology",
        },
        mode:'onBlur'

    });

  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      const response = await axiosInstance.post("/auth/sign-up", data);
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/");
    } catch (error) {
            console.error("Full signup error:", error.response || error);

      const message =
        error.response?.data?.message ||
        "Something went wrong during signup. Please try again.";
      console.error("Signup error:", message);
    }
  };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
            <InputField
                name="username"
                label="Username"
                placeholder="Username"
                register= {register}
                error = {errors.username}
                validation={{required: "full name is required", minLength:2}}
            />
            <InputField
                name="email"
                label="Email"
                placeholder="example@example.com"
                register= {register}
                error = {errors.email}
                validation={{required: "email is required", minLength:10}}
            />
            <InputField
                name="password"
                label="Password"
                placeholder="password"
                type="password"
                register= {register}
                error = {errors.password}
  validation={{
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{6,}$/,
      message:
        "Password must contain at least one uppercase letter, one number, and one special character (@ or #)",
    },
  }}            />

            <CountrySelectField
                name="country"
                label="Country"
                control={control}
                error={errors.country}
                required
            />

            <SelectField
                name="investmentGoals"
                label= "Investment Goals"
                placeholder="Select your investment goal"
                options = {INVESTMENT_GOALS}
                control = {control}
                error = {errors.investmentGoals}
            />
            <SelectField
                name="riskTolerance"
                label= "Risk Tolerance"
                placeholder="Select your risk level"
                options = {RISK_TOLERANCE_OPTIONS}
                control = {control}
                error = {errors.riskTolerance}
            />
            <SelectField
                name="preferredIndustry"
                label= "Preffered Industry"
                placeholder="Select your preferred industry"
                options = {PREFERRED_INDUSTRIES}
                control = {control}
                error = {errors.preferredIndustry}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full mt-5 submit-button" >
                {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
            </Button>

            <FooterLink
                text="Already have an Account?"
                linkText="SignIn"
                onSwitch={onSwitch}
            />

        </form>
    );
}

export default SignUp;  