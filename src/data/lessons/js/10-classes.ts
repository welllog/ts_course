import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'js-10',
  moduleId: 'js',
  title: '类与原型',
  subtitle: 'Classes & Prototypes',
  xp: 25,
  difficulty: 'medium',
  type: 'code-challenge',
  instruction: `## 类与原型

ES6 引入了 \`class\` 语法，是基于原型继承的语法糖，让面向对象编程更直观。

关键概念：
- \`constructor\`: 构造函数，\`new\` 时执行
- \`this\`: 指向当前实例
- \`extends\`: 继承父类
- \`super()\`: 调用父类构造函数

### 任务
实现 \`Animal\` 基类和 \`Dog\` 子类：
- \`Animal\` 有 \`name\` 属性和 \`speak()\` 方法，返回 \`"[name] makes a noise."\`
- \`Dog\` 继承 \`Animal\`，重写 \`speak()\`，返回 \`"[name] barks."\``,
  starterCode: `class Animal {
  // TODO: constructor(name: string) 保存 this.name
  // TODO: speak() 返回 \`\${this.name} makes a noise.\`
}

class Dog /* TODO: extends Animal */ {
  // TODO: 重写 speak() 返回 \`\${this.name} barks.\`
}
`,
  tests: [
    { description: 'Animal 的 speak() 方法', expression: 'new Animal("Cat").speak() === "Cat makes a noise."' },
    { description: 'Dog 的 speak() 方法', expression: 'new Dog("Rex").speak() === "Rex barks."' },
    { description: 'Dog 是 Animal 的实例', expression: 'new Dog("Rex") instanceof Animal' },
    { description: 'Dog 有 name 属性', expression: 'new Dog("Buddy").name === "Buddy"' },
  ],
}

export default lesson
