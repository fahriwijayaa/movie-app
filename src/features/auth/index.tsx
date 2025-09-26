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
    <Form {...form}>
      <form
        className="flex flex-col h-screen justify-center items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomFormField<LoginSchema>
          control={control}
          name="username"
          label="Username"
        >
          {(field) => <Input {...field} placeholder="Username" type="text" />}
        </CustomFormField>

        <CustomFormField<LoginSchema>
          control={control}
          name="password"
          label="Password"
        >
          {(field) => (
            <Input {...field} placeholder="Password" type="password" />
          )}
        </CustomFormField>

        <button className="bg-black text-white py-2 px-5 rounded-md cursor-pointer">
          Login
        </button>
      </form>
    </Form>
  );
};

export default Auth;
