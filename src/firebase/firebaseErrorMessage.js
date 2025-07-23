// src/utils/firebaseErrorMessages.js

export function getFirebaseErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-credential":
      return "Nesprávne prihlasovacie údaje!";
    case "auth/missing-password":
      return "Zadajte heslo.";

    case "auth/missing-email":
      return "Zadajte email.";
    case "auth/invalid-email":
      return "Zadaj platný e-mail.";
    case "auth/user-not-found":
      return "Používateľ s týmto e-mailom neexistuje.";
    case "auth/wrong-password":
      return "Nesprávne heslo.";
    case "auth/email-already-exists":
    case "auth/email-already-in-use":
      return "Tento e-mail sa už používa.";
    case "auth/too-many-requests":
      return "Príliš veľa pokusov. Skús to neskôr.";
    case "auth/weak-password":
      return "Heslo musí mať aspoň 6 znakov.";
    case "auth/invalid-password":
      return "Neplatné heslo.";
    case "auth/internal-error":
      return "Interná chyba servera. Skús to neskôr.";
    case "auth/network-request-failed":
      return "Skontroluj pripojenie na internet.";
    case "auth/operation-not-allowed":
      return "Táto možnosť nie je povolená. Skontroluj Firebase nastavenia.";
    default:
      return "Neznáma chyba. Skús to znova.";
  }
}
