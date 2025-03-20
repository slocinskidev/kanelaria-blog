import messages from "./dictionaries/pl.json";

type Messages = typeof messages;

declare module "next-intl" {
  interface AppConfig {
    Messages: Messages;
  }
}

declare global {
  interface IntlMessages extends Messages {}
}
