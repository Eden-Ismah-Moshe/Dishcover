import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { COLORS } from "../constants";

const RecommendationsCard = ({
  name,
  image,
  type,
  city,
  matchingPercentage,
}) => {
  const percentageValue = parseInt(matchingPercentage, 10);
  const progressBarWidth = `${percentageValue}%`;

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={24}
          color={COLORS.blue}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.type}>
        {type} | {city}
      </Text>
      <View style={styles.matchingContainer}>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBarFilled, { width: progressBarWidth }]}
          />
          <View style={styles.progressBarBackground} />
        </View>
        <View style={styles.percentageContainer}>
          <Text style={styles.percentageText}>{matchingPercentage}</Text>
          <Text style={styles.matchText}>match</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    margin: 30,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 10,
  },
  image: {
    width: 300,
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "center",
    top: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  name: {
    fontSize: 20,
    color: COLORS.blue,
    fontFamily: "Poppins_700Bold",
    paddingLeft: 20,
    paddingTop: 15,
    padding: 5,
  },
  type: {
    fontSize: 17,
    color: COLORS.blue,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  matchingContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    paddingBottom: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "gray",
  },
  progressBarFilled: {
    height: "100%",
    backgroundColor: COLORS.pink,
  },
  progressBarBackground: {
    height: "100%",
    flex: 1,
  },
  percentageContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  matchText: {
    fontSize: 14,
    color: "gray",
  },
});

export default RecommendationsCard;
