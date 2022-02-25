import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const findTitle = tasks.find((task) => task.title === newTaskTitle);

    if (findTitle) {
      Alert.alert("Tarefa já cadastrada");
    } else {
      setTasks((prev) => [...prev, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks((prev) =>
      prev.map((task) => ({
        id: task.id,
        title: task.title,
        done: task.id === id ? !task.done : task.done,
      }))
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover Item", "Tem certeza que deseja remover?", [
      { text: "Não", onPress: () => null },
      {
        text: "Sim",
        onPress: () =>
          setTasks((prev) => prev.filter((task) => task.id !== id)),
      },
    ]);
  }

  function handleEditTask(task: { taskId: number; taskNewTitle: string }) {
    const { taskId, taskNewTitle } = task;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, title: taskNewTitle } : task
      )
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
