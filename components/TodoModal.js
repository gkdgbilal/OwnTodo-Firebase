import React, {useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    TextInput, Keyboard
} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import colors from '../Colors'
import {Swipeable} from "react-native-gesture-handler";
import {Animated} from "react-native-web";

export default function TodoModal({list, closeModal, updateList}) {
    const [newTodo, setNewTodo] = useState("")
    const taskCount = list.todos.length
    const completedCount = list.todos.filter(todo => todo.completed).length

    function toggleTodoCompleted(index) {
        // let list = list
        list.todos[index].completed = !list.todos[index].completed

        updateList(list)
    }

    function addTodo() {
        let list = list

        if (!list.todos.some(todo => todo.title === newTodo)) {
            list.todos.push({title: newTodo, completed: false})

            updateList(list)
        }

        setNewTodo("")
        Keyboard.dismiss()
    }

    function deleteTodo(index) {
        let list = list
        list.todos.splice(index, 1)
        updateList(list)
    }

    function rightActions(dragX, index) {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: "clamp",
        })

        const opacity = dragX.interpolate({
            inputRange: [-100, -20, 0],
            outputRange: [1, 0.9, 0],
            extrapolate: "clamp",
        })

        return (
            <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Animated.View style={[styles.deleteButton, {opacity: opacity}]}>
                    <Animated.Text style={{color: colors.white, fontWeight: "800", transform: [{scale}]}}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    function renderTodo(todo, index) {
        return (
            <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, index)}>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
                        <Ionicons
                            name={todo.completed ? "ios-square" : "ios-square-outline"}
                            size={24}
                            color={colors.gray}
                            style={{width: 32}}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.todo, {
                        textDecorationLine: todo.completed ? "line-through" : "none",
                        color: todo.completed ? colors.gray : colors.black
                    }]}>{todo.title}</Text>
                </View>
            </Swipeable>
        )
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{position: "absolute", top: 64, right: 32, zIndex: 10}}
                    onPress={closeModal}
                >
                    <AntDesign
                        name="close"
                        size={24}
                        color={colors.black}
                    >

                    </AntDesign>
                </TouchableOpacity>
                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                    <View>
                        <Text style={styles.title}>{list.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks
                        </Text>
                    </View>
                </View>
                <View style={[styles.section, {flex: 3, marginVertical: 16}]}>
                    <FlatList
                        data={list.todos}
                        renderItem={({item, index}) => renderTodo(item, index)}
                        keyExtractor={(item) => item.title}
                        // contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                        showsVerticalScrollIndicator={false}
                    >

                    </FlatList>
                </View>
                <View style={[styles.section, styles.footer]}>
                    <TextInput
                        style={[styles.input, {borderColor: list.color}]}
                        onChangeText={text => setNewTodo(text)}
                        value={newTodo}
                    />
                    <TouchableOpacity
                        style={[styles.addTodo, {backgroundColor: list.color}]}
                        onPress={() => addTodo()}
                    >
                        <AntDesign
                            name="plus"
                            size={16}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
        paddingTop: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600",
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 32,
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16,
    },
    deleteButton: {
        flex: 1,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
})
