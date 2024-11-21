import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from 'react-native-vector-icons';
import React from "react";
import { useRouter } from 'expo-router';


const Introduction: React.FC = () => {
    const router = useRouter();

    const handleNavigate = (page: string) => {
        router.push(`/${page}`);
    };

    return (
        <View style={styles.container}>
            {/* Heading */}
            <Text style={styles.header}>FitnessEssence</Text>
          
           

            {/* Login Button */}
            <TouchableOpacity 
                style={[styles.button, styles.loginButton]} 
                onPress={() => handleNavigate('login')}
            >
                <Ionicons name="log-in-outline" size={24} color="white" />
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Signup Button */}
            <TouchableOpacity 
                style={[styles.button, styles.signupButton]} 
                onPress={() => handleNavigate('signup')}
            >
                <Ionicons name="person-add-outline" size={24} color="white" />
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

            {/* Subtitle */}
            <Text style={styles.subtitle}>Join us to start your fitness journey</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#f5f5f5",
    },
    image: {
        width: 150,  
        height: 150, 
        marginBottom: 20,  
    },
    header: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#333",
        marginBottom: "40%",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 55,
        borderRadius: 30,
        marginBottom: 15,
        elevation: 5,
    },
    loginButton: {
        backgroundColor: "#007BFF",
    },
    signupButton: {
        backgroundColor: "#28A745",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginTop: 20,
        textAlign: "center",
    },
});

export default Introduction;
