import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  Modal,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { AppContext } from "../../context/notesContext";
import LoadingScreen from "../components/LoadingIndicator";
import ListRowComponent from "../components/ListRowComponent";
import { AppContext as createNoteScreenContext } from "../../context/createNoteContext";
import NoteOverlay from "../components/NoteOverlay";

FlatListItemSeperator = () => {
  return (
    <View style={{ height: 1, width: "100%", backgroundColor: "black" }}></View>
  );
};

const HomeScreen = ({ navigation }) => {
  const { state, getNotes, addNote } = useContext(AppContext); //get notesArray

  const [isLoading, setLoading] = useState(false);

  // when you do useContext(createNoteScreenContext) , this is the data returned:
  // {"isCreateNoteScreenEnabled": [Function anonymous], "setCreateNoteScreen": [Function anonymous], "state": false}
  const { state: isCreateNoteScreenEnabled, setCreateNoteScreen } = useContext(
    createNoteScreenContext
  );

  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    setLoading(true);
    const listener = navigation.addListener("focus", () => {
      console.log("home screen in focus"); // call getNotes whenever homescreen is in focus
      getNotes(() => setLoading(false)); //console.log("done with getting")
      // getNotes(() => console.log("done with getting"));
    });
    return () => {
      listener.remove();
    };
  }, []); //empty dependency array makes useEffect to be called only once

  return (
    <View style={styles.mainView}>
      <Button
        title="Create New Note"
        onPress={() => {
          setCreateNoteScreen(true);
        }}
      />
      {isCreateNoteScreenEnabled ? (
        <Modal>
          <NoteOverlay
            value={newNote}
            callback={(enteredNote) => {
              setCreateNoteScreen(false);
              console.log("####### : ", enteredNote);
              addNote(enteredNote);
              getNotes(() => setLoading(false));
            }}
          ></NoteOverlay>
        </Modal>
      ) : null}
      {state.length > 0 ? ( // check if any data exists
        <FlatList
          style={styles.list}
          data={state}
          inverted={true}
          keyExtractor={(note) => note.id}
          ItemSeparatorComponent={FlatListItemSeperator}
          renderItem={({ item }) => {
            return <ListRowComponent rowData={item.title}></ListRowComponent>;
          }}
        ></FlatList>
      ) : isLoading ? ( //if no data , check if it is still loading
        <LoadingScreen style={styles.loadingIndicator}></LoadingScreen>
      ) : (
        //if not loading , then show the error
        <View style={styles.noNotesError}>
          <Text>Something went wrong. Please try again later</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "rgb(188, 191, 195)",
    flex: 1,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  list: {
    marginTop: 5,
  },
});

export default HomeScreen;
