import { account } from "@providers/AppwriteProvider";
import { ID, type Models } from "appwrite";
import { ref } from "vue";

export const AuthStore = new (class {
  #guard = ref<boolean>(false);
  #user = ref<Models.User | null>(null);

  constructor() {
    account
      .get()
      .then((user) => {
        this.#user.value = user;
        this.#guard.value = false;
      })
      .catch(() => {
        this.#user.value = null;
        this.#guard.value = true;
      });
  }

  get guard() {
    return this.#guard;
  }

  get user() {
    return this.#user;
  }

  async signIn(credentials: { email: string; password: string }) {
    const session = await account.createEmailPasswordSession({
      email: credentials.email,
      password: credentials.password,
    });

    this.#user.value = await account.get();
    this.#guard.value = !this.#user.value;

    return session;
  }

  async signUp(credentials: { email: string; password: string }) {
    const user = await account.create({
      userId: ID.unique(),
      email: credentials.email,
      password: credentials.password,
    });

    this.#user.value = user;

    return user;
  }

  async signOut() {
    await account.deleteSession({ sessionId: "current" });

    this.#user.value = null;
  }

  toggleGuard(open?: boolean) {
    this.#guard.value = open ?? !this.#guard.value;
  }

  guardThis<T>(callback: () => T): T | { error: Error } {
    if (!this.#user.value) {
      this.#guard.value = true;

      return { error: new Error("401: You are unauthorized") };
    }

    return callback();
  }
})();
