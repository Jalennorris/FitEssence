import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

const Introduction: React.FC = () => {
    return (
        <View style={styles.container}>
            
            <Link href="/login" style={styles.link}>
               <Text>Login</Text>
            </Link>
            <Link href='/signup'>
                <Text>Signup</Text>

            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    link: {
        fontSize: 18,
        color: "blue",
        textDecorationLine: "underline",
    },
});

export default Introduction;
