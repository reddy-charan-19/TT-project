// ========== AES-256 GCM ENCRYPTION ==========
const SECRET_KEY_STR = "ThisIsASecretKeyForAES256Encrypt";
const GCM_IV_LENGTH = 12;
let cryptoKey = null;

export async function initCryptoKey() {
    if (cryptoKey) return cryptoKey;
    const keyBytes = new TextEncoder().encode(SECRET_KEY_STR);
    cryptoKey = await crypto.subtle.importKey(
        "raw", keyBytes, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]
    );
    return cryptoKey;
}

export async function encrypt(plainText) {
    await initCryptoKey();
    const iv = crypto.getRandomValues(new Uint8Array(GCM_IV_LENGTH));
    const encoded = new TextEncoder().encode(plainText);
    const ciphertext = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv, tagLength: 128 }, cryptoKey, encoded
    );
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);
    return btoa(String.fromCharCode(...combined));
}

export async function decrypt(base64Cipher) {
    if(!base64Cipher) return null;
    await initCryptoKey();
    const decoded = Uint8Array.from(atob(base64Cipher), c => c.charCodeAt(0));
    const iv = decoded.slice(0, GCM_IV_LENGTH);
    const ciphertext = decoded.slice(GCM_IV_LENGTH);
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv, tagLength: 128 }, cryptoKey, ciphertext
    );
    return new TextDecoder().decode(decrypted);
}
