export function getFirebaseErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "Invalid credentials!";
    case "auth/missing-password":
      return "Please enter a password.";
    case "auth/missing-email":
      return "Please enter an email.";
    case "auth/invalid-email":
      return "Please enter a valid email.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-exists":
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    case "auth/weak-password":
      return "Password must be at least 6 characters long.";
    case "auth/invalid-password":
      return "Invalid password.";
    case "auth/internal-error":
      return "Internal server error. Try again later.";
    case "auth/network-request-failed":
      return "Check your internet connection.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed. Check Firebase settings.";
    default:
      return "Unknown error. Please try again.";
  }
}
