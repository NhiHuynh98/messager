# Chat Encryption Helper - ch9_crypto_chat.py
import os
import base64
import json
from Crypto.Cipher import PKCS1_OAEP, AES
# from Crypto.PublicKey import RSA, ECC
from Crypto.PublicKey import RSA, ECC
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Random import get_random_bytes
from binascii import hexlify, unhexlify
from base64 import b64encode, b64decode
import diffie_hellman as dh
from ecpy.curves import Curve, Point
import random
from tinyec import registry
import hashlib, secrets, binascii
import ast
# encryption method used by all calls


def encrypt(message, usePKI, useDH, useECC, dhSecret):
    if usePKI == True:
        message = encrypt_rsa(message)
    if useDH == True:
        message = encrypt_dh(message, dhSecret)
    if useECC == True:
        message = encrypt_ecc(message)
    return message
# decryption method used by all calls


def decrypt(message, usePKI, useDH, useECC, dhSecret):
    print("nhi", useECC)
    if useDH == True:
        message = decrypt_dh(message, dhSecret)
    if usePKI == True:
        message = decrypt_rsa(message)
    if useECC == True:
        message = decrypt_ecc(message)
    return message


def remove_dh_certs():
    try:
        os.remove("client_private_dh_key.pem")
        os.remove("client_public_dh_key.pem")
        os.remove("server_private_dh_key.pem")
        os.remove("server_public_dh_key.pem")
    except:
        return 0
# decryption method used by all calls

# generate Diffie-Hellman certificates for client


def gen_client_DH():
    clientDH = dh.DiffieHellman(2, 17, 1024)
    privateKey = str(clientDH.privateKey).encode()
    fd = open("client_private_dh_key.pem", "wb")
    fd.write(privateKey)
    fd.close()
    publicKey = str(clientDH.publicKey).encode()
    fd = open("client_public_dh_key.pem", "wb")
    fd.write(publicKey)
    fd.close()
    clientDHSet = clientDH
    return clientDH

# generate Diffie-Hellman certificates for server


def gen_server_DH():
    svrDH = dh.DiffieHellman(2, 17, 1024)
    privateKey = str(svrDH.privateKey).encode()
    fd = open("server_private_dh_key.pem", "wb")
    fd.write(privateKey)
    fd.close()
    publicKey = str(svrDH.publicKey).encode()
    fd = open("server_public_dh_key.pem", "wb")
    fd.write(publicKey)
    fd.close()
    key = (open('server_public_dh_key.pem').read())
    serverDHSet = svrDH
    return svrDH

# encrypt using Diffie-Hellman - ECC


def encrypt_dh(plaintext, dhSecret):
    ciphertext = encrypt_AES_GCM(plaintext, dhSecret)
    ciphertext = ciphertext.encode()
    return ciphertext


def decrypt_dh(ciphertext, dhSecret):
    ciphertext = ciphertext.decode('utf-8')
    plaintext = decrypt_AES_GCM(ciphertext, dhSecret)
    return plaintext


def ch9_decrypt(message, usePKI, useDH, dhSecret):
    if usePKI == True:
        message = ch9_decrypt_rsa(message)
    return message

def message_to_point(curve: Curve, message: bytes) -> Point:
    # Number of bytes to represent a coordinate of a point
    coordinate_size = curve.size // 8
    # Minimum number of bytes for the padding. We need at least 1 byte so that
    # we can try different values and find a valid point. We also add an extra
    # byte as a delimiter between the message and the padding (see below)
    min_padding_size = 2
    # Maximum number of bytes that we can encode
    max_message_size = coordinate_size - min_padding_size

    if len(message) > max_message_size:
        raise ValueError('Message too long')

    # Add a padding long enough to ensure that the resulting padded message has
    # the same size as a point coordinate. Initially the padding is all 0
    padding_size = coordinate_size - len(message)
    padded_message = bytearray(message) + b'\0' * padding_size

    # Put a delimiter between the message and the padding, so that we can
    # properly remove the padding at decrypt time
    padded_message[len(message)] = 0xff

    while True:
        # Convert the padded message to an integer, which may or may not be a
        # valid x-coordinate
        x = int.from_bytes(padded_message, 'little')
        # Calculate the corresponding y-coordinate (if it exists)
        y = curve.y_recover(x)
        if y is None:
            # x was not a valid coordinate; increment the padding and try again
            padded_message[-1] += 1
        else:
            # x was a valid coordinate; return the point (x, y)
            return Point(x, y, curve)
        
curve = registry.get_curve('brainpoolP256r1')
privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g


def encrypt_AES_GCM1(msg, secretKey):
    aesCipher = AES.new(secretKey, AES.MODE_GCM)
    ciphertext, authTag = aesCipher.encrypt_and_digest(msg)
    return ciphertext, aesCipher.nonce, authTag
    # return {'ciphertext': ciphertext, 'nonce': aesCipher.nonce, 'authTag': authTag }

def decrypt_AES_GCM1(ciphertext, nonce, authTag, secretKey):
    aesCipher = AES.new(secretKey, AES.MODE_GCM, nonce)
    plaintext = aesCipher.decrypt_and_verify(ciphertext, authTag)
    print("nhitest1", plaintext)
    return plaintext

def ecc_point_to_256_bit_key(point):
    sha = hashlib.sha256(int.to_bytes(point.x, 32, 'big'))
    sha.update(int.to_bytes(point.y, 32, 'big'))
    return sha.digest()

def decrypt_ecc(encryptedMsg):
    (ciphertext, nonce, authTag, ciphertextPubKey) = encryptedMsg
    print("decrypt_ecc1", nonce)
    print("decrypt_ecc1", authTag)
    print("decrypt_ecc1", ciphertextPubKey)
    sharedECCKey = privKey * ciphertextPubKey
    print("sharedECCKey", sharedECCKey)
    secretKey = ecc_point_to_256_bit_key(sharedECCKey)
    print("secretKey", secretKey)
    plaintext = decrypt_AES_GCM1(ciphertext, nonce, authTag, secretKey)
    print("nhitest", plaintext)
    return plaintext

def encrypt_ecc(msg):
    ciphertextPrivKey = secrets.randbelow(curve.field.n)
    sharedECCKey = ciphertextPrivKey * pubKey
    secretKey = ecc_point_to_256_bit_key(sharedECCKey)
    data = encrypt_AES_GCM(msg, secretKey)
    my_dict = ast.literal_eval(data)
    ciphertextPubKey = ciphertextPrivKey * curve.g
    return (my_dict['ciphertext'], my_dict['nonce'], my_dict['tag'], ciphertextPubKey)

def gen_ecc_certs():
    # key = ECC.generate(curve='P-256')
    # f = open('myprivatekey.pem','wt')
    # f.write(key.export_key(format='PEM'))
    # f.close()
    # f = open('myprivatekey.pem','rt')
    # key = ECC.import_key(f.read())
    # print (key)
    key = ECC.generate(curve='P-256') #3072 RSA 
    private_key = key.export_key(format='PEM')
    f = open('ecc_private_key.pem','wt')
    f.write(private_key)
    f.close()

    public_key = key.public_key().export_key(format='PEM')
    f = open('ecc_public_key.pem','wt')
    f.write(public_key)
    f.close()

# # generate ECC certs
# def gen_ecc_certs():
#     key = ECC.generate(curve='P-256')
#     f = open('myprivatekey.pem', 'wt')
#     f.write(key.export_key(format='PEM'))
#     f.close()
#     f = open('myprivatekey.pem', 'rt')
#     key = ECC.import_key(f.read())
# # encrypt using AES-GCM


def encrypt_AES_GCM(msg, secretKey):
    aesCipher = AES.new(secretKey, AES.MODE_GCM)
    ct, authTag = aesCipher.encrypt_and_digest(msg)
    ct = hexlify(ct)
    ct = ct.decode('utf-8')
    authTag = hexlify(authTag)
    authTag = authTag.decode('utf-8')
    noncea = hexlify(aesCipher.nonce)
    nonce = noncea.decode('utf-8')
    ciphertext = json.dumps({'nonce': nonce, 'ciphertext': ct,
                             'tag': authTag})
    return ciphertext

def decrypt_AES_GCM(encryptedMsg, secretKey):
    b64 = json.loads(encryptedMsg)
    nonce = str(b64['nonce'])
    nonce = nonce.encode()
    nonce = unhexlify(nonce)
    ct = str(b64['ciphertext'])
    ct = ct.encode()
    ct = unhexlify(ct)
    authTag = str(b64['tag'])
    authTag = authTag.encode()
    authTag = unhexlify(authTag)
    aesCipher = AES.new(secretKey, AES.MODE_GCM, nonce)
    nonce = b64encode(aesCipher.nonce).decode('utf-8')
    plaintext = aesCipher.decrypt_and_verify(ct, authTag)
    return plaintext

# encrypt using AES-CTR


def encrypt_AES_CTR(msg, secretKey):
    cipher = AES.new(secretKey, AES.MODE_CTR)
    ct_bytes = cipher.encrypt(msg)
    nonce = b64encode(cipher.nonce).decode('utf-8')
    ct = b64encode(ct_bytes).decode('utf-8')
    ciphertext = json.dumps({'nonce': nonce, 'ciphertext': ct})
    return ciphertext
# decrypt using AES-CTR


def decrypt_AES_CTR(msg, secretKey):
    b64 = json.loads(msg)
    nonce = b64decode(b64['nonce'])
    ct = b64decode(b64['ciphertext'])
    cipher = AES.new(secretKey, AES.MODE_CTR, nonce=nonce)
    plaintext = cipher.decrypt(ct)
    return plaintext


def gen_rsa_certs():
    # Generate a public/private key pair using 4096 bits key length (512bytes)
    new_key = RSA.generate(4096, e=65537)
    print("newkey", new_key)
    # The private key in PEM format
    private_key = new_key.exportKey("PEM")
    # The public key in PEM Format
    public_key = new_key.publickey().exportKey("PEM")
    fd = open("client_private_key.pem", "wb")
    fd.write(private_key)
    fd.close()
    fd = open("client_public_key.pem", "wb")
    fd.write(public_key)
    fd.close()


# decrypt using RSA
def decrypt_rsa(ciphertext):
    key = RSA.importKey(open('client_private_key.pem').read())
    cipher = PKCS1_OAEP.new(key)
    plaintext = cipher.decrypt(ciphertext)
    return plaintext
# encrypt using RSA


def encrypt_rsa(message):
    key = RSA.importKey(open('client_public_key.pem').read())
    cipher = PKCS1_OAEP.new(key)
    ciphertext = cipher.encrypt(message)
    return ciphertext
# check client commands


# check client commands
def check_client_command(data):
    if data == b'addPKI':
        gen_rsa_certs()
        return 11
    elif data == b'removePKI':
        usePKI = False
        return 10
    elif data == b'addDH':
        return 21
    elif data == b'removeDH':
        usePKI = False
        return 20
    elif data == b'addECC':
        gen_ecc_certs()
        return 14
    elif data == b'removeECC':
        usePKI = False
        return 15
    return 1

# check server commands


# check server commands
def check_server_command(data):
    if data == b'addPKI':
        return 11
    if data == b'removePKI':
        useDH = False
        return 10
    if data == b'addDH':
        return 21
    if data == b'removeDH':
        useDH = False
        return 20
    if data == b'addECC':
        return 14
    if data == b'removeECC':
        useDH = False
        return 15
    return 1
