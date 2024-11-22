import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
}

const workoutRoutines = {
  weightLoss: [
    { name: 'Jumping Jacks', sets: 3, reps: 30, description: 'A full-body cardio exercise to burn calories.' },
    { name: 'Push-ups', sets: 3, reps: 15, description: 'Strengthen your upper body and core.' },
    { name: 'Burpees', sets: 3, reps: 10, description: 'A high-intensity full-body workout to boost metabolism.' },
    { name: 'Mountain Climbers', sets: 3, reps: 30, description: 'Cardio exercise that targets your core and legs.' },
    { name: 'High Knees', sets: 3, reps: 40, description: 'Boosts heart rate and works your legs and core.' },
    { name: 'Lunges', sets: 3, reps: 12, description: 'A lower body exercise that improves balance and endurance.' },
    { name: 'Skater Jumps', sets: 3, reps: 20, description: 'A dynamic movement that targets the legs and glutes.' },
    { name: 'Plank', sets: 3, reps: 30, description: 'Core stability exercise (hold for 30 seconds per set).' },
    { name: 'Box Jumps', sets: 3, reps: 12, description: 'Explosive lower body movement to improve strength and agility.' },
    { name: 'Bicycle Crunches', sets: 3, reps: 20, description: 'Core exercise targeting the abs and obliques.' },
  ],
  muscleGain: [
    { name: 'Squats', sets: 4, reps: 12, description: 'Strengthens your lower body, including quads, hamstrings, and glutes.' },
    { name: 'Bench Press', sets: 4, reps: 8, description: 'Targets the chest, shoulders, and triceps.' },
    { name: 'Deadlifts', sets: 4, reps: 10, description: 'Works on your back, hamstrings, and glutes.' },
    { name: 'Pull-ups', sets: 3, reps: 8, description: 'A bodyweight exercise that targets your back and biceps.' },
    { name: 'Overhead Press', sets: 4, reps: 8, description: 'Works the shoulders, upper chest, and triceps.' },
  ],
};

const WorkoutScreen: React.FC = () => {
  const router = useRouter();
  const { goal } = useLocalSearchParams() as { goal: 'weightLoss' | 'muscleGain' };
  const workout = workoutRoutines[goal];

  const [randomWorkouts, setRandomWorkouts] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  
  const generateRandomWorkouts = () => {
    if(!workout){
      Alert.alert('Error','Invalid goal slected')
      return;
    }
    
    const selectedWorkouts: Exercise[] = [];
    const workoutLength = workout.length;

    
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * workoutLength);
      selectedWorkouts.push(workout[randomIndex]);
    }

    setRandomWorkouts(selectedWorkouts); 
  };

  const handleStartExercise = () => {
    if(!randomWorkouts){
      Alert.alert('No Work', 'please generate workout')
    }
    router.push({
      pathname: '/exercise',
      params: {
        exercises: JSON.stringify(randomWorkouts), // Pass random workouts
        currentIndex: currentIndex.toString(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {goal === 'weightLoss' ? 'Weight Loss Routine' : 'Muscle Gain Routine'}
      </Text>

      {/* Button to generate random workouts */}
      <View style={styles.buttonContainer}>
        <Button title="Generate 5 Random Workouts" onPress={generateRandomWorkouts} />
      </View>

      <View style={styles.exerciseContainer}>
        {randomWorkouts.length > 0 ? (
          randomWorkouts.map((exercise, index) => (
            <View key={index} style={styles.exerciseItem}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetails}>
                {exercise.sets} sets of {exercise.reps} reps
              </Text>
              <Text style={styles.exerciseDescription}>{exercise.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noWorkouts}>No workouts generated yet. Press the button above.</Text>
        )}
      </View>

      {/* Start Exercise Button */}
      <View style={styles.buttonContainer}>
        <Button title="Start Workout" onPress={handleStartExercise} disabled={randomWorkouts.length === 0} />
      </View>

      <View style={styles.footer}>
        <Button title="Back to Home" onPress={() => router.push('/')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  exerciseContainer: {
    marginBottom: 30,
  },
  exerciseItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  noWorkouts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default WorkoutScreen;
