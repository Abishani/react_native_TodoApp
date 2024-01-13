import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import Fallback from "../components/Fallback";

const TodoScreen = () => {
  // Init local states
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]); //track the list of todos
  const [editedTodo, setEditedTodo] = useState(null);

  // Handle Add Todo
  const handleAddTodo = () => {
    // Structure of a single todo item
    // {
    //   id:
    //   title:
    // }
    if (todo === "") {
      return;
    }
    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo("");
  };

  // Handle Delete Todo
  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  // Handle Edit Todo
  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  // Handle Update Todo
  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  };

  // Render Todo
  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#800080",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5, //if it is android
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "600",
            flex: 1,
          }}
        >
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginLeft: 120,
        }}
      >
        My Todos
      </Text>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#800080",
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginTop: 15,
        }}
        placeholder="Add a Task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 12,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleAddTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      {/* Render todo List */}
      {/* Flat List: 
      React Native FlatList is a component of the React Native framework that allows developers 
      to render large lists of data on mobile devices efficiently. It optimises performance and memory usage 
      by rendering only the currently visible items on the screen rather than the entire list. */}

        <FlatList data={todoList} renderItem={renderTodos}/>


      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
