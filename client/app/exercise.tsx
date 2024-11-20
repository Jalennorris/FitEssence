import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, Vibration, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
}

// Safe JSON parsing function with fallback
const safeParseExercises = (data: string): Exercise[] => {
  try {
    // Check if data is undefined or empty
    if (!data) {
      console.error('No exercises data provided');
      return [];
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.every(isExercise)) {
      return parsed;
    } else {
      console.error('Invalid exercise data structure');
      return [];
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};

// Type guard to ensure the object is an Exercise
const isExercise = (obj: any): obj is Exercise => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.sets === 'number' &&
    typeof obj.reps === 'number' &&
    typeof obj.description === 'string'
  );
};

const ExerciseScreen: React.FC = () => {
  const { exercises, currentIndex } = useLocalSearchParams() as {
    exercises: string; // JSON string of the full exercise list
    currentIndex: string; // Current exercise index as a string
  };

  const router = useRouter();

  // Safely parse exercises data
  const exerciseList: Exercise[] = safeParseExercises(exercises);

  if (exerciseList.length === 0) {
    return <Text>Error loading exercises. Please try again later.</Text>;
  }

  const index = Number(currentIndex);
  const { name, sets, reps, description } = exerciseList[index];

  const [time, setTime] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if (interval) clearInterval(interval);

      // Notify when timer ends
      Vibration.vibrate(1000);
      Alert.alert('Time is up!', `You've completed set ${currentSet}.`, [
        { text: 'Next Set', onPress: handleNextSet },
        { text: 'Reset Timer', onPress: handleReset },
      ]);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(30);
  };

  const handleNextSet = () => {
    if (currentSet < Number(sets)) {
      setCurrentSet(currentSet + 1);
      setTime(30);
      setIsActive(false);
    } else {
      Alert.alert('All sets complete!', 'Moving to the next exercise.');
      handleNextExercise();
    }
  };

  const handleSkipSet = () => {
    if (currentSet < Number(sets)) {
      setCurrentSet(currentSet + 1);
      setTime(30);
    } else {
      Alert.alert('Workout Complete!', 'You’ve completed all sets. Great job!');
    }
  };

  const handleNextExercise = () => {
    if (index < exerciseList.length - 1) {
      // Navigate to the next exercise
      router.push({
        pathname: '/exercise',
        params: {
          exercises: JSON.stringify(exerciseList),
          currentIndex: index + 1, // Move to the next exercise
        },
      });
      
      // Reset timer and automatically start it for the next exercise
      setTime(30); // Reset the timer to 30 seconds for the new exercise
      setIsActive(true); // Start the timer
    } else {
      // If all exercises are completed
      Alert.alert('Workout Complete!', 'You’ve completed all exercises in this routine.');
      router.push('/'); // Navigate back to home or a summary page
    }
  };
  
  

  const handlePreviousExercise = () => {
    if (index > 0) {
      router.push({
        pathname: '/exercise',
        params: {
          exercises: JSON.stringify(exerciseList),
          currentIndex: index - 1,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>
        Set {currentSet} of {sets} | {reps} reps
      </Text>
      <Text style={styles.description}>{description}</Text>

      {/* Timer UI */}
      <Text style={styles.timer}>{time}s</Text>
      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={handleStartPause} />
        <Button title="Reset" onPress={handleReset} />
      </View>

      {/* Exercise Navigation */}
      <View style={styles.navigationButtons}>
        <Button
          title="Previous Exercise"
          onPress={handlePreviousExercise}
          disabled={index === 0}
        />
        <Button
          title={index === exerciseList.length - 1 ? 'Finish' : 'Next Exercise'}
          onPress={handleNextExercise}
        />
      </View>

      {/* Set Navigation */}
      <View style={styles.setNavigation}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkipSet}>
          <Text style={styles.skipText}>Skip Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  setNavigation: {
    marginTop: 30,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExerciseScreen;
