import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CooldownScreenProps {
  onCooldownEnd: () => void;
  cooldownTime?: number;
}

const CooldownScreen: React.FC<CooldownScreenProps> = ({ onCooldownEnd, cooldownTime = 30 }) => {
  const [time, setTime] = useState(cooldownTime);

  useEffect(() => {
   
    const interval = time > 0 
      ? setInterval(() => setTime((prev) => prev - 1), 1000) 
      : null;

   
    if (time === 0) {
      onCooldownEnd();
    }

  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [time, onCooldownEnd]);

  return (
    <View style={styles.cooldownContainer}>
      <Text style={styles.cooldownText}>Cooldown Time</Text>
      <Text style={styles.cooldownTimer}>{time}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cooldownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
  },
  cooldownText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#555',
  },
  cooldownTimer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default CooldownScreen;
