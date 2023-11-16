export type Tictactoe = {
  "version": "0.1.0",
  "name": "tictactoe",
  "docs": [
    "Game State",
    "0 - Waiting",
    "1 - XMove",
    "2 - OMove",
    "3 - XWon",
    "4 - OWon",
    "5 - Draw"
  ],
  "instructions": [
    {
      "name": "initializeDashboard",
      "accounts": [
        {
          "name": "dashboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "playerX",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "dashboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "playerJoin",
      "accounts": [
        {
          "name": "playerO",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "playerMove",
      "accounts": [
        {
          "name": "player",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "xOrO",
          "type": "u8"
        },
        {
          "name": "playerMove",
          "type": "u8"
        }
      ]
    },
    {
      "name": "status",
      "accounts": [
        {
          "name": "dashboard",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "dashboard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameCount",
            "type": "u64"
          },
          {
            "name": "latestGame",
            "type": "publicKey"
          },
          {
            "name": "address",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "keepAlive",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "playerX",
            "type": "publicKey"
          },
          {
            "name": "playerO",
            "type": "publicKey"
          },
          {
            "name": "gameState",
            "type": "u8"
          },
          {
            "name": "board",
            "type": {
              "array": [
                "u8",
                9
              ]
            }
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "GameStatus",
      "fields": [
        {
          "name": "keepAlive",
          "type": {
            "array": [
              "u64",
              2
            ]
          },
          "index": false
        },
        {
          "name": "playerX",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "playerO",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "gameState",
          "type": "u8",
          "index": false
        },
        {
          "name": "board",
          "type": {
            "array": [
              "u8",
              9
            ]
          },
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "Wrongdashboard",
      "msg": "Wrong dashboard"
    },
    {
      "code": 6002,
      "name": "Gamestate",
      "msg": "Wrong expected state"
    },
    {
      "code": 6003,
      "name": "Initialized",
      "msg": "Dashboard already initialized"
    },
    {
      "code": 6004,
      "name": "UnexpectedValue",
      "msg": "Unexpected value"
    },
    {
      "code": 6005,
      "name": "Illegalmove",
      "msg": "Illegal move"
    }
  ]
};

export const IDL: Tictactoe = {
  "version": "0.1.0",
  "name": "tictactoe",
  "docs": [
    "Game State",
    "0 - Waiting",
    "1 - XMove",
    "2 - OMove",
    "3 - XWon",
    "4 - OWon",
    "5 - Draw"
  ],
  "instructions": [
    {
      "name": "initializeDashboard",
      "accounts": [
        {
          "name": "dashboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "playerX",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "dashboard",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "playerJoin",
      "accounts": [
        {
          "name": "playerO",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "playerMove",
      "accounts": [
        {
          "name": "player",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "xOrO",
          "type": "u8"
        },
        {
          "name": "playerMove",
          "type": "u8"
        }
      ]
    },
    {
      "name": "status",
      "accounts": [
        {
          "name": "dashboard",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "dashboard",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameCount",
            "type": "u64"
          },
          {
            "name": "latestGame",
            "type": "publicKey"
          },
          {
            "name": "address",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "keepAlive",
            "type": {
              "array": [
                "u64",
                2
              ]
            }
          },
          {
            "name": "playerX",
            "type": "publicKey"
          },
          {
            "name": "playerO",
            "type": "publicKey"
          },
          {
            "name": "gameState",
            "type": "u8"
          },
          {
            "name": "board",
            "type": {
              "array": [
                "u8",
                9
              ]
            }
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "GameStatus",
      "fields": [
        {
          "name": "keepAlive",
          "type": {
            "array": [
              "u64",
              2
            ]
          },
          "index": false
        },
        {
          "name": "playerX",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "playerO",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "gameState",
          "type": "u8",
          "index": false
        },
        {
          "name": "board",
          "type": {
            "array": [
              "u8",
              9
            ]
          },
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "You are not authorized to perform this action."
    },
    {
      "code": 6001,
      "name": "Wrongdashboard",
      "msg": "Wrong dashboard"
    },
    {
      "code": 6002,
      "name": "Gamestate",
      "msg": "Wrong expected state"
    },
    {
      "code": 6003,
      "name": "Initialized",
      "msg": "Dashboard already initialized"
    },
    {
      "code": 6004,
      "name": "UnexpectedValue",
      "msg": "Unexpected value"
    },
    {
      "code": 6005,
      "name": "Illegalmove",
      "msg": "Illegal move"
    }
  ]
};
