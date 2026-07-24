// src: https://github.com/marcellosso/better-auth-localization/tree/main/src/translations

export const translations = {
  // tba: override for "en"
  
  ja: {
    // adhoc
    VALIDATION_ERROR: "検証エラー",

    // User related errors
    USER_NOT_FOUND: "ユーザーが見つかりません",
    FAILED_TO_CREATE_USER: "ユーザーの作成に失敗しました",
    FAILED_TO_UPDATE_USER: "ユーザーの更新に失敗しました",
    USER_ALREADY_EXISTS: "ユーザーは既に存在します",
    USER_EMAIL_NOT_FOUND: "ユーザーのメールアドレスが見つかりません",
    USER_ALREADY_HAS_PASSWORD:
      "ユーザーは既にパスワードを設定しています。アカウントを削除するには、そのパスワードを入力してください。",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
      "ユーザーは既に存在します。別のメールアドレスを使用してください。",

    // Session related errors
    FAILED_TO_CREATE_SESSION: "セッションの作成に失敗しました",
    FAILED_TO_GET_SESSION: "セッションの取得に失敗しました",
    SESSION_EXPIRED:
      "セッションが期限切れです。この操作を実行するには再度ログインしてください。",

    // Authentication errors
    INVALID_PASSWORD: "パスワードが無効です",
    INVALID_EMAIL: "メールアドレスが無効です",
    INVALID_EMAIL_OR_PASSWORD: "メールアドレスまたはパスワードが無効です",
    INVALID_TOKEN: "トークンが無効です",
    EMAIL_NOT_VERIFIED: "メールアドレスが確認されていません",
    CREDENTIAL_ACCOUNT_NOT_FOUND: "認証アカウントが見つかりません",

    // Password related errors
    PASSWORD_TOO_SHORT: "パスワードが短すぎます",
    PASSWORD_TOO_LONG: "パスワードが長すぎます",

    // Social auth errors
    SOCIAL_ACCOUNT_ALREADY_LINKED: "アカウントは既に連携済みです",
    PROVIDER_NOT_FOUND: "プロバイダーが見つかりません",
    ID_TOKEN_NOT_SUPPORTED: "id_tokenはサポートされていません",
    FAILED_TO_GET_USER_INFO: "ユーザー情報の取得に失敗しました",

    // Account management errors
    EMAIL_CAN_NOT_BE_UPDATED: "メールアドレスを更新できません",
    FAILED_TO_UNLINK_LAST_ACCOUNT: "最後のアカウントの連携を解除できません",
    ACCOUNT_NOT_FOUND: "アカウントが見つかりません",

    // Two Factor related errors
    OTP_NOT_ENABLED: "ワンタイムパスワードが有効になっていません",
    OTP_HAS_EXPIRED: "ワンタイムパスワードの有効期限が切れています",
    TOTP_NOT_ENABLED: "時間ベースのワンタイムパスワードが有効になっていません",
    TWO_FACTOR_NOT_ENABLED: "二要素認証が有効になっていません",
    BACKUP_CODES_NOT_ENABLED: "バックアップコードが有効になっていません",
    INVALID_BACKUP_CODE: "無効なバックアップコード",
    INVALID_CODE: "無効なコード",
    TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE:
      "試行回数が多すぎます。新しいコードをリクエストしてください。",
    INVALID_TWO_FACTOR_COOKIE: "無効な二要素認証クッキー"
  }
};