export type Chat = {
  "version": "0.1.0",
  "name": "chat",
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "createChatRoom",
      "accounts": [
        {
          "name": "chatRoom",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "sendMessage",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "chatRoom",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "msg",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "chatRoom",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "head",
            "type": "u64"
          },
          {
            "name": "tail",
            "type": "u64"
          },
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                280
              ]
            }
          },
          {
            "name": "messages",
            "type": {
              "array": [
                {
                  "defined": "Message"
                },
                33607
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": {
              "array": [
                "u8",
                280
              ]
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unknown"
    }
  ]
};

export const IDL: Chat = {
  "version": "0.1.0",
  "name": "chat",
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "createChatRoom",
      "accounts": [
        {
          "name": "chatRoom",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "sendMessage",
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "chatRoom",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "msg",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "chatRoom",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "head",
            "type": "u64"
          },
          {
            "name": "tail",
            "type": "u64"
          },
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                280
              ]
            }
          },
          {
            "name": "messages",
            "type": {
              "array": [
                {
                  "defined": "Message"
                },
                33607
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "data",
            "type": {
              "array": [
                "u8",
                280
              ]
            }
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unknown"
    }
  ]
};