import { execSync } from "child_process";
import inquirer from "inquirer";

export function getGhp(): void {
  /**
   * Fetch GitHub Access Token
   * More info:
   * https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token
   */
  let token = "";
  const regex = new RegExp(/^ghp_[A-Za-z0-9]{36}$/);
  try {
    const npmrc = execSync(`cat ~/.npmrc`, { encoding: "utf-8" });
    token = npmrc.slice(npmrc.indexOf("ghp_"), npmrc.indexOf("ghp_") + 40);
    if (!token || !regex.test(token)) {
      throw new Error("Github Access Token not found or not valid");
    }
    process.env.GITHUB_ACCESS_TOKEN = token;
    console.log("\x1b[42m%s\x1b[0m", "GitHub Access Token saved");
  } catch {
    const noToken =
      "You do not have a .npmrc file or it does not contain a token";
    const wrongFormat = "token format is not valid";
    const message = token.length === 0 ? noToken : wrongFormat;
    console.log("\x1b[42m%s\x1b[0m", message);
    inquirer
      .prompt({
        type: "input",
        name: "token",
        message: "Provide your github access token",
        validate: (input) =>
          regex.test(input) ? true : "provided token is invalid",
      })
      .then((tkn) => {
        if (!regex.test(tkn.token)) {
          throw new Error("Github Access Token not valid");
        }
        process.env.GITHUB_ACCESS_TOKEN = tkn.token;
        console.log("\x1b[42m%s\x1b[0m", "GitHub Access Token saved");
      });
  }
}
