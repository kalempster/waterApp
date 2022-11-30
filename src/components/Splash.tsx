import { useEffect } from "react";
import { StyleSheet, Image, ImageStyle, SafeAreaView } from "react-native";
import { Props } from "../App";


const Splash = ({ navigation }: Props) => {


    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: "Devices" }]
            });
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../assets/splash.png")} style={styles.title} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#21005D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    title: ({
        width: "75%",
        resizeMode: "contain"
    } as ImageStyle),
})

export default Splash;