import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";
import { AppContext as createNoteScreenContext } from "../../context/createNoteContext";
import { AppContext } from "../../context/notesContext";

const NoteOverlay = ({ newNote, callback }) => {
  const { state: isCreateNoteScreenEnabled, setCreateNoteScreen } = useContext(
    createNoteScreenContext
  );

  const { getNotes, addNote } = useContext(AppContext); //get notesArray

  //KeyboardAvoidingView is added so that when user enter the note, it comes above the keyboard
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.modalViewContainer}>
      <Text style={styles.createTitle}>Create a Note</Text>
      <TextInput
        multiline={true}
        style={styles.createTextInput}
        value={newNote}
        onChangeText={(value) => {
          newNote = value;
        }}
        // onEndEditing={() => console.log("editing ended")}
        autoCorrect={false}
        autoCapitalize="none"
      ></TextInput>
      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          style={styles.modalButton}
          onPress={() => {
            callback();
          }}
        >
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight // button created using TouchableHighlight and Text elements instead of Button
          style={styles.modalButton}
          onPress={() => {
            callback(newNote);
          }}
        >
          <Text style={styles.modalButtonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // overlay styles//
  modalViewContainer: {
    backgroundColor: "rgb(135,172,236)",
    flex: 1,
  },
  createTitle: {
    color: "black",
    marginTop: 50,
    fontSize: 30,
    textAlign: "center",
  },
  createTextInput: {
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    marginTop: 30,
    flex: 1,
  },
  modalButton: {
    height: 40,
    width: 160,
    borderRadius: 10,
    backgroundColor: "rgb(50, 157, 168)",
    margin: 5,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  noNotesError: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    //another way to make it center
    // flex: 1,
    // alignSelf: "center",
    // justifyContent: "center",
  },
  //////////////////
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalButtonText: {
    fontWeight: "300",
    fontSize: 20,
  },
});
export default NoteOverlay;
