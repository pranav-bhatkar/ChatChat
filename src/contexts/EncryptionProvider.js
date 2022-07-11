import React, { useContext } from 'react'
import crypto from "crypto";

const EncryptionContext = React.createContext()

export function useEncryption() {
  return useContext(EncryptionContext)
}

export function EncryptionProvider({ children }) {
  function generateKeys(id) {
    const user = crypto.createECDH('secp256k1');
  user.setPrivateKey(
    crypto.createHash('sha256').update(id, 'utf8').digest()
    );
    const pubkey = user.getPublicKey().toString('base64');
    return pubkey;
  }
  async function encryptMessage(id, text, pubkey) {
  
const user = crypto.createECDH('secp256k1');

try{
user.setPrivateKey(
  crypto.createHash('sha256').update(id, 'utf8').digest()
);
//const userPublicKeyBase64 = user.getPublicKey().toString('base64');
}
catch(err){
  console.log(err)
}
const userSharedKey = await user.computeSecret(pubkey, 'base64', 'hex');
const IV = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(
  'aes-256-gcm',
  Buffer.from(userSharedKey, 'hex'),
  IV
);

let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');

const auth_tag = cipher.getAuthTag().toString('hex');

const payload = IV.toString('hex') + encrypted + auth_tag;
  return payload;
  }
  async function decryptMessage(id, payload, pubkey) {
  
const user = crypto.createECDH('secp256k1');

try{
user.setPrivateKey(
  crypto.createHash('sha256').update(id, 'utf8').digest()
);
//const userPublicKeyBase64 = user.getPublicKey().toString('base64');
}
catch(err){
  console.log(err)
}
let userSharedKey;
   try{
 userSharedKey = user.computeSecret(pubkey, 'base64', 'hex');
}catch(err){
  console.log(err)
}
const payload64 = Buffer.from(payload, 'hex').toString('base64');

//Bob will do from here
const received_payload = Buffer.from(payload64, 'base64').toString('hex');

const received_iv = received_payload.substr(0, 32);
const received_encrypted = received_payload.substr(32, received_payload.length - 32 - 32);
const received_auth_tag = received_payload.substr(received_payload.length - 32, 32);
try {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(userSharedKey, 'hex'),
    Buffer.from(received_iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(received_auth_tag, 'hex'));

  let decrypted = decipher.update(received_encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
} 
catch (error) {
  console.log(error.message);
}


  }
 
  const value = {
    encryptMessage,
    decryptMessage,
    generateKeys
  }
  return (
    <EncryptionContext.Provider value={value}>
      {children}
    </EncryptionContext.Provider>
  )
}