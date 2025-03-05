import time
import matplotlib.pyplot as plt
from cryptography.hazmat.primitives.asymmetric import rsa, ec
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
import os

# Key Lengths to Test for RSA
key_sizes = [2048, 3072, 4096]

#Key Lengths to Test for ECC
# RSA: 1024, 2048, 3072, 4096, 7680

# key_sizes_ecc = [160, 244, 256, 384, 512]

# Function to measure RSA encryption & decryption
def rsa_benchmark(key_size):
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=key_size
    )
    public_key = private_key.public_key()
    message = os.urandom(32)
    
    start_enc = time.time()
    ciphertext = public_key.encrypt(
        message,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    enc_time = time.time() - start_enc
    
    start_dec = time.time()
    decrypted = private_key.decrypt(
        ciphertext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    dec_time = time.time() - start_dec
    
    return enc_time, dec_time

# Function to measure ECC encryption & decryption
def ecc_benchmark():
    private_key = ec.generate_private_key(ec.SECP256R1())
    public_key = private_key.public_key()
    message = os.urandom(32)
    
    start_enc = time.time()
    shared_key = private_key.exchange(ec.ECDH(), public_key)
    enc_time = time.time() - start_enc
    
    start_dec = time.time()
    derived_key = HKDF(
        algorithm=hashes.SHA256(),
        length=32,
        salt=None,
        info=b"key agreement",
    ).derive(shared_key)
    dec_time = time.time() - start_dec
    
    return enc_time, dec_time

# Run benchmarks
rsa_times = [rsa_benchmark(size) for size in key_sizes]
ecc_times = [ecc_benchmark() for _ in key_sizes]

# Visualization
labels = [f"RSA-{size}" for size in key_sizes] + [f"ECC-{size}" for size in key_sizes]
enc_times = [t[0] for t in rsa_times] + [t[0] for t in ecc_times]
dec_times = [t[1] for t in rsa_times] + [t[1] for t in ecc_times]

fig, ax = plt.subplots()
ax.bar(labels, enc_times, color=['blue', 'blue', 'blue', 'green', 'green', 'green'])
ax.set_ylabel("Time (seconds)")
ax.set_title("Encryption Time Comparison")
plt.xticks(rotation=45)
plt.show()

fig, ax = plt.subplots()
ax.bar(labels, dec_times, color=['blue', 'blue', 'blue', 'green', 'green', 'green'])
ax.set_ylabel("Time (seconds)")
ax.set_title("Decryption Time Comparison")
plt.xticks(rotation=45)
plt.show()
