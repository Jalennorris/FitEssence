import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import React from "react";
import image from '../assets/images/LoginFitness.jpeg'
import { useRouter } from 'expo-router';
import { Ionicons } from 'react-native-vector-icons';

const Login: React.FC = () => {
    const [data, setData] = React.useState({
        username: "",
        password: "",
    });
    const [error, setError] = React.useState<string | null>("");

   
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();

    const handleLogin = () => {
        setLoading(true); 
        
        setTimeout(() => {
            try {
                if (!data.username || !data.password) {
                    setError("Please enter Username and Password");
                    setLoading(false); 
                } else if (data.username === "test" && data.password === "1234") {
                    console.log("Login successful");
                    setLoading(false); 
                    router.push("/").catch(err => console.error("Navigation error:", err));
                } else {
                    setError("Invalid credentials, Please check your username and password");
                    setLoading(false); 
                }
            } catch (error) {
                console.log("Login failed", error);
                setLoading(false); 
            }
        }, 2000); 
    };

    const handleChange = (name: string, value: string) => {
        setData({ ...data, [name]: value });
    };

    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
             <TouchableOpacity 
                onPress={() => router.push("/introduction")} 
                style={styles.backButton} 
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Enter Your Username and password</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={data.username}
                onChangeText={(text) => handleChange("username", text)}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={data.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry
            />
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                activeOpacity={0.7}
                disabled={loading} 
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => router.push("/signup")}>

                <Text style={styles.loginText}>Don't have an account? Signup</Text>

            </TouchableOpacity>


            {error && <Text style={styles.error}>{error}</Text>}
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
    loginText : {
        marginTop: 10,
        color: "blue",
    }
});

export default Login;
