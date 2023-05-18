import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  KeyboardAvoidingView,
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
      <Button
        style={styles.modalButton}
        title="Submit"
        onPress={() => {
          callback(newNote);
          // console.log("new note is", newNote);
          // setCreateNoteScreen(false);
          // addNote(newNote);
          // getNotes(() => setLoading(false));
        }}
      ></Button>
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
    margin: 20,
    borderRadius: 0.5,
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
});
export default NoteOverlay;
