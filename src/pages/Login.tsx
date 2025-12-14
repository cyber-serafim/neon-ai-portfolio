import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(username, password);
    setIsLoading(false);

    if (success) {
      navigate("/admin");
    } else {
      setError("Невірний логін або пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background cyber-grid">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glass-card p-8 rounded-2xl neon-border-cyan">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-neon-cyan/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-neon-cyan" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Адмін панель
            </h1>
            <p className="font-body text-muted-foreground">
              Введіть дані для входу
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 mb-6 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive">
              <AlertCircle className="w-4 h-4" />
              <span className="font-body text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-body text-sm text-muted-foreground uppercase tracking-wider block mb-2">
                Логін
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10 bg-muted border-border/50 focus:border-neon-cyan focus:ring-neon-cyan/20 font-body"
                  placeholder="Введіть логін"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground uppercase tracking-wider block mb-2">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-muted border-border/50 focus:border-neon-cyan focus:ring-neon-cyan/20 font-body"
                  placeholder="Введіть пароль"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="neonFilled"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Вхід...
                </span>
              ) : (
                "Увійти"
              )}
            </Button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="font-body text-sm text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              ← Повернутися на сайт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
