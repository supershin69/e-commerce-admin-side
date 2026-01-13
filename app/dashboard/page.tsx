"use client";

import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getProfile } from "../lib/auth";

export default function Dashboard() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      if (profile) {
        setName(profile.name);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Typography variant="h4" color="green">Welcome, {name || "User"}!</Typography>
  )
}