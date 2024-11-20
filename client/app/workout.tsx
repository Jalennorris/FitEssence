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
    { name: 'Jumping Jacks', sets: 3, reps: 30, description: 'A full-body cardio exercise.' },
    { name: 'Push-ups', sets: 3, reps: 15, description: 'Strengthen your upper body.' },
    { name: 'Burpees', sets: 3, reps: 10, description: 'A high-intensity full-body workout.' },
  ],
  muscleGain: [
    { name: 'Squats', sets: 4, reps: 12, description: 'Strengthens lower body.' },
    { name: 'Bench Press', sets: 4, reps: 8, description: 'Targets the chest.' },
    { name: 'Deadlifts', sets: 4, reps: 10, description: 'Works on your back and hamstrings.' },
  ],
};

const WorkoutScreen: React.FC = () => {
  const router = useRouter();
  const { goal } = useLocalSearchParams() as { goal: 'weightLoss' | 'muscleGain' };

  const workout = workoutRoutines[goal];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentExercise = workout[currentIndex];

  // Navigate to the ExerciseScreen with exercise list and current index
  const handleStartExercise = () => {
    router.push({
      pathname: '/exercise', 
      params: {
        exercises: JSON.stringify(workout),
        currentIndex: currentIndex.toString(),
      },
    });
  };

  const handleNextExercise = () => {
    if (currentIndex < workout.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert('Workout Complete!', 'You have finished all the exercises in this routine.');
      router.push('/'); // Navigate back to home or a summary page
    }
  };

  const handlePreviousExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {goal === 'weightLoss' ? 'Weight Loss Routine' : 'Muscle Gain Routine'}
      </Text>
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{currentExercise.name}</Text>
        <Text style={styles.exerciseDetails}>
          {currentExercise.sets} sets of {currentExercise.reps} reps
        </Text>
        <Text style={styles.exerciseDescription}>{currentExercise.description}</Text>
      </View>

      {/* Start Exercise Button */}
      <View style={styles.buttonContainer}>
        <Button title="Start Exercise" onPress={handleStartExercise} />
      </View>

      <View style={styles.setNavigation}>
        <Button title="Previous Exercise" onPress={handlePreviousExercise} disabled={currentIndex === 0} />
        <Button title="Next Exercise" onPress={handleNextExercise} />
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
  setNavigation: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default WorkoutScreen;

