import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Login: React.FC = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				// Store the token and user data
				localStorage.setItem("auth_token", data.token);
				localStorage.setItem("user_data", JSON.stringify(data.user));

				toast({
					title: "Login successful",
					description: data.message || "Welcome to ComplianceHub!",
				});

				navigate("/dashboard");
			} else {
				toast({
					title: "Login failed",
					description:
						data.error || "Invalid credentials. Please try again.",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("Login error:", error);
			toast({
				title: "Login failed",
				description:
					"Network error. Please check your connection and try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
				className="w-full max-w-md"
			>
				<Card className="shadow-elegant border-border/50">
					<CardHeader className="text-center pb-6">
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="flex justify-center mb-4"
						>
							<div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
								<Shield className="w-8 h-8 text-white" />
							</div>
						</motion.div>
						<CardTitle className="text-2xl font-bold text-foreground">
							Welcome Back
						</CardTitle>
						<CardDescription className="text-muted-foreground">
							Sign in to your ComplianceHub account
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form
							onSubmit={handleSubmit}
							className="space-y-4"
						>
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									name="username"
									type="text"
									placeholder="Enter your username"
									value={formData.username}
									onChange={handleInputChange}
									className="bg-background"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<div className="relative">
									<Input
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										value={formData.password}
										onChange={handleInputChange}
										className="bg-background pr-10"
										required
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="w-4 h-4 text-muted-foreground" />
										) : (
											<Eye className="w-4 h-4 text-muted-foreground" />
										)}
									</Button>
								</div>
							</div>

							<Button
								type="submit"
								variant="professional"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Signing in...
									</>
								) : (
									"Sign In"
								)}
							</Button>
						</form>

						<div className="mt-6 text-center">
							<p className="text-sm text-muted-foreground">
								Don't have an account?{" "}
								<Link
									to="/signup"
									className="text-primary hover:text-primary-hover font-medium transition-colors"
								>
									Sign up here
								</Link>
							</p>
						</div>

						{/* Demo credentials */}
						<div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border/50">
							<p className="text-xs text-muted-foreground text-center mb-2">
								Demo credentials:
							</p>
							<p className="text-xs text-center">
								Username: admin | Password: password
							</p>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
};

export default Login;
