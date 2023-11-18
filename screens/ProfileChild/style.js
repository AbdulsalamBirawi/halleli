import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  countiner: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewLine: {
    height: 1,
    width: "100%",
    marginTop: 20,
    width: "30%",
  },
  viewLined: {
    height: 1,
    width: "100%",
    width: "70%",
    backgroundColor: "black",
    marginTop: 20,
  },
  textCom: {
    textAlign: "right",
    marginTop: 20,
    fontSize: 20,
    paddingRight: 10,
  },
  counterCard: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textNewCome: {
    textAlign: "right",
    marginTop: 30,
    fontSize: 20,
    paddingRight: 10,
    fontWeight: "bold",
  },
  showMore: {
    flexDirection: "row",
    gap: 5,
    borderBottomWidth: 2,
    borderColor: "#ddd",
    paddingBottom: 5,
  },
});
