import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BookOpen, Loader2, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/api/auth.service";
import { useAuthStore } from "@/store/auth.store";
import type { UserRole } from "@/types/auth.types";

export default function SignUp() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT" as UserRole,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: UserRole) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isLoading) return;

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { token } = await authService.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
      });

      // Save token to store (also persists to localStorage)
      setAuth(token);

      toast.success("Account created successfully!");

      // Redirect based on role
      if (formData.role === "INSTRUCTOR") {
        navigate("/instructor/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between bg-gradient-to-br from-background via-muted/30 to-background border-r border-border overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-foreground font-serif tracking-tight">
            Coursivo
          </span>
        </Link>

        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase shadow-[0_0_15px_rgba(var(--primary),0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Join the Community
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
            Start your learning <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              journey today
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-sm">
            Join thousands of learners and instructors building skills and
            sharing knowledge.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border mt-8">
            <div>
              <div className="text-3xl font-extrabold text-foreground">
                500+
              </div>
              <div className="text-muted-foreground text-xs font-semibold tracking-wider uppercase mt-1">
                Courses
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-foreground">
                10K+
              </div>
              <div className="text-muted-foreground text-xs font-semibold tracking-wider uppercase mt-1">
                Students
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-foreground">
                100+
              </div>
              <div className="text-muted-foreground text-xs font-semibold tracking-wider uppercase mt-1">
                Instructors
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground/60 text-sm font-medium relative z-10">
          © 2024 Coursivo. All rights reserved.
        </p>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-foreground font-serif">
                Coursivo
              </span>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight">
              Create an account
            </h2>
            <p className="text-muted-foreground">
              Choose how you want to use Coursivo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label>I want to</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("STUDENT")}
                  disabled={isLoading}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all disabled:opacity-50 ${
                    formData.role === "STUDENT"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <GraduationCap
                    className={`h-8 w-8 ${formData.role === "STUDENT" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`font-medium ${formData.role === "STUDENT" ? "text-primary" : "text-foreground"}`}
                  >
                    Learn
                  </span>
                  <span className="text-xs text-muted-foreground">
                    As a Student
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect("INSTRUCTOR")}
                  disabled={isLoading}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all disabled:opacity-50 ${
                    formData.role === "INSTRUCTOR"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Users
                    className={`h-8 w-8 ${formData.role === "INSTRUCTOR" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`font-medium ${formData.role === "INSTRUCTOR" ? "text-primary" : "text-foreground"}`}
                  >
                    Teach
                  </span>
                  <span className="text-xs text-muted-foreground">
                    As an Instructor
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                autoComplete="name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                required
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
