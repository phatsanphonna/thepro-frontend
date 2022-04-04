export type Course = {
  title: string
  description: string
  teacher: {
    name: string
    avatarURL: string
  }
  lessons: [
    {
      title: string
      content: [
        {
          title: string
          type: 'video' | 'file'
          contentURL: string
        }
      ]
    }
  ]
}