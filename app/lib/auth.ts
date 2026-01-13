import { supabase } from "./supabaseClient";

export interface LoginResult {
    userId?: string,
    error?: string,
}

export const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return { error: error.message};
        }
        if (!data.user) {
            return { error: "No user data returned" };
        }

        // Role Check
        const { data: profileData, error: profileError} = await supabase
            .from("profiles")
            .select("role")
            .eq("user_id", data.user.id)
            .single();

        if (profileError) {
            return { error: profileError.message };
        }

        if (profileData.role !== "admin" && profileData.role !== "superadmin" && profileData.role !== "staff") {
            return { error: "You don't have permission to access admin panel." };
        }

        return { userId: data.user.id };

    } catch (err: unknown) {
        let message: string;

        if (err instanceof Error) {
        message = err.message;
        } else if (typeof err === "string") {
        message = err;
        } else {
        message = "Login failed";
        }

        return { error: message };
    }
}

export const getProfile= async () => {
    const user = supabase.auth.getUser();
    if (!user) {
        return null;
    }

    const { data, error } = await supabase
                                    .from("profiles")
                                    .select("name")
                                    .eq("user_id", (await user).data.user?.id)
                                    .single();
    if (error) {    
        console.error("Error fetching profile:", error.message);
        return null;
    }

    return data;
}