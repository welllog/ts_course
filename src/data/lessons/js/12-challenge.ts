import type { CodeLesson } from '../../curriculum'

const lesson: CodeLesson = {
  id: 'js-12',
  moduleId: 'js',
  title: 'JavaScript 综合挑战',
  subtitle: 'Final Challenge',
  xp: 30,
  difficulty: 'hard',
  type: 'code-challenge',
  instruction: `## 综合挑战：数据处理流水线

综合运用数组方法、解构、箭头函数和函数组合。

给定一组学生成绩数据，完成以下要求：

1. \`getTopStudents(students, n)\`: 返回成绩前 n 名的学生，按成绩降序排列
2. \`getAverageScore(students)\`: 计算所有学生的平均分，保留两位小数
3. \`groupByGrade(students)\`: 按等级分组（90+ 为 A，80+ 为 B，70+ 为 C，其余为 D）`,
  starterCode: `interface Student {
  name: string
  score: number
}

function getTopStudents(students: Student[], n: number): Student[] {
  // TODO: 返回按 score 降序排列的前 n 个学生
  return []
}

function getAverageScore(students: Student[]): number {
  // TODO: 返回平均分，用 Number.toFixed(2) 然后转为数字
  return 0
}

function groupByGrade(students: Student[]): Record<string, Student[]> {
  // TODO: 返回 { A: [...], B: [...], C: [...], D: [...] }
  return {}
}
`,
  tests: [
    {
      description: 'getTopStudents 返回前两名',
      expression: `(() => {
  const s = [{name:"A",score:90},{name:"B",score:85},{name:"C",score:95}]
  const top = getTopStudents(s, 2)
  return top[0].score === 95 && top[1].score === 90
})()`,
    },
    {
      description: 'getAverageScore 计算正确',
      expression: `(() => {
  const s = [{name:"A",score:80},{name:"B",score:90},{name:"C",score:70}]
  return getAverageScore(s) === 80.00
})()`,
    },
    {
      description: 'groupByGrade 分组正确',
      expression: `(() => {
  const s = [{name:"A",score:95},{name:"B",score:82},{name:"C",score:60}]
  const g = groupByGrade(s)
  return g['A']?.length === 1 && g['B']?.length === 1 && g['D']?.length === 1
})()`,
    },
  ],
}

export default lesson
