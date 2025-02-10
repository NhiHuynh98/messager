# Message Receiver - crypto_chat_server.py
import hashlib
import random
import os
import time
from binascii import hexlify
from socket import *
import ch9_crypto_chat as ct

serverDH = ct.gen_server_DH()
serverSecret = 0


def get_dh_sharedsecret():
    key = int(open('client_public_dh_key.pem').read())
    serverDH.generateSharedKey(key)
    serverDH.getSharedKey()
    serverDH.generateSharedKey(key)
    # serverDH.displayParameters()
    # serverDH.displayShared()
    return (serverDH.sharedSecret)


def get_dh_sharedkey():
    key = int(open('client_public_dh_key.pem').read())
    serverDH.generateSharedKey(key)
    serverDH.getSharedKey()
    serverDH.generateSharedKey(key)
    # serverDH.displayParameters()
    # serverDH.displayShared()
    private_key = serverDH.key
    return private_key


def decrypt(ciphertext, usePKI, useDH, serverSecret):
    # msg = ct.decrypt(ciphertext, usePKI, useDH, serverSecret)
    try:
        msg = ct.decrypt(ciphertext, usePKI, useDH, serverSecret)
    except:
        msg = ciphertext
    return msg


def main():
    # set variables used to determine scheme
    useClientPKI = False
    useDHKey = False
    serverSecret = 0
    # set the variables used for the server components
    key = ""
    host = ""
    port = 5000
    buf = 1024 * 2
    addr = (host, port)
    UDPSock = socket(AF_INET, SOCK_DGRAM)
    UDPSock.bind(addr)
    # welcome to the server message
    print("Waiting to receive messages...")
    print(addr)
    print(UDPSock)
    # listening loop
    while True:
        # read the data sent from the client
        (data, addr) = UDPSock.recvfrom(buf)
        # send the data packet for decryption
        plaintext = decrypt(data, useClientPKI, useDHKey, serverSecret)
        # if useClientPKI == True or useDHKey == True:
        #     plaintext = ct.decrypt_rsa(data)
        # else:
        #     plaintext = decrypt(data, useClientPKI, useDHKey, serverSecret)
        # check to see if the user typed a special command such as addPKI or addDH
        result = ct.check_server_command(plaintext)
        if result == 10:  # encryption has been disabled so no message
            plaintext = b'PKI Encryption disabled!'
        elif result == 11:  # encryption enabled
            plaintext = b'PKI Encryption enabled!'
            print("Client Certificate found")
        elif result == 20:  # dh enabled
            clientKey = plaintext
            plaintext = b'Diffie-Hellman disabled!'
        elif result == 21:  # encryption enabled
            plaintext = b'Diffie-Hellman enabled!'

        # messages are received encoded so you must decode the message
        msg = str(plaintext, 'utf-8')
        # process any client special commands
        if result == 0:
            # no encryption
            break
        if result == 10:
            # turn off the use of PKI
            useClientPKI = False
        if result == 11:
            # turn on the use of PKI
            useClientPKI = True
            # let the user know PKI is certs are found
            print("Client certificate found ...")
        if result == 20:
            # turn off Diffie-Hellman
            useDHKey = False
        if result == 21:
            # turn on Diffie-Hellman
            useDHKey = True
            print("DH Key Exchange ...")
            serverSecret = get_dh_sharedkey()
        # if any encryption is used, change the message to 'secure'message
        if useClientPKI == True or useDHKey == True:
            print("Received secured message: " + msg)
        else:
            print("Received message: " + msg)

    UDPSock.close()
    os._exit(0)


if __name__ == '__main__':
    main()
