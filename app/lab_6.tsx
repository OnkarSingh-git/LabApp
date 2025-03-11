// app/lab_6.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../lib/supabase_crud";

// Define the structure of your user records.
interface User {
  id: number;
  name: string;
  description?: string;
}

export default function Lab6Screen() {
  // State for storing users and UI status
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  // States for the form used in insert/update operations.
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // When editing, store the record ID; if null, the form is in "insert" mode.
  const [editingId, setEditingId] = useState<number | null>(null);

  // Function to fetch users from Supabase
  const fetchData = async () => {
    try {
      setLoading(true);
      const data: User[] = await getUser();
      console.log("Fetched data:", data); // Debug: check output in console
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Failed to fetch users from Supabase.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle the "Add" or "Update" form submission
  const handleAddOrUpdate = async () => {
    if (!name) {
      Alert.alert("Validation Error", "Please provide a name.");
      return;
    }

    try {
      if (editingId === null) {
        // Insert new record
        const result = await addUser({ name, description });
        if (result.error) {
          Alert.alert("Error", "Failed to add user: " + result.error.message);
        } else {
          Alert.alert("Success", "User added successfully!");
        }
      } else {
        // Update existing record
        const result = await updateUser(editingId, { name, description });
        if (result.error) {
          Alert.alert("Error", "Failed to update user: " + result.error.message);
        } else {
          Alert.alert("Success", "User updated successfully!");
        }
        // Reset editing state after update.
        setEditingId(null);
      }
      // Reset form fields
      setName("");
      setDescription("");
      fetchData();
    } catch (error) {
      console.error("Error in add/update:", error);
    }
  };

  // Pre-populate the form with the selected user’s data for editing.
  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setName(user.name);
    setDescription(user.description || "");
  };

  // Delete a user record.
  const handleDelete = async (id: number) => {
    try {
      const result = await deleteUser(id);
      if (result.error) {
        Alert.alert("Error", "Failed to delete user: " + result.error.message);
      } else {
        Alert.alert("Success", "User deleted successfully!");
        fetchData();
      }
    } catch (error) {
      console.error("Error in delete:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users List</Text>

      {/* Form for inserting/updating user data */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button
          title={editingId === null ? "Add User" : "Update User"}
          onPress={handleAddOrUpdate}
        />
      </View>

      {/* Display the list of users */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>ID: {item.id}</Text>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            {item.description && (
              <Text style={styles.itemText}>
                Description: {item.description}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button
                title="Delete"
                onPress={() => handleDelete(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemContainer: {
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  itemText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});