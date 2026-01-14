import { createBrowserClient } from "@supabase/ssr";

// Initialize the client here to ensure it uses the Browser Client
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const login = async (email: string, password: string) => {
  try {
    // 1. Sign in (Supabase automatically sets the cookies here!)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: error.message };
    
    if (!data.user) return { error: "No user data returned" };

    // 2. Perform your Role Check
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", data.user.id)
      .single();

    if (profileError) {
      // Optional: Sign them out if they don't have a profile
      await supabase.auth.signOut();
      return { error: "Profile not found." };
    }

    const allowedRoles = ["admin", "superadmin", "staff"];
    if (!allowedRoles.includes(profileData.role)) {
      // IMPORTANT: Sign them out immediately if unauthorized
      await supabase.auth.signOut();
      return { error: "You don't have permission to access admin panel." };
    }

    // 3. Return success (Let the UI handle the redirect)
    return { success: true };

  } catch (err: unknown) {
    let message = "Login failed";
    if (err instanceof Error) message = err.message;
    else if (typeof err === "string") message = err;
    
    return { error: message };
  }
};

export const getProfile = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error getting user:", userError.message);
      return null;
    }
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error.message);
      return null;
    }

    return data;
  } catch (err: unknown) {
    console.error("Unexpected error in getProfile:", err);
    return null;
  }
};
