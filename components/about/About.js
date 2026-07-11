import React from "react";
import { View, Text } from "react-native";
import styles from "./About.style";

const About = ({ info, title }) => {
  return (
    <View style={styles.container}>
      {/* Title Heading */}
      <Text style={styles.headText}>About {title}:</Text>

      {/* Description Content Container */}
      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  );
};

export default About;