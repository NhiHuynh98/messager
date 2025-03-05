import time
import rsa
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import serialization
import matplotlib.pyplot as plt
import numpy as np

# Function to measure RSA encryption and decryption time
def rsa_encrypt_decrypt(key_size):
    # Generate RSA key pair
    public_key, private_key = rsa.newkeys(key_size)
    
    # Message to encrypt
    message = b"Hello, this is a test message for RSA!"
    
    # Encrypting the message
    start_time = time.time()
    encrypted_message = rsa.encrypt(message, public_key)
    encryption_time = time.time() - start_time
    
    # Decrypting the message
    start_time = time.time()
    decrypted_message = rsa.decrypt(encrypted_message, private_key)
    decryption_time = time.time() - start_time
    
    return encryption_time, decryption_time

# Function to measure ECC encryption and decryption time
def ecc_encrypt_decrypt(key_size):
    # Generate ECC key pair
    if key_size == 244:
        curve = ec.SECT283K1()
    elif key_size == 256:
        curve = ec.SECP256R1()
    elif key_size == 384:
        curve = ec.SECP384R1()
    
    private_key = ec.generate_private_key(curve)
    public_key = private_key.public_key()

    # Message to encrypt
    message = b"Hello, this is a test message for ECC!"
    
    # Encrypting the message
    start_time = time.time()
    shared_key = private_key.exchange(ec.ECDH(), public_key)
    encryption_time = time.time() - start_time
    
    # Decrypting the message
    start_time = time.time()
    decrypted_message = shared_key  # As ECC is not typically used for direct encryption/decryption
    decryption_time = time.time() - start_time
    
    return encryption_time, decryption_time

# Key sizes to compare
rsa_key_sizes = [2048, 3072, 4096]
ecc_key_sizes = [244, 256, 384]

# List to store results
rsa_encryption_times = []
rsa_decryption_times = []
ecc_encryption_times = []
ecc_decryption_times = []

# Perform comparisons for RSA
for size in rsa_key_sizes:
    enc_time, dec_time = rsa_encrypt_decrypt(size)
    rsa_encryption_times.append(enc_time)
    rsa_decryption_times.append(dec_time)

# Perform comparisons for ECC
for size in ecc_key_sizes:
    enc_time, dec_time = ecc_encrypt_decrypt(size)
    ecc_encryption_times.append(enc_time)
    ecc_decryption_times.append(dec_time)

# Plot the results
x_rsa = np.array(rsa_key_sizes)
x_ecc = np.array(ecc_key_sizes)

plt.figure(figsize=(10, 6))

# RSA Plot
plt.plot(x_rsa, rsa_encryption_times, label="RSA Encryption", marker='o', color='blue')
plt.plot(x_rsa, rsa_decryption_times, label="RSA Decryption", marker='o', color='red')

# ECC Plot
plt.plot(x_ecc, ecc_encryption_times, label="ECC Encryption", marker='o', color='green')
plt.plot(x_ecc, ecc_decryption_times, label="ECC Decryption", marker='o', color='orange')

plt.xlabel('Key Size (bits)')
plt.ylabel('Time (seconds)')
plt.title('Comparison of RSA vs ECC Encryption and Decryption Times')
plt.legend()
plt.grid(True)
plt.show()
