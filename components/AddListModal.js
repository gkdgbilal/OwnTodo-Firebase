import React, {useState} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import colors from "../Colors"
import tempData from "../tempData";

export default function AddListModal({list, closeModal, addList}) {
    const backgroundColors = [
        "#1EB88A", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963", "#D88559"
    ]

    function createTodo() {
        // const list = {name, color}
        // console.log(list)
        // addList(list)
        // // tempData.push({
        // //     name,
        // //     color,
        // //     todos: [],
        // // })
        // setName("")
        // closeModal()

        list.push({name: name, color: color, todos: []})
        console.log(list)
        addList(list)
        setName("")
        closeModal()
    }

    const [name, setName] = useState("")
    const [color, setColor] = useState(backgroundColors[0])

    function renderColor() {
        return backgroundColors.map(color => {
                return (
                    <TouchableOpacity
                        key={color}
                        style={[styles.colorSelect, {backgroundColor: color}]}
                        onPress={() => setColor(color)}
                    />
                )
            }
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <TouchableOpacity
                style={{position: "absolute", top: 64, right: 32}}
                onPress={closeModal}
            >
                <AntDesign
                    name="close"
                    size={24}
                    color={colors.black}
                />
            </TouchableOpacity>
            <View style={{alignSelf: "stretch", marginHorizontal: 32}}>
                <Text style={styles.title}>Create Todo List</Text>
                <TextInput
                    style={styles.input}
                    placeholder="List Name ?"
                    onChangeText={(text) => setName(text)}
                />
                <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 12}}>
                    {renderColor()}
                </View>
                <TouchableOpacity
                    style={[styles.create, {backgroundColor: `${color}`}]}
                    onPress={() => createTodo()}
                >
                    <Text style={{color: colors.white, fontWeight: "600"}}>
                        Create!
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
});
