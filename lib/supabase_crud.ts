import supabase from './supabase';

const TABLE_NAME = 'sampledatabase';

export async function getUser() {
    const { data, error } = await supabase.from(TABLE_NAME).select('*');
    if (error) {
        throw error;
    }
    return data;
}

export async function addUser(newUser: { name: string; description?: string }) {
    const { data, error } = await supabase.from(TABLE_NAME).insert([newUser]);
    return { data, error };
  }

  export async function updateUser(
    id: number,
    updatedData: { name?: string; description?: string }
  ) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .update(updatedData)
      .eq("id", id);
    return { data, error };
  }
  
  export async function deleteUser(id: number) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq("id", id);
    return { data, error };
  }