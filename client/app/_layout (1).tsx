import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
      name = "login"
      options={{
        headerShown: false
      }}
       />
       <Stack.Screen
       name='home'
       options={{ headerShown: true
         
       }}
       
       />

       <Stack.Screen
       name = "signup"
       options={{
        headerShown: false
       }}

       />
     

     
      <Stack.Screen 
        name="exercise" 
        options={{ 
          headerShown: true, 
          title: 'Exercise Details',
        }} 
      />

      {/* Workout Screen */}
      <Stack.Screen 
        name="workout" 
        options={{ 
          headerShown: true, 
          title: 'Your Workout',
        }} 
      />
    </Stack>
  );
}
