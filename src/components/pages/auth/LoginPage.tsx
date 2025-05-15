import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import services from '@/services';
import { setAuthenticate } from '@/store/reducer/AuthReducer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { get } from 'lodash';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mutations
  const handleLogin = useMutation({
    mutationFn: (data: z.infer<typeof FormSchema>) => {
      return services.auth.handleLogin(data);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleLogin.mutate(data, {
      onError: error => {
        // An error happened!
        const message = get(error, 'data.message', 'Something went wrong');
        toast.success(`Login failed: ${message}`);
      },
      onSuccess: res => {
        const data = { ...get(res, 'data', {}), isAuthenticated: true };
        dispatch(setAuthenticate(data));
        toast.success('Login successful');
        navigate('/');
      },
    });
  }

  return (
    <>
      <div className="font-bold">Login Page</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default LoginPage;
