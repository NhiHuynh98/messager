# from flask import Flask, render_template
# from flask_socketio import SocketIO, emit
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
# socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")

# @socketio.on('sendMessageToServer')
# def handle_message(message):
#     print('Received message from client:', message)
#     # Process the message as needed
#     # You can send a response back to the client if necessary
#     emit('messageFromServer', {'data': 'Message received on the server'})

# if __name__ == '__main__':
#     socketio.run(app, debug=True)

from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import ch9_crypto_chat as ct
import os
import hashlib, secrets, binascii
import time
import json


app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

# socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")
keyLengthDH = 1024

serverDH = ct.gen_server_DH(keyLengthDH)
clientDH = ct.gen_client_DH(keyLengthDH)



def get_dh_sharedkey():
    key = int(open('client_public_dh_key.pem').read())
    serverDH.generateSharedKey(key)
    serverDH.getSharedKey()
    serverDH.generateSharedKey(key)
    # serverDH.displayParameters()
    # serverDH.displayShared()
    private_key = serverDH.key
    return private_key

def get_dh_server_sharedkey():
    key = int(open('server_public_dh_key.pem').read())
    clientDH.generateSharedKey(key)
    clientDH.getSharedKey()

    clientDH.generateSharedKey(key)
    private_key = clientDH.key
    return private_key


def encrypt(plaintext, usePKI, useDH, useECC, clientSecret):
    msg = ct.encrypt(plaintext, usePKI, useDH, useECC, clientSecret)
    return msg

def decrypt(ciphertext, usePKI, useDH, useECC,serverSecret):
    # msg = ct.decrypt(ciphertext, usePKI, useDH, serverSecret)
    try:
        msg = ct.decrypt(ciphertext, usePKI, useDH, useECC, serverSecret)
    except:
        msg = ciphertext
    return msg

sendUsingPrivate = False
sendUsingDH = False
sendUsingECC = False
skipEncryption = False
ciphertext = ''
results = []

useClientPKI = False
useDHKey = False
useECCKey = False
serverSecret = 0
generate_ecc = ''
generate_rsa = ''

@socketio.on('changeKeyLengthDH')
def changeKeyLengthDH(length):
    global keyLengthDH
    global serverDH
    global clientDH
    keyLengthDH = length
    serverDH = ct.gen_server_DH(int(length))
    clientDH = ct.gen_client_DH(int(length))
    return {"success": True, "result": keyLengthDH}


@socketio.on('changeKeyLengthECC')
def changeKeyLengthECC(length):
    global keyLengthECC
    global generate_ecc
    keyLengthECC = length
    generate_ecc = ct.gen_ecc_certs(int(length))
    return {"success": True, "result": keyLengthECC}

@socketio.on('changeKeyLengthRSA')
def changeKeyLengthRSA(length):
    global keyLengthRSA
    global generate_rsa
    keyLengthRSA = length
    generate_rsa = ct.gen_rsa_certs(int(length))
    return {"success": True, "result": keyLengthRSA}


@socketio.on('changeMode')
def changeMode(mode):
    global sendUsingPrivate
    global sendUsingDH
    global sendUsingECC
    global skipEncryption
    global ciphertext

    global useClientPKI
    global useDHKey
    global useECCKey
    global serverSecret

    if mode == 'addDH':
        sendUsingDH = True
        useDHKey = True
        serverSecret = get_dh_server_sharedkey()
    if mode == 'rmDH': 
        sendUsingDH = False
        useDHKey = False
        skipEncryption = True
    if mode == 'addECC':
        sendUsingECC = True
        useECCKey = True
    if mode == 'rmECC':
        sendUsingECC = False
        useECCKey = False
        skipEncryption = True
    if mode == 'addRSA':
        sendUsingPrivate = True
        useClientPKI = True
    if mode == 'rmRSA':
        sendUsingPrivate = False
        useClientPKI = False
        skipEncryption = True

    print("RSA", sendUsingPrivate, useClientPKI)
    print("ECC", sendUsingECC, useECCKey)
    print("DH", sendUsingDH, useDHKey)
    return {"success": True, "result": mode}

@socketio.on('turnon')
def handle_turn_on(data):
    print(data)

@socketio.on('sendMessage')
def handle_message(message):
    try: 
        global sendUsingPrivate
        global sendUsingDH
        global sendUsingECC
        global skipEncryption
        global ciphertext

        global useClientPKI
        global useDHKey
        global useECCKey
        global serverSecret
        global results
        
        data = str(message).encode()

        clientSecret = get_dh_sharedkey()
        
        # result = ct.check_client_command(data)
        # if data == b'exit':
        #     os._exit(0)
        # if result == 0:
        #     os._exit(0)
        # if result == 10:
        #     sendUsingPrivate = False
        # if result == 11:
        #     sendUsingPrivate = True
        #     skipEncryption = True
        # if result == 20:
        #     sendUsingDH = False
        # if result == 21:
        #     sendUsingDH = True
        #     skipEncryption = True
        # if result == 14:
        #     sendUsingECC = True
        #     skipEncryption = True
        # if result == 15:
        #     sendUsingECC = False
        print("data", data)
        if skipEncryption:
            ciphertext = data
            skipEncryption = False
        else:
            ciphertext = encrypt(data, sendUsingPrivate, sendUsingDH, sendUsingECC, clientSecret)

        print("ciphertext", ciphertext)
        plaintext = decrypt(ciphertext, useClientPKI, useDHKey, useECCKey, serverSecret)
        # print("plaintext_descrypt", plaintext)
        # result = ct.check_server_command(plaintext)
        # print("nhi", result)
        # if result == 10:  # encryption has been disabled so no message
        #     plaintext = b'PKI Encryption disabled!'
        # elif result == 11:  # encryption enabled
        #     plaintext = b'PKI Encryption enabled!'
        #     print("Client Certificate found")
        # elif result == 20:  # dh enabled
        #     clientKey = plaintext
        #     plaintext = b'Diffie-Hellman disabled!'
        # elif result == 21:  # encryption enabled
        #     plaintext = b'Diffie-Hellman enabled!'
        # elif result == 14:
        #     plaintext = b'ECC Encryption enabled!'
        # elif result == 15:
        #     plaintext = b'ECC Encryption disabled!'

        print("dd", plaintext)
        # if (result == 14 or result == 15):
        #     msg = {
        #     'ciphertext': binascii.hexlify(bytes(plaintext[0])),
        #     'nonce': binascii.hexlify(bytes(plaintext[1])),
        #     'authTag': binascii.hexlify(bytes(plaintext[2])),
        #     'ciphertextPubKey': binascii.hexlify(bytes(plaintext[3])),
        # }
        # print("msg", msg)
        msg = plaintext.decode('utf-8') 
        # if result == 0:
        #     os._exit(0)
        # if result == 10:
        #     useClientPKI = False
        # if result == 11:
        #     useClientPKI = True
        #     print("Client certificate found ...")
        # if result == 20:
        #     useDHKey = False
        # if result == 21:
        #     useDHKey = True
        #     print("DH Key Exchange ...")
        #     serverSecret = get_dh_server_sharedkey()
        # if result == 14:
        #     useECCKey = True
        #     print("ECC Key ...")
        # if result == 15:
        #     useECCKey = False
        # if useClientPKI == True or useDHKey == True or useECCKey == True:
        #     print(msg)
        # else:
        #     print(msg)

        results.append(msg)

        # Convert each string to a valid dictionary
        converted_data = [json.loads(d.replace("'", '"')) for d in results]

        # Convert back to a valid JSON array (optional)
        json_output = json.dumps(converted_data, indent=4)

        print("results", json_output)

        socketio.emit('messageFromServer', json_output)
        return {"success": True, "message": json_output}
    except Exception as e:
        return {"success": False, "error": str(e)}
if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5000)



#  # Message Receiver - crypto_chat_server.py
# import hashlib, random, os, time
# from binascii import hexlify
# from socket import *
# from flask_cors import CORS
# # import Chapter9.ch9_crypto_chat as ct


# def get_dh_sharedsecret():
#     return
# def get_dh_sharedkey():
#     return
# def decrypt(ciphertext, usePKI, useDH, serverSecret):
#     #msg = ct.decrypt(ciphertext, usePKI, useDH, serverSecret)
#     # try:
#     #     msg = ct.decrypt(ciphertext, usePKI, useDH, serverSecret)
#     # except:
#     #     msg = ciphertext
#     # return msg
#     return 'sss'

# def main():
#     # set variables used to determine scheme
#     useClientPKI = False
#     useDHKey = False
#     serverSecret = 0
#     # set the variables used for the server components
#     key = ""
#     host = "127.0.0.1"
#     port = 5000
#     buf = 1024 * 2
#     addr = (host, port)
#     UDPSock = socket(AF_INET, SOCK_DGRAM)
#     UDPSock.bind(addr)
#     # welcome to the server message
#     print ("Waiting to receive messages...")

#     message = "Hello, server!"
#     UDPSock.sendto(message.encode(), addr)

#     # Receive data from the server
#     data, server_addr = UDPSock.recvfrom(buf)
#     print("Received:", data.decode())

#     # Close the socket
#     UDPSock.close()

#     # # listening loop
#     # while True:
#     #     # read the data sent from the client
#     #     (data, addr) = UDPSock.recvfrom(buf)
#     #     # send the data packet for decryption
#     #     plaintext = decrypt(data, useClientPKI, useDHKey, serverSecret)
#     #     # check to see if the user typed a special command such as addPKI or addDH
#     #     # result = ct.check_server_command(plaintext)
#     #     result = 10
#     #     if result == 10: # encryption has been disabled so no message
#     #         plaintext = b'PKI Encryption disabled!'
#     #     elif result == 11: # encryption enabled
#     #         plaintext = b'PKI Encryption enabled!'
#     #     elif result == 20: # dh enabled
#     #         clientKey = plaintext
#     #         plaintext = b'Diffie-Hellman disabled!'
#     #     elif result == 21: # encryption enabled
#     #         plaintext = b'Diffie-Hellman enabled!'
#     #     # messages are received encoded so you must decode the message for processing
#     #     msg = str(plaintext, 'utf-8')
#     #     # process any client special commands
#     #     if result == 0:
#     #         # no encryption
#     #         break
#     #     # if any encryption is used, change the message to 'secure'message
#     #     if useClientPKI == True or useDHKey == True:
#     #         print ("Received secured message: " + msg)
#     #     else:
#     #          print ("Received message: " + msg)
#     #          UDPSock.close()
#     #          os._exit(0)

# if __name__ == '__main__':
#     main()