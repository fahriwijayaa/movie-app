import { useForm } from "react-hook-form";
import { CustomFormField, Form } from "../../components/form";
import { loginSchema, type LoginSchema } from "../../services/auth/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/input";
import { postAuth } from "../../services/auth/api";
import { useToken } from "../../hooks/useToken";

const Auth = () => {
  const { changeUser } = useToken();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await postAuth(data);

      if (response) {
        const user = {
          accessToken: response?.accessToken,
          refreshToken: response?.refreshToken,
          username: response?.username,
          email: response?.email,
          image: response?.image,
        };
        changeUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Form {...form}>
        <form
          className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-700 animate-fade-in"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm text-gray-400 mt-1">
              Please login to continue
            </p>
          </div>

          {/* Username */}
          <CustomFormField<LoginSchema>
            control={control}
            name="username"
            label="Username"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Enter your username"
                type="text"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            )}
          </CustomFormField>

          {/* Password */}
          <CustomFormField<LoginSchema>
            control={control}
            name="password"
            label="Password"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Enter your password"
                type="password"
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            )}
          </CustomFormField>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-indigo-700/30"
          >
            Login
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-400 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Auth;
