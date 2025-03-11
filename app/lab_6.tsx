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
import { getUser, addUser, updateUser, deleteUser } from "../lib/supabase_crud";

// Structure of your user records.
interface User {
  id: number;
  name: string;
  description?: string;
}

export default function Lab6Screen() {
  // State for storing users and UI status.
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // States for the form used in insert/update operations.
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // When editing, store the record ID; if null, the form is in "insert" mode.
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch users from Supabase.
  const fetchData = async () => {
    try {
      setLoading(true);
      const data: User[] = await getUser();
      console.log("Fetched data:", data);
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

  // Handle the "Add" or "Update" submission.
  const handleAddOrUpdate = async () => {
    if (!name) {
      Alert.alert("Validation Error", "Please provide a name.");
      return;
    }

    if (editingId === null) {
      if (!id) {
        Alert.alert("Validation Error", "Please provide an ID.");
        return;
      }
      const idNumber = parseInt(id, 10);
      if (isNaN(idNumber)) {
        Alert.alert("Validation Error", "ID must be a valid number.");
        return;
      }
      try {
        // Insert new record using the provided ID, name, and description.
        const result = await addUser({ id: idNumber, name, description });
        if (result.error) {
          Alert.alert("Error", "Failed to add user: " + result.error.message);
        } else {
          Alert.alert("Success", "User added successfully!");
        }
      } catch (error) {
        console.error("Error in add:", error);
      }
    } else {
      // For updating existing record, typically we do not update the ID.
      try {
        const result = await updateUser(editingId, { name, description });
        if (result.error) {
          Alert.alert("Error", "Failed to update user: " + result.error.message);
        } else {
          Alert.alert("Success", "User updated successfully!");
        }
        // Reset editing mode.
        setEditingId(null);
      } catch (error) {
        console.error("Error in update:", error);
      }
    }
    // Reset form fields.
    setId("");
    setName("");
    setDescription("");
    fetchData();
  };

  // Pre-populate the form for editing.
  const handleEdit = (user: User) => {
    setEditingId(user.id);
    // Set the ID field (as a string) so that it displays in the TextInput.
    setId(user.id.toString());
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
          placeholder="ID"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
        />
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