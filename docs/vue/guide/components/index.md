# 组件

## 组件注册

### 全局注册

我们可以使用 Vue 应用实例的 `.component()` 方法，让组件在当前 Vue 应用中全局可用

```ts
import MyComponent from './App.vue';

app.component('MyComponent', MyComponent);
```

`.component()` 方法可以被链式调用：

```ts
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC);
```

全局注册的组件可以在此应用的任意组件的模板中使用：

```vue
<!-- 这在当前应用的任意组件中都可用 -->
<ComponentA />
<ComponentB />
<ComponentC />
```

### 局部注册

全局注册虽然很方便，但有以下几个问题：

1. 全局注册，但并没有被使用的组件无法在生产打包时被自动移除（“tree-shaking”）。如果你全局注册了一个组件，即使它并没有被实际使用，它仍然会出现在打包后的 JS 文件中
2. 全局注册在大型项目中使项目的依赖关系变得不那么明确。在父组件中使用子组件时，不太容易定位子组件的实现。和使用过多的全局变量一样，这可能会影响应用长期的可维护性

相比之下，局部注册的组件需要在使用它的父组件中显式导入，并且只能在该父组件中使用。它的优点是使组件之间的依赖关系更加明确，并且对 tree-shaking 更加友好

在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
<script setup>
import ComponentA from './ComponentA.vue';
</script>

<template>
  <ComponentA />
</template>
```

### 组件名格式

我们都使用 PascalCase 作为组件名的注册格式，这是因为：

1. PascalCase 是合法的 JavaScript 标识符。这使得在 JavaScript 中导入和注册组件都很容易，同时 IDE 也能提供较好的自动补全
2. `<PascalCase />` 在模板中更明显地表明了这是一个 Vue 组件，而不是原生 HTML 元素。同时也能够将 Vue 组件和自定义元素 ([web components](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)) 区分开来

为了方便，Vue 支持将模板中使用 kebab-case 的标签解析为使用 PascalCase 注册的组件。这意味着一个以 `MyComponent` 为名注册的组件，在模板中可以通过 `<MyComponent>` 或 `<my-component>` 引用。这让我们能够使用同样的 JavaScript 组件注册代码来配合不同来源的模板

# Props

# 组件事件

# 组件 v-model

# 透传 Attributes

# 插槽 Slots

# 依赖注入

# 异步组件
