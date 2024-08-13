import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { React, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Platform } from "react-native";
import { IOS_CLIENT, ANDROID_CLIENT } from "@env";

import { COLORS } from "../colors";

WebBrowser.maybeCompleteAuthSession();

const url = "http://10.100.102.9:3000";
//const url = "http://192.168.68.111:3000";

export default function SigninScreen() {
  const navigation = useNavigation(); // useNavigation hook here
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const clientId = Platform.OS === "android" ? ANDROID_CLIENT : IOS_CLIENT;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: clientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      handleGoogleSignin(id_token);
    }
  }, [response]);

  const handleGoogleSignin = (id_token) => {
    console.log("Google Signin");
    // axios
    //   .post(`${url}/google-signin`, { id_token })
    //   .then((res) => {
    //     if (res.data.status === "ok") {
    //       Alert.alert("User logged in successfully with Google");
    //       navigation.navigate("FirstIntro", { username: res.data.username });
    //     } else {
    //       Alert.alert(res.data.data);
    //     }
    //   })
    //   .catch((error) => {
    //     Alert.alert("An error occurred during Google sign in");
    //     console.error(error);
    //   });
  };

  function handleSignin() {
    const userData = {
      id: id,
      password: password,
    };

    if (id.length != 0 && password.length != 0) {
      axios.post(`${url}/signin`, userData).then((res) => {
        if (res.data.status === "ok") {
          Alert.alert("User logged in successfully");
          navigation.navigate("BottomTabs", { id: id });
          ////////////////add navigation to the next screen
          //navigation.navigate("MainScreen", { username: id });
          // navigation.navigate("FirstIntro", { username: id });
        } else {
          Alert.alert(res.data.data);
        }
      });
    } else {
      Alert.alert("Please fill all the mandatory details");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            We're so excited to see you again!
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email or username "
              placeholderTextColor={"gray"}
              style={styles.input}
              onChange={(e) => setId(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              style={styles.input}
              onChange={(e) => setPassword(e.nativeEvent.text)}
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather name="eye-off" size={20} style={styles.icon} />
              ) : (
                <Feather name="eye" size={20} style={styles.icon} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signinButton}
              onPress={() => handleSignin()}
            >
              <Text style={styles.signinButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.grayText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signupText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
          {/* Divider with "Or sign in with" text */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or sign in with</Text>
            <View style={styles.line} />
          </View>

          {/* Google sign-in button */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <Image
              source={require("../assets/symbols/google_icon.png")}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.beige,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.pink,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "300",
    color: COLORS.blue,
  },
  form: {
    alignItems: "center",
    marginHorizontal: 16,
    spaceBetween: 16,
  },
  inputContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 18,
    borderRadius: 20,
    width: "100%",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  input: {
    flex: 1,
  },
  icon: {
    color: "green",
  },
  forgotPassword: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: COLORS.pink,
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
  },
  signinButton: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: COLORS.blue,
    marginBottom: 16,
  },
  signinButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.pink,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  grayText: {
    color: "gray",
  },
  signupText: {
    color: COLORS.pink,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    marginBottom: 22,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "gray",
  },
  googleButton: {
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.blue,
  },
  googleIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});
