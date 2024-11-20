import { View,Text,TextInput,Button ,StyleSheet} from "react-native";
import React from "react";
import {router} from "expo-router";



const Login: React.FC = () => {
    const [data, setData] = React.useState({
        username : "",
        password : "",
    });
    const [error, setError] = React.useState<string | null> ("");

    const  handleLogin = () =>{
    
        try {
            if(!data.username || !data.password){
                setError("Please enter Username and Password");
            }
            if(data.username === "admin" && data.password === "admin"){
    
                
                 console.log("Login successful");
                 router.push("/")
                
            }else{
                setError("Invalid credentials, Please check your username and password");
            }
            
        } catch (error) {
            console.log("Login failed",error);
        }
    }

    const handleChange = (name:string, value: string) => {
        setData({...data,[name] :value});

    
    }



    return (
        <View>
            <Text>Login</Text>
            <Text>Username</Text>
            <TextInput
            value={data.username}
            onChangeText={(text)=> handleChange("username", text)}
            
            />
            <Text>Password</Text>
            <TextInput
            value={data.password}
            onChangeText={(text) => handleChange("password",text)}
            secureTextEntry
            />
            <Button title ="Login" onPress={handleLogin}/>

            {error && <Text>{error}</Text>}
             

          

          
        </View>

    )
}



export default Login