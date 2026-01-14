"use client";
import { login } from "@/app/lib/auth";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  Card,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLoginClick = async () => {
       setLoading(true);
        setError("");

        // Call your helper function
        const result = await login(email, password);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            // Success! 
            // 1. Refresh router to update Server Components with new cookies
            router.refresh();
            // 2. Redirect
            router.push("/dashboard");
        }
    };
    

     
  return (
    <Card
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/blue_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          width: 400,
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.15)",
          borderRadius: 4,
          border: "2px solid #6DC6FE",
        }}
      >
        <CardContent sx={{ width: "90%" }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#ffffff", marginBottom: 4 }}
          >
            Admin Login
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="standard"
              InputLabelProps={{
                style: { color: "#ffffff", transform: "translate(0, -12px)" },
                shrink: true // label color
              }}
              InputProps={{
                style: { color: "#ffffff" }, // input text color
              }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#6DC6FE", // normal
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "#6DC6FE", // hover
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#6DC6FE", // focused
                },
                //marginBottom: 1,
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="standard"
              InputLabelProps={{
                style: { color: "#ffffff", transform: "translate(0, -12px)"},
                shrink: true
              }}
              InputProps={{
                style: { color: "#ffffff" },
              }}
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#6DC6FE",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "#6DC6FE",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#6DC6FE",
                },
              }}
            />

              {error && (
              <Typography sx={{ color: "red", fontSize: 14 }}>{error}</Typography>
            )}

            <Button
              sx={{ height: 45, borderRadius: 4, marginTop: 2 }}
              variant="contained"
              onClick={handleLoginClick}
              disabled={loading}
              fullWidth
              startIcon={<LoginIcon />}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
