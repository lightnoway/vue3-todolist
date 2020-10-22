<template>
  <section class="todoapp">
    <header class="header">
      <h1>todo list</h1>
      <input
        id="newTodo"
        class="new-todo"
        v-model="input"
        placeholder="What needs to be done?"
        @keyup.enter="addItem"
        autofocus
      />
    </header>
    <section class="main" style="display: block">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="checkAll"
      />
      <label for="toggle-all"
        >Mark all as {{ !checkAll ? "complete" : "uncomplete" }}</label
      >
      <ul class="todo-list">
        <li
          v-for="item of filteredItems"
          :key="item"
          :class="{
            completed: item.completed,
            editing: item === curEdit.item,
          }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="item.completed" />
            <label @dblclick="beginEdit(item)">{{ item.text }}</label>
            <button class="destroy" @click="removeItem(item)"></button>
          </div>
          <input
            class="edit"
            v-model="curEdit.text"
            @keyup.enter="confirmEdit(item)"
            @keyup.esc="cancelEdit(item)"
            @blur="cancelEdit(item)"
            v-edit-focus="item === curEdit.item"
          />
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count"
        ><strong id="todoCount">{{ leftCount }}</strong> item{{
          leftCount > 0 ? "s" : ""
        }}
        left</span
      >
      <ul class="filters">
        <li v-for="(item, i) of filterTypes" :key="item">
          <a :class="{ selected: item === filterCur }" :href="`#/${item}`">{{
            filterTypesC[i]
          }}</a>
        </li>
      </ul>
      <button class="clear-completed" @click="clearCompleted" v-show="leftCount>0">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import "./assets/css/index.css";
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watchEffect,
} from "vue";
import { capitalize } from "lodash";
import { getStorage, setStorage } from "./utils/localStorage";

function useAddItem(todos) {
  const input = ref("");
  function addItem() {
    if (input.value) {
      todos.value.unshift({
        complete: false,
        text: input.value,
      });
      input.value = "";
    }
  }
  return { input, addItem };
}
function useRemoveItem(list) {
  return {
    removeItem,
  };
  function removeItem(item) {
    const index = list.value.indexOf(item);
    if (index > -1) {
      list.value.splice(index, 1);
    }
  }
}

function useEditItem(remove) {
  const curEdit = reactive({
    item: null,
    text: "",
  });
  return {
    curEdit,
    beginEdit,
    confirmEdit,
    cancelEdit,
  };
  function beginEdit(item) {
    curEdit.item = item;
    curEdit.text = item.text;
  }
  function confirmEdit(item) {
    curEdit.text = (curEdit.text || "").trim();
    if (curEdit.text) {
      item.text = curEdit.text;
    } else {
      remove(item);
    }
    curEdit.item = null;
  }
  function cancelEdit() {
    curEdit.item = null;
  }
}

function useCheckAll(items) {
  const checkAll = computed({
    get() {
      return (
        items.value.length > 0 && items.value.every((item) => item.completed)
      );
    },
    set(val) {
      items.value.forEach((item) => (item.completed = val));
    },
  });
  return { checkAll };
}
function useFilter(items, remove) {
  const current = ref("all");
  const filters = {
    all: (items) => items,
    active: (items) => items.filter((item) => !item.completed),
    completed: (items) => items.filter((item) => item.completed),
  };
  const filterTypes = Object.keys(filters);
  const filteredItems = computed(function () {
    return filters[current.value](items.value);
  });
  const leftCount = computed(function () {
    return filters.active(items.value).length;
  });

  onMounted(() => {
    window.addEventListener("hashchange", setCurrent);
    setCurrent();
  });
  onUnmounted(() => {
    window.removeEventListener("hashchange", setCurrent);
  });

  return {
    filteredItems,
    filterCur: current,
    filterTypes,
    filterTypesC: filterTypes.map(capitalize),
    leftCount,
    clearCompleted,
  };
  /** function 放下边 */
  function setCurrent() {
    const hash = location.hash.slice(2);
    if (filters[hash]) {
      current.value = hash;
    } else {
      current.value = filterTypes[0];
      location.hash = current.value;
    }
  }
  function clearCompleted() {
    filters.completed(items.value).forEach((item) => remove(item));
  }
}
function usePersist(key) {
  return {
    val: getStorage(key),
    watch(refObj) {
      watchEffect(() => {
        setStorage(key, refObj.value);
      });
    },
  };
}
export default {
  name: "App",
  setup() {
    const todosPersist = usePersist("todos");
    const todos = ref(
      validTodos(todosPersist.val) || [
        { text: "Learn Elm Architecture", complete: false },
        { text: "Build Todo List App", complete: false },
        { text: "Win the Internet!", complete: false },
      ]
    );
    todosPersist.watch(todos);
    const { removeItem } = useRemoveItem(todos);

    return {
      todos,
      ...useAddItem(todos),
      removeItem,
      ...useEditItem(removeItem),
      ...useCheckAll(todos),
      ...useFilter(todos, removeItem),
    };
  },
  filters: {
    capitalize,
  },
  directives: {
    editFocus(el, { value }) {
      if (value) {
        el.focus();
      }
    },
  },
};
function validTodos(todos) {
  if (!Array.isArray(todos)) return false;
  if (todos.length === 0) return todos;
  if ("text" in todos[0]) {
    return todos;
  }
  return false;
}
</script>
 