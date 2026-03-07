import { subtle } from "node:crypto";

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
export async function genCookieUserSession(username, userpassword) {
    const data = new TextEncoder().encode(`${username}${userpassword}${Date.now().toString()}`);
    const hashBuffer = await subtle.digest("SHA-1", data);
    const shaHash = Array
        .from(new Uint8Array(hashBuffer))
            .map(
                (b) => b.toString(16).padStart(2, "00"))
            .join("");
    console.log(shaHash);
    return shaHash;
}