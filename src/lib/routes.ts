const webUrl = process.env.NEXT_PUBLIC_WEB_URL

export const routes = {
  home: () => `/`,
  login: () => "/login",
  register: () => "/register",
  termsOfService: () => `${webUrl}/legal/terms-of-service`,
  privacyPolicy: () => `${webUrl}/legal/privacy-policy`,
  cookiePolicy: () => `${webUrl}/legal/cookie-policy`,
}

// Locale-specific routes for all pages and subpages under [locale]
export const localeRoutes = {
  home: (locale: string) => `/${locale}`,
  notifications: (locale: string) => `/${locale}/notifications`,
  auth: {
    login: (locale: string) => `/${locale}/(auth)/login`,
    loginVerification: (locale: string, step?: string) =>
      step ? `/${locale}/(auth)/login/verification/${step}` : `/${locale}/(auth)/login/verification`,
    register: {
      root: (locale: string) => `/${locale}/(auth)/register`,
      patient: (locale: string) => `/${locale}/(auth)/register/patient`,
      provider: {
        root: (locale: string) => `/${locale}/(auth)/register/provider`,
        basicData: (locale: string) => `/${locale}/(auth)/register/provider/basic-data`,
        documentation: (locale: string) => `/${locale}/(auth)/register/provider/documentation`,
        professionalDetails: (locale: string) => `/${locale}/(auth)/register/provider/professional-details`,
      },
    },
    resetPassword: {
      root: (locale: string) => `/${locale}/(auth)/reset-password`,
      verification: (locale: string, step?: string) =>
        step
          ? `/${locale}/(auth)/reset-password/verification/${step}`
          : `/${locale}/(auth)/reset-password/verification`,
    },
  },
  payment: {
    plans: (locale: string) => `/${locale}/(payment)/plans`,
    proposal: (locale: string) => `/${locale}/(payment)/proposal`,
    subscription: {
      root: (locale: string) => `/${locale}/(payment)/subscription`,
      prePayment: (locale: string) => `/${locale}/(payment)/subscription/pre-payment`,
      paymentMethod: (locale: string) => `/${locale}/(payment)/subscription/payment-method`,
      paymentSummary: (locale: string) => `/${locale}/(payment)/subscription/payment-summary`,
    },
  },
  provider: (locale: string, provider: string) => ({
    agenda: () => `/${locale}/${provider}/agenda`,
    chat: {
      root: () => `/${locale}/${provider}/chat`,
      patient: (id: string) => `/${locale}/${provider}/chat/patient/${id}`,
    },
    consultations: {
      root: () => `/${locale}/${provider}/consultations`,
      chat: () => `/${locale}/${provider}/consultations/chat`,
      details: {
        requested: (id: string) => `/${locale}/${provider}/consultations/details/requested/${id}`,
        reschedule: (id: string) => `/${locale}/${provider}/consultations/details/reschedule/${id}`,
      },
      home: () => `/${locale}/${provider}/consultations/home`,
      newAppointment: () => `/${locale}/${provider}/consultations/new-appointment`,
      online: () => `/${locale}/${provider}/consultations/online`,
    },
    finances: {
      root: () => `/${locale}/${provider}/finances`,
      invoices: (id: string) => `/${locale}/${provider}/finances/invoices/${id}`,
      receipts: (id: string) => `/${locale}/${provider}/finances/receipts/${id}`,
    },
    myActivity: () => `/${locale}/${provider}/my-activity`,
    onlineConsultation: () => `/${locale}/${provider}/online-consultation`,
    profile: {
      root: () => `/${locale}/${provider}/profile`,
      configurations: {
        root: () => `/${locale}/${provider}/profile/configurations`,
        files: () => `/${locale}/${provider}/profile/configurations/files`,
        paymentDetails: () => `/${locale}/${provider}/profile/configurations/payment-details`,
        personal: {
          root: () => `/${locale}/${provider}/profile/configurations/personal`,
          basicData: () => `/${locale}/${provider}/profile/configurations/personal/basic-data`,
          details: () => `/${locale}/${provider}/profile/configurations/personal/details`,
          document: () => `/${locale}/${provider}/profile/configurations/personal/document`,
        },
        signature: () => `/${locale}/${provider}/profile/configurations/signature`,
      },
      public: {
        services: {
          edit: (category: string) => `/${locale}/${provider}/profile/public/services/edit/${category}`,
        },
      },
    },
    support: () => `/${locale}/${provider}/support`,
  }),
  patient: {
    root: (locale: string) => `/${locale}/(patient)`,
    // Add subroutes if/when they exist
  },
}
