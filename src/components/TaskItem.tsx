import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import { Task } from "./TasksList";

type TaskItemProps = {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (task: { taskId: number; taskNewTitle: string }) => void;
};

export default function TaskItem(props: TaskItemProps) {
  const { item, index, toggleTaskDone, removeTask, editTask } = props;
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(item.title);
  const textInputRef = React.useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: item.id, taskNewTitle: title });
    setIsEditing(false);
  }

  React.useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <React.Fragment>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <TextInput
            editable={isEditing}
            value={isEditing ? title : item.title}
            onChangeText={(value) => setTitle(value)}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 12 }}
          >
            <Icon name="x" size={16} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingHorizontal: 12 }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.divider} />
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 12 }}
          disabled={isEditing}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divider: {
    backgroundColor: "#B2B2B2",
    height: 24,
    width: 1,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
