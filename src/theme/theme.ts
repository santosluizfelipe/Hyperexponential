export const theme = {
  colors: {
    text: "#17202a",
    textSecondary: "#677281",
    textMuted: "#526071",
    page: "#f7f8fb",
    surface: "#ffffff",
    surfaceHover: "#eef7f4",
    border: "#dde3ea",
    borderStrong: "#cfd6df",
    borderSoft: "#e3e8ee",
    borderSubtle: "#ecf0f4",
    panelBorder: "#e6ebf0",
    primary: "#1a67b3",
    primaryFocus: "rgb(26 103 179 / 18%)",
    success: "#17633a",
    successStrong: "#145c37",
    successBackground: "#dff5e8",
    successBackgroundSoft: "#e5f6ee",
    warning: "#744000",
    warningStrong: "#7a4300",
    warningBackground: "#fff4e3",
    warningBackgroundSoft: "#fff0d6",
    danger: "#8a2418",
    dangerStrong: "#c63d2f",
    dangerBorder: "#d65244",
    dangerBackground: "#ffe9e6",
    info: "#174e85",
    infoBackground: "#e7f1ff",
    inverse: "#ffffff",
    inverseMuted: "#dce3ea",
    overlay: "rgb(23 32 42 / 58%)",
    inverseBorder: "rgb(255 255 255 / 16%)",
    bandMinimum: "#f0b65a",
    bandMidpoint: "#4f9f70",
    bandMaximum: "#dd6b58"
  },
  shadows: {
    dropdown: "0 12px 30px rgb(23 32 42 / 14%)",
    tooltip: "0 12px 30px rgb(23 32 42 / 22%)",
    modal: "0 24px 64px rgb(23 32 42 / 24%)"
  }
} as const;

export type AppTheme = typeof theme;
