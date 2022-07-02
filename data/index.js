const users = [ 
  {
    id: 1,
    userName: 'maxWell',
    password: 'abrakadabra',
    type: 'student',
    email: "maxwell@mail99.com",
  },
];

const students = [
  {
    id: 1,
    firstName: 'James',
    lastName: 'MaxWell',
    birthDate: '13.06.1831',
    gender: 'male',
    email: 'example@gmail.com',
    userId: 1,
    university: 'University of Edinburgh',
  }
];

const assignments = [
  {
    id: 1,
    name: 'Сумма двух чисел',
    description: 'Напишите функцию, которая принимает два числа a и b и возвращает их сумму',
    difficulty: 'easy',
  }
];

const studentAssignments = [
  {
    id: 1,
    studentId: 1,
    list: [
      {
        id: 1,
        completed: false,
        score: 0,
      },
      {
        id: 2,
        completed: true,
        score: 98,
      },
      {
        id: 3,
        completed: false,
        score: 0,
      },
    ],
    averageScore: 32.6
  }
]

const studentStats = [
  {
    id: 1,
    studentId: 1,
    averageScore: 0,
    completedAssignments: [],
  }
]
