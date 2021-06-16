import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, ActivityIndicator} from 'react-native';
import colors from './Colors'
import {AntDesign} from '@expo/vector-icons'
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";
import firebase from "firebase";

export default function App() {
    const [addTodoVisible, setAddTodoVisible] = useState(false)
    const [lists, setLists] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const firebase = ((error, user) => {
            if (error) {
                return alert("Uh oh, something went wrong")
            }

            firebase.getLists(lists => {
                setLists(lists)
                setUser(user)
                setLoading(false)
            })

            setUser({user})

        })
        return () => {
            firebase.detach()
        }
    }, [])


    // useEffect(() => {
    //     const firebase = ((error, user) => {
    //         if (error) {
    //             return alert("Uh oh, something went wrong")
    //         }
    //
    //         firebase.getLists(lists => {
    //             setLists(lists)
    //             setUser(user)
    //             setLoading(false)
    //         })
    //
    //         setUser({user})
    //
    //     })
    // }, [])


    function toggleAddTodoModal() {
        setAddTodoVisible(!addTodoVisible)
    }

    function renderList(list) {
        return (
            <TodoList
                list={list}
                updateList={updateList}
            />
        )
    }

    function addList(list) {
        // setLists({lists: [...lists, {list, id: lists.length + 1, todos: []}]})
        // lists.push(...lists, {list, id: lists.length + 1, todos: []})
        firebase.addList({
            name: list.name,
            color: list.color,
            todos: []
        })
    }

    const updateList = list => {
        // setLists(lists.map(item => {
        //         return item.id === list.id ? list : item;
        //     })
        // );
        firebase.updateList(list)
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                    color={colors.blue}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={addTodoVisible}
                onRequestClose={() => toggleAddTodoModal()}
            >
                <AddListModal
                    list={lists}
                    closeModal={() => toggleAddTodoModal()}
                    addList={addList}
                />
            </Modal>
            <View>
                <Text>User: {user.uid}</Text>
            </View>
            <View style={{flexDirection: "row"}}>
                <View style={styles.divider}/>
                <Text style={styles.title}>
                    Todo <Text style={{fontWeight: "300", color: colors.blue}}>Lists</Text>
                </Text>
                <View style={styles.divider}/>
            </View>
            <View style={{marginVertical: 48}}>
                <TouchableOpacity
                    style={styles.addList}
                    onPress={() => toggleAddTodoModal()}
                >
                    <AntDesign name="plus" size={16} color={colors.blue}/>
                </TouchableOpacity>
                <Text style={styles.add}>
                    Add List
                </Text>
            </View>
            <View style={{height: 275, paddingLeft: 32}}>
                <FlatList
                    data={lists}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => renderList(item)}
                    keyboardShouldPersistTaps="always"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: 'center'
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal: 64,
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    add: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8,
    },
});
