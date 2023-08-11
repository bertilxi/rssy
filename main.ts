import { main } from "./src/main.ts";

if (import.meta.main) {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
}
