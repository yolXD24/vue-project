// decryt password ,this will be d used for safety purposes
const crypto = require("crypto");
exports.secret_key = () => {
    const algorithm = "aes-192-cbc";
    const password = "secret";
    const key = crypto.scryptSync(password, "salt", 24);
    const iv = Buffer.alloc(16, 0); // Initialization vector.
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const encrypted = "f28c9c7ffb2505322d90f2ed785b73db";
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};