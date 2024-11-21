import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from 'expo-router';
import image from "../assets/images/signupImage.jpg"

import { Ionicons } from 'react-native-vector-icons';

const Signup: React.FC = () => {
    const [data, setData] = React.useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = React.useState<string | null>("");

    const router = useRouter();

    const handleSignup = () => {
        try {
            /
            if (!data.email || !data.username || !data.password || !data.confirmPassword) {
                setError("Please fill in all fields");
            } else if (data.password !== data.confirmPassword) {
                setError("Passwords do not match");
            } else if (!validateEmail(data.email)) {
                setError("Please enter a valid email");
            } else {
                console.log("Signup successful");
               
                router.push("/login").catch(err => console.error("Navigation error:", err));
            }
        } catch (error) {
            console.log("Signup failed", error);
        }
    };

    const handleChange = (name: string, value: string) => {
        setData({ ...data, [name]: value });
    };


    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    return (
        <View style={styles.container}>
            <Image source={image} 
           
           resizeMode="contain"
            style={styles.image} />
            
            <TouchableOpacity 
                onPress={() => router.push("/introduction")} 
                style={styles.backButton} 
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>

            
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Enter your details to sign up</Text>
            
            {/* Email Input */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={data.email}
                onChangeText={(text) => handleChange("email", text)}
            />
            
            {/* Username Input */}
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={data.username}
                onChangeText={(text) => handleChange("username", text)}
            />

            {/* Password Input */}
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={data.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry
            />
            
            {/* Confirm Password Input */}
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                value={data.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry
            />

            {/* Sign Up Button */}
            <TouchableOpacity 
                onPress={handleSignup} 
                style={styles.button} 
                activeOpacity={0.7} 
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Error Message */}
            {error && <Text style={styles.error}>{error}</Text>}

            {/* Link to Login page */}
            <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.link}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,  
        left: 20, 
        zIndex: 1, 
    },
    image: {
        width: 150,  
        height: 150, 
        marginBottom: 20,  
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "black"
    },
    subtitle: {
        fontSize: 16,
        color: "gray",
        marginBottom: 20,
    },
    label: {
        color: "gray",
        alignSelf: "flex-start",
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: "100%",
    },
    button: {
        backgroundColor: "blue",
        paddingVertical: 12,
        paddingHorizontal: 20, 
        borderRadius: 10,  
        alignItems: "center",
        width: "80%",
        marginTop: 20,
        height: 50,  
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    error: {
        color: "red",
        marginTop: 10,
    },
    link: {
        color: "blue",
        marginTop: 20,
    }
});

export default Signup;
