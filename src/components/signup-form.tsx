"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignup } from "@/hooks/useAuth";
import { useUsersStore } from "@/store/usersStore";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const baseSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First Name must be at least 3 characters")
      .max(20, "First Name must not exceed 20 characters"),
    lastName: z
      .string()
      .min(3, "Last Name must be at least 3 characters")
      .max(30, "Last Name must not exceed 30 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must not exceed 30 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must not exceed 30 characters"),
    userType: z.string().optional(),
    master: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpData = z.infer<typeof baseSchema>;

interface SignupFormProps extends React.ComponentProps<"div"> {
  account: string;
  onSignupSuccess?: () => void;
}

export function SignupForm({ account, onSignupSuccess }: SignupFormProps) {
  const router = useRouter();
  const getUserType = useAuthStore((s) => s.getUserType);
  const user = useAuthStore((s)=> s.user);
  const setVerifyEmail = useAuthStore((s)=> s.setVerifyEmail);
  const setIsLogin = useAuthStore((l)=> l.setIsLogin);
  const [showPassword, setShowPassword] = useState(false);

  const getMasterUsers = useUsersStore((s) => s.getMasterUsers);
  const masterUsers = (() => {
    if (getUserType() === "admin") {
      return getMasterUsers().map((u: any) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
      }));
    }

    if (getUserType() === "master" && user) {
      return [
        {
          id: user.id,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        },
      ];
    }

    return [];
  })();
  
  const isAgentWithMaster = getUserType() !== "agent" && account === "agent";
  const schema = isAgentWithMaster
    ? baseSchema.safeExtend({
        master: z
          .string()
          .optional()
          .refine((val) => val && val.length > 0, {
            message: "Master selection is required for agent",
          }),
      })
    : baseSchema;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<SignUpData>({
    resolver: zodResolver(schema),
  });

  const { trigger, isMutating } = useSignup();

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    try {
      const responseData = await trigger({ ...data, userType: account });
      if (responseData?.code) {
        toast.info(responseData.message || "Registration failed");
        return;
      }

      setVerifyEmail(data.email);
      setIsLogin(false)
      toast.success(responseData.message || "Registration successful");
      router.push("/verify-otp");
      setTimeout(() => {
      onSignupSuccess && onSignupSuccess();
    }, 100); 
    } catch (error) {
      toast.error("Registration failed", {
        description: (error as Error).message,
      });
      console.error("Error during registration:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            placeholder="Enter your first name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            placeholder="Enter your last name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {isAgentWithMaster && (
          <div className="flex flex-col space-y-2">
            <Label htmlFor="master">Master</Label>
            <Select
              onValueChange={(value) =>
                setValue("master", value, { shouldValidate: true })
              }
            >
              <SelectTrigger id="master" className="w-full">
                <SelectValue placeholder="Select a master user" />
              </SelectTrigger>
              <SelectContent>
                {masterUsers.map((user: any) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.master && (
              <p className="text-sm text-red-600">
                {errors.master.message as string}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
          <Input id="password" type={showPassword ? "text" : "password"} {...register("password")} />
              {/* <Input
                id="analytics-password"
                type={showAnalyticsPassword ? "text" : "password"}
                value={analyticsPassword}
                onChange={(e) => setAnalyticsPassword(e.target.value)}
                placeholder="Enter new password"
                required
              /> */}
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isSubmitting || isMutating || isLoading}
        >
          {isSubmitting || isMutating || isLoading
            ? `Creating ${account}...`
            : `Create ${account}`}
        </Button>

        {account === "admin" && (
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </form>
  );
}
