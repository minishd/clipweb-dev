export async function sha256(plaintext: string): Promise<string> {
  const data = new TextEncoder().encode(plaintext);
  const hashBuf = await window.crypto.subtle.digest("SHA-256", data);
  const hashStr = Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashStr;
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
