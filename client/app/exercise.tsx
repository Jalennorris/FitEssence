import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Vibration,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import CooldownScreen from '../components/cooldown';
import { Ionicons } from 'react-native-vector-icons';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  description: string;
}

// Safely parse JSON and validate exercises
const safeParseExercises = (data: string): Exercise[] => {
  try {
    if (!data) {
      console.error('No exercises data provided');
      return [];
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.every(isExercise)) {
      return parsed;
    }
    console.error('Invalid exercise data structure');
    return [];
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
};

// Type guard for Exercise validation
const isExercise = (obj: any): obj is Exercise =>
  obj &&
  typeof obj.name === 'string' &&
  typeof obj.sets === 'number' &&
  typeof obj.reps === 'number' &&
  typeof obj.description === 'string';

const ExerciseScreen: React.FC = () => {
  const { exercises, currentIndex } = useLocalSearchParams() as {
    exercises: string;
    currentIndex: string;
  };

  const router = useRouter();
  const [isCooldown, setIsCooldown] = useState(false);

  const exerciseList: Exercise[] = safeParseExercises(exercises);
  const index = Number(currentIndex);

  if (exerciseList.length === 0 || isNaN(index) || index < 0 || index >= exerciseList.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error loading exercises. Please try again later.
        </Text>
      </View>
    );
  }

  const { name, sets, reps, description } = exerciseList[index];
  const [time, setTime] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      if (interval) clearInterval(interval);
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

  const handleStartPause = () => setIsActive((prev) => !prev);

  const handleReset = () => {
    setIsActive(false);
    setTime(30);
  };

  const handleNextSet = () => {
    if (currentSet < sets) {
      setCurrentSet((prev) => prev + 1);
      setTime(30);
      setIsActive(false);
      if (currentSet + 1 === 3) setIsCooldown(true); // Trigger cooldown on 3rd set
    } else {
      Alert.alert('All sets complete!', 'Moving to the next exercise.');
      handleNextExercise();
    }
  };

  const handleSkipSet = () => {
    if (currentSet < sets) {
      setCurrentSet((prev) => prev + 1);
      setTime(30);
    } else {
      Alert.alert('Workout Complete!', 'You’ve completed all sets. Great job!');
    }
  };

  const handleNextExercise = () => {
    if (index < exerciseList.length - 1) {
      router.push({
        pathname: '/exercise',
        params: {
          exercises: JSON.stringify(exerciseList),
          currentIndex: index + 1,
        },
      });
      setTime(30);
      setIsActive(true);
    } else {
      Alert.alert('Workout Complete!', 'You’ve completed all exercises.');
      router.push('/workout');
    }
  };

  const handleCooldownEnd = () => setIsCooldown(false);

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

  if (isCooldown) {
    return <CooldownScreen onCooldownEnd={handleCooldownEnd} cooldownTime={30} />;
  }

  return (
    <View style={styles.container}>
       <TouchableOpacity 
                onPress={() => router.push("/")} 
                style={styles.backButton} 
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>
        Set {currentSet} of {sets} | {reps} reps
      </Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.timer}>{time}s</Text>

      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={handleStartPause} />
        <Button title="Reset" onPress={handleReset} />
      </View>

      <View style={styles.navigationButtons}>
        <Button title="Previous" onPress={handlePreviousExercise} disabled={index === 0} />
        <Button title={index === exerciseList.length - 1 ? 'Finish' : 'Next'} onPress={handleNextExercise} />
      </View>

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
   backButton: {
    position: 'absolute',
    top: 40,  
    left: 20, 
    zIndex: 1, 
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
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 50,
  },
});

export default ExerciseScreen;
