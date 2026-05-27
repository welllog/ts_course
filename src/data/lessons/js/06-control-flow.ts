import type { MCQLesson } from '../../curriculum'

const lesson: MCQLesson = {
  id: 'js-06',
  moduleId: 'js',
  title: '控制流',
  subtitle: 'if / else / switch',
  xp: 10,
  difficulty: 'easy',
  type: 'multiple-choice',
  questions: [
    {
      text: '三元运算符的语法是什么？',
      code: 'const age = 20\nconst status = age >= 18 ? "adult" : "minor"',
      options: ['条件 ? 真值 : 假值', '条件 : 真值 ? 假值', 'if(条件) 真值 else 假值', '条件 && 真值 || 假值'],
      correct: 0,
      explanation: '三元运算符是单行条件表达式：condition ? valueIfTrue : valueIfFalse。这里 status 是 "adult"。',
    },
    {
      text: 'switch 语句中 break 的作用是什么？',
      code: `switch (color) {
  case "red":
    console.log("stop")
    break
  case "green":
    console.log("go")
    break
}`,
      options: [
        '跳出 switch，防止执行后续 case',
        '跳出整个函数',
        '继续执行下一个 case',
        'break 不是必须的',
      ],
      correct: 0,
      explanation: '不写 break 会发生"fall-through"：代码会继续执行下一个 case 的代码，直到遇到 break 或 switch 结束。',
    },
    {
      text: '下面代码输出什么？',
      code: `let x = 5
if (x > 3) {
  console.log("A")
} else if (x > 4) {
  console.log("B")
} else {
  console.log("C")
}`,
      options: ['"A"', '"B"', '"A" 和 "B"', '"C"'],
      correct: 0,
      explanation: 'if-else if 链在第一个满足条件处停止。x=5 > 3 为 true，输出 "A" 后跳过其余分支。',
    },
    {
      text: '逻辑运算符 && 和 || 的短路行为是什么？',
      options: [
        '&& 在左侧为 falsy 时停止并返回左侧；|| 在左侧为 truthy 时停止并返回左侧',
        '&& 和 || 都会求值两侧',
        '&& 总是返回 true/false，|| 也是',
        '没有短路行为',
      ],
      correct: 0,
      explanation: '短路求值：a && b 若 a 为 falsy 则直接返回 a；a || b 若 a 为 truthy 则直接返回 a。这常用于条件渲染（React 中 condition && <Component />）。',
    },
  ],
}

export default lesson
