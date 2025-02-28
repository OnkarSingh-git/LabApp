import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface APIData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const CallAPI: React.FC = () => {
  const [data, setData] = useState<APIData | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: APIData = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : data ? (
        <View style={styles.card}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.body}>{data.body}</Text>
          <Text style={styles.meta}>
            <Text style={styles.bold}>User ID:</Text> {data.userId} |{' '}
            <Text style={styles.bold}>Post ID:</Text> {data.id}
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  card: {
    marginVertical: 20,
    padding: 20,
    maxWidth: 600,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    marginBottom: 10,
  },
  meta: {
    fontSize: 14,
    color: '#777',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default CallAPI;