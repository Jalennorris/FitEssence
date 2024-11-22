import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon from the library

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
}

const HomeScreen: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const router = useRouter();

  const selectGoal = (goal: 'weightLoss' | 'muscleGain') => {
    router.push({ pathname: '/workout', params: { goal } });
  };

  const startExercise = (exercise: Exercise) => {
    router.push({
      pathname: '/exercise',
      params: {
        exercises: JSON.stringify([exercise]),
        currentIndex: '0',
      },
    });
  };

  const handleSignOutPress = () => {
    router.push('/login');
  }

  const handleProfilePress = () => {
    setMenuOpen(!menuOpen); 
  };

  const exampleExercises: Exercise[] = [
    {
      name: 'Push Ups',
      sets: 3,
      reps: 12,
      description: 'Strengthen your chest, shoulders, and arms.',
    },
    {
      name: 'Squats',
      sets: 4,
      reps: 15,
      description: 'A lower body workout for legs and glutes.',
    },
    {
      name: 'Plank',
      sets: 3,
      reps: 30,
      description: 'Core stability exercise (30 seconds per set).',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Icon name="user-circle" size={40} color="#000" />
        </TouchableOpacity>
        {menuOpen && (
          <View style={styles.menu}>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => alert('Settings')}>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleSignOutPress}>
              <Text style={styles.menuText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.title}>Welcome to FitnessEssence</Text>
      <Text style={styles.subtitle}>Select Your Fitness Goal</Text>


      <View style={styles.buttonGroup}>
        <CustomButton
          title="Weight Loss"
          onPress={() => selectGoal('weightLoss')}
        />
        <CustomButton
          title="Muscle Gain"
          onPress={() => selectGoal('muscleGain')}
        />
      </View>

   
      <Text style={styles.subtitle}>Try These Exercises</Text>
      {exampleExercises.map((exercise, index) => (
        <View key={index} style={styles.exampleContainer}>
          <CustomButton
            title={`Start: ${exercise.name}`}
            onPress={() => startExercise(exercise)}
          />
          <Text style={styles.exampleDescription}>{exercise.description}</Text>
        </View>
      ))}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your fitness journey starts here! 💪
        </Text>
      </View>
    </ScrollView>
  );
};

const CustomButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <View style={styles.buttonWrapper}>
    <Button title={title} onPress={onPress} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  exampleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  exampleDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
  
  menu: {
    position: 'absolute',
    top: 50,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 2,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    cursor: 'pointer',
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
});

export default HomeScreen;

