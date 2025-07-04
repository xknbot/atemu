/**
 * Smart contract configurations for Starknet
 */

import { CONTRACTS, ENVIRONMENT } from '@/lib/constants';

// Contract ABI types
export interface ContractConfig {
  address: string;
  abi: any[];
}

// Current network configuration
export const CURRENT_NETWORK = ENVIRONMENT.IS_PRODUCTION ? 'MAINNET' : 'TESTNET';

// Get contract addresses for current network
export const CONTRACT_ADDRESSES = CONTRACTS[CURRENT_NETWORK];

// ETH Token Contract
export const ETH_CONTRACT: ContractConfig = {
  address: CONTRACT_ADDRESSES.ETH,
  abi: [
    {
      name: "balanceOf",
      type: "function",
      inputs: [{ name: "account", type: "felt" }],
      outputs: [{ name: "balance", type: "Uint256" }]
    },
    {
      name: "transfer",
      type: "function",
      inputs: [
        { name: "recipient", type: "felt" },
        { name: "amount", type: "Uint256" }
      ],
      outputs: [{ name: "success", type: "felt" }]
    },
    {
      name: "approve",
      type: "function",
      inputs: [
        { name: "spender", type: "felt" },
        { name: "amount", type: "Uint256" }
      ],
      outputs: [{ name: "success", type: "felt" }]
    },
    {
      name: "allowance",
      type: "function",
      inputs: [
        { name: "owner", type: "felt" },
        { name: "spender", type: "felt" }
      ],
      outputs: [{ name: "remaining", type: "Uint256" }]
    }
  ]
};

// STRK Token Contract
export const STRK_CONTRACT: ContractConfig = {
  address: CONTRACT_ADDRESSES.STRK,
  abi: [
    {
      name: "balanceOf",
      type: "function",
      inputs: [{ name: "account", type: "felt" }],
      outputs: [{ name: "balance", type: "Uint256" }]
    },
    {
      name: "transfer",
      type: "function",
      inputs: [
        { name: "recipient", type: "felt" },
        { name: "amount", type: "Uint256" }
      ],
      outputs: [{ name: "success", type: "felt" }]
    },
    {
      name: "approve",
      type: "function",
      inputs: [
        { name: "spender", type: "felt" },
        { name: "amount", type: "Uint256" }
      ],
      outputs: [{ name: "success", type: "felt" }]
    }
  ]
};

// Blitz Point Contract
export const BLIZT_POINT_CONTRACT: ContractConfig = {
  address: CONTRACT_ADDRESSES.BLIZT_POINT,
  abi: [
    {
      name: "balanceOf",
      type: "function",
      inputs: [{ name: "account", type: "felt" }],
      outputs: [{ name: "balance", type: "Uint256" }]
    },
    {
      name: "mint",
      type: "function",
      inputs: [
        { name: "to", type: "felt" },
        { name: "amount", type: "Uint256" }
      ],
      outputs: []
    },
    {
      name: "burn",
      type: "function",
      inputs: [
        { name: "from", type: "felt" },
        { name: "amount", type: "Uint256" }
      ],
      outputs: []
    },
    {
      name: "claimRewards",
      type: "function",
      inputs: [{ name: "user", type: "felt" }],
      outputs: [{ name: "amount", type: "Uint256" }]
    }
  ]
};

// Fuel Token Contract
export const FUEL_CONTRACT: ContractConfig = {
  address: CONTRACT_ADDRESSES.FUEL_TOKEN,
  abi: [
    {
      name: "balanceOf",
      type: "function",
      inputs: [{ name: "account", type: "felt" }],
      outputs: [{ name: "balance", type: "Uint256" }]
    },
    {
      name: "joinPool",
      type: "function",
      inputs: [
        { name: "poolId", type: "felt" },
        { name: "amount", type: "Uint256" }
      ],
      outputs: []
    },
    {
      name: "leavePool",
      type: "function",
      inputs: [{ name: "poolId", type: "felt" }],
      outputs: [{ name: "refund", type: "Uint256" }]
    },
    {
      name: "getPoolInfo",
      type: "function",
      inputs: [{ name: "poolId", type: "felt" }],
      outputs: [
        { name: "totalAmount", type: "Uint256" },
        { name: "participantCount", type: "felt" },
        { name: "isActive", type: "felt" }
      ]
    },
    {
      name: "claimWinnings",
      type: "function",
      inputs: [
        { name: "poolId", type: "felt" },
        { name: "winner", type: "felt" }
      ],
      outputs: [{ name: "amount", type: "Uint256" }]
    }
  ]
};

// Game Contract (for card management and battles)
export const GAME_CONTRACT: ContractConfig = {
  address: CONTRACT_ADDRESSES.BLIZT_POINT, // Placeholder, replace with actual game contract
  abi: [
    {
      name: "mintCard",
      type: "function",
      inputs: [
        { name: "to", type: "felt" },
        { name: "cardId", type: "felt" },
        { name: "rarity", type: "felt" }
      ],
      outputs: [{ name: "tokenId", type: "Uint256" }]
    },
    {
      name: "getCard",
      type: "function",
      inputs: [{ name: "tokenId", type: "Uint256" }],
      outputs: [
        { name: "cardId", type: "felt" },
        { name: "rarity", type: "felt" },
        { name: "owner", type: "felt" }
      ]
    },
    {
      name: "getUserCards",
      type: "function",
      inputs: [{ name: "user", type: "felt" }],
      outputs: [{ name: "cardIds", type: "felt*" }]
    },
    {
      name: "transferCard",
      type: "function",
      inputs: [
        { name: "from", type: "felt" },
        { name: "to", type: "felt" },
        { name: "tokenId", type: "Uint256" }
      ],
      outputs: []
    }
  ]
};

// Contract helper functions
export class ContractHelper {
  static getContractByAddress(address: string): ContractConfig | null {
    const contracts = [
      ETH_CONTRACT,
      STRK_CONTRACT,
      BLIZT_POINT_CONTRACT,
      FUEL_CONTRACT,
      GAME_CONTRACT
    ];
    
    return contracts.find(contract => 
      contract.address.toLowerCase() === address.toLowerCase()
    ) || null;
  }
  
  static getContractFunction(contract: ContractConfig, functionName: string) {
    return contract.abi.find(item => 
      item.type === 'function' && item.name === functionName
    );
  }
  
  static validateAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{63,64}$/.test(address);
  }
}

// Export all contracts for easy access
export const CONTRACTS_CONFIG = {
  ETH: ETH_CONTRACT,
  STRK: STRK_CONTRACT,
  BLIZT_POINT: BLIZT_POINT_CONTRACT,
  FUEL: FUEL_CONTRACT,
  GAME: GAME_CONTRACT,
} as const;

// Contract event types
export interface ContractEvent {
  type: string;
  data: any;
  blockNumber: number;
  transactionHash: string;
}

// Common contract error types
export enum ContractError {
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  UNAUTHORIZED = 'UNAUTHORIZED',
  CONTRACT_NOT_FOUND = 'CONTRACT_NOT_FOUND',
  FUNCTION_NOT_FOUND = 'FUNCTION_NOT_FOUND',
  INVALID_PARAMETERS = 'INVALID_PARAMETERS',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
}