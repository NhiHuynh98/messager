import time
from flask import Flask, request, json
import subprocess
import ch9_crypto_chat as ct
from socket import *
import os

clientDH = clientDH = ct.gen_client_DH()
serverDH = ct.gen_server_DH()
serverSecret = 0

app = Flask(__name__)


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


def get_dh_sharedsecret():
    key = int(open('server_public_dh_key.pem').read())
    clientDH.generateSharedKey(key)
    clientDH.getSharedKey()
    clientDH.generateSharedKey(key)
    shared_key = clientDH.sharedSecret
    return (shared_key)


def get_dh_server_sharedkey():
    key = int(open('server_public_dh_key.pem').read())
    clientDH.generateSharedKey(key)
    clientDH.getSharedKey()

    clientDH.generateSharedKey(key)
    private_key = clientDH.key
    return private_key


def encrypt(plaintext, usePKI, useDH, clientSecret):
    msg = ct.encrypt(plaintext, usePKI, useDH, clientSecret)
    return msg


useClientPKI = False
useDHKey = False
serverSecret = 0


@app.route('/time')
def get_current_time():
    return {"members": ["m1", "m2"]}


sendUsingPrivate = False
sendUsingDH = False
skipEncryption = False
ciphertext = ''
results = []


@app.route('/send', methods=("GET", "POST"))
def get_message():
    if request.method == 'POST':
        global sendUsingPrivate
        global sendUsingDH
        global skipEncryption
        global ciphertext
        host = "127.0.0.1"
        port = 5000
        addr = (host, port)
        UDPSock = socket(AF_INET, SOCK_DGRAM)

        clientSecret = get_dh_sharedkey()
        receive = json.loads(request.data)

        data = str(receive.get("message")).encode()
        result = ct.check_client_command(data)
        if data == b'exit':
            os._exit(0)
        if result == 0:
            os._exit(0)
        if result == 10:
            sendUsingPrivate = False
        if result == 11:
            sendUsingPrivate = True
            skipEncryption = True
        if result == 20:
            sendUsingDH = False
        if result == 21:
            sendUsingDH = True
            skipEncryption = True
        

        ciphertext = encrypt(data, sendUsingPrivate, sendUsingDH,
                             clientSecret)
        if skipEncryption:
            ciphertext = data
            skipEncryption = False
        UDPSock.sendto(ciphertext, addr)
    else:
        print(request)

    return ciphertext


@app.route('/message', methods=["GET"])
def get_messages_from_server():
    global useClientPKI
    global useDHKey
    global serverSecret
    global results
    msg = ''
    if request.method == "GET" and ciphertext != '':
        plaintext = decrypt(ciphertext, useClientPKI, useDHKey, serverSecret)
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

        msg = str(plaintext, 'utf-8')
        if result == 0:
            os._exit(0)
        if result == 10:
            useClientPKI = False
        if result == 11:
            useClientPKI = True
            print("Client certificate found ...")
        if result == 20:
            useDHKey = False
        if result == 21:
            useDHKey = True
            print("DH Key Exchange ...")
            serverSecret = get_dh_server_sharedkey()
        if useClientPKI == True or useDHKey == True:
            print("Received secured message: " + msg)
        else:
            print("Received message: " + msg)

        results.append({
            "msg": msg,
            "result": result
        })
    return {"result": results}


if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host="0.0.0.0", port=5000, debug=True)
    # app.run(host='127.0.0.1', port=5000)
