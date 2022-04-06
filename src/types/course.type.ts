export type Course = {
  title: string
  description: string
  price: number
  studyHours: string
  teacher: {
    name: string
    avatarURL: string
  }
  lessons: Array<Lesson>
}

type Lesson = {
  title: string
  content?: [
    {
      title: string
      type: 'video' | 'file'
      contentURL: string
    }
  ]
}