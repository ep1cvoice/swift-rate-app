// Base class for errors we expect and can explain to the user.
// `userMessage` is shown in the UI, `message` is for the console.
export class AppError extends Error {
  constructor(message, userMessage) {
    super(message)
    this.name = this.constructor.name
    this.userMessage = userMessage
  }
}

// Bad user input — a "soft" error, the user can fix it and retry.
export class ValidationError extends AppError {
  constructor(userMessage) {
    super(`Validation failed: ${userMessage}`, userMessage)
  }
}

// Network / API failure — a "hard" error, outside the user's control.
export class ApiError extends AppError {
  constructor(status) {
    super(
      `API request failed (status ${status ?? 'network'})`,
      'Nie udało się pobrać kursu. Sprawdź połączenie i spróbuj ponownie.',
    )
    this.status = status
  }
}
