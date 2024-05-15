import { supabase } from '../../supabaseClient';


export const register = async (username: string, email: string, password: string) => {
    const { data: existingUsers, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email);

    if (fetchError) {
        console.error('Error fetching users:', fetchError);
        return false;
    }

    console.log(existingUsers)
    if (existingUsers && existingUsers.length > 0) {
        // Email already exists
        return false;
    }

    // Register new user
    const { error } = await supabase
        .from('users')
        .insert([{ username, email, password }]);

    if (error) {
        console.error('Error registering user:', error);
        return false;
    }

    return true;
};

export const login = async (email: string, password: string) => {
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

    if (error) {
        console.error('Error logging in:', error);
        return false;
    }

    return user;
};
