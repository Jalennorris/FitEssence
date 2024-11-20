import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
}

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const selectGoal = (goal: 'weightLoss' | 'muscleGain') => {
    // Navigate to the workout screen with goal
    router.push({ pathname: '/workout', params: { goal } });
  };

  const startExercise = (exercise: Exercise) => {
    // Navigate to the ExerciseScreen with exercise data
    router.push({
      pathname: '/exercise',
      params: {
        exercises: JSON.stringify([exercise]), // Passing the selected exercise as part of exercises list
        currentIndex: '0', // Start with the first exercise (index 0)
      },
    });
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
      <Text style={styles.title}>Welcome to Fitness Buddy</Text>
      <Text style={styles.subtitle}>Select Your Fitness Goal</Text>

      {/* Goal Selection */}
      <View style={styles.buttonGroup}>
        <CustomButton
          title="Weight Loss"
          onPress={() => selectGoal('weightLoss')}
          accessibilityLabel="Navigate to the Weight Loss workout routine"
        />
        <CustomButton
          title="Muscle Gain"
          onPress={() => selectGoal('muscleGain')}
          accessibilityLabel="Navigate to the Muscle Gain workout routine"
        />
      </View>

      {/* Example Exercises */}
      <Text style={styles.subtitle}>Try These Exercises</Text>
      {exampleExercises.map((exercise, index) => (
        <View key={index} style={styles.exampleContainer}>
          <CustomButton
            title={`Start: ${exercise.name}`}
            onPress={() => startExercise(exercise)}
            accessibilityLabel={`Start the ${exercise.name} exercise`}
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
  accessibilityLabel,
}: {
  title: string;
  onPress: () => void;
  accessibilityLabel?: string;
}) => (
  <View style={styles.buttonWrapper}>
    <Button title={title} onPress={onPress} accessibilityLabel={accessibilityLabel} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
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
});

export default HomeScreen;
