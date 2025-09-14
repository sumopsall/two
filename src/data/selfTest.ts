export interface Question {
  id: number
  question: string
  options: Array<{ text: string; score: number }>
}

export const selfTestQuestions: Question[] = [
  {
    id: 1,
    question: "How have you been feeling about your academic workload this week?",
    options: [
      { text: "Completely overwhelmed and stressed", score: 1 },
      { text: "Somewhat stressed but manageable", score: 2 },
      { text: "Balanced and in control", score: 3 },
      { text: "Confident and motivated", score: 4 }
    ]
  },
  {
    id: 2,
    question: "How well have you been sleeping lately?",
    options: [
      { text: "Very poorly, often staying awake worried", score: 1 },
      { text: "Somewhat restless, waking up tired", score: 2 },
      { text: "Generally good with occasional issues", score: 3 },
      { text: "Excellent, feeling well-rested", score: 4 }
    ]
  },
  {
    id: 3,
    question: "How connected do you feel to your friends and support system?",
    options: [
      { text: "Very isolated and alone", score: 1 },
      { text: "Somewhat disconnected", score: 2 },
      { text: "Moderately connected", score: 3 },
      { text: "Strongly supported and connected", score: 4 }
    ]
  },
  {
    id: 4,
    question: "How optimistic do you feel about your future?",
    options: [
      { text: "Very pessimistic and worried", score: 1 },
      { text: "Somewhat uncertain", score: 2 },
      { text: "Cautiously optimistic", score: 3 },
      { text: "Very hopeful and excited", score: 4 }
    ]
  },
  {
    id: 5,
    question: "How effectively are you managing daily activities and responsibilities?",
    options: [
      { text: "Struggling significantly", score: 1 },
      { text: "Managing but with difficulty", score: 2 },
      { text: "Handling things reasonably well", score: 3 },
      { text: "Excelling and feeling productive", score: 4 }
    ]
  }
]

export function getFeedback(score: number): { title: string; message: string; color: string } {
  const percentage = (score / 20) * 100

  if (percentage >= 80) {
    return {
      title: "Excellent Mental Wellness! 🌟",
      message: "You're doing amazing! Keep up the great self-care habits and continue reaching out for support when needed.",
      color: "text-green-600"
    }
  } else if (percentage >= 60) {
    return {
      title: "Good Mental Health 😊",
      message: "You're managing well overall. Consider exploring our resources for additional support and stress management techniques.",
      color: "text-blue-600"
    }
  } else if (percentage >= 40) {
    return {
      title: "Some Areas for Improvement 🤗",
      message: "You might benefit from additional support. Check out our resource hub and consider talking to someone you trust.",
      color: "text-yellow-600"
    }
  } else {
    return {
      title: "Seeking Support Recommended 💙",
      message: "It sounds like you're going through a tough time. Please reach out to our helplines or visit YourDost for professional support. You're not alone.",
      color: "text-red-600"
    }
  }
}