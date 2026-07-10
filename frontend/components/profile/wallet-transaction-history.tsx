"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, ExternalLink, Clock, CheckCircle, XCircle } from "lucide-react";
import { ethers } from "ethers";
import { EXPLORER_URL, txExplorerUrl } from "@/lib/chain";

interface BscTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  timeStamp: string;
  isError: string;
  blockNumber: string;
}

interface TransactionData {
  hash: string;
  blockNumber: number;
  timestamp: number;
  type: 'sent' | 'received' | 'unknown';
  amount: number;
  from: string;
  to: string;
  status: 'success' | 'failed';
  fee: number;
  description: string;
}

interface WalletTransactionHistoryProps {
  walletAddress: string;
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'sent':
      return <ArrowUpRight className="w-4 h-4 text-red-500" />;
    case 'received':
      return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
    default:
      return <ArrowUpRight className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-yellow-500" />;
  }
};

const formatAmount = (amount: number, type: string) => {
  const sign = type === 'received' ? '+' : '-';
  return `${sign}${amount.toFixed(4)} ETH`;
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const truncateAddress = (address: string, length: number = 8) => {
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export function WalletTransactionHistory({ walletAddress }: WalletTransactionHistoryProps) {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const parseBscTransaction = (tx: BscTransaction, walletAddress: string): TransactionData => {
    const isSent = tx.from.toLowerCase() === walletAddress.toLowerCase();
    const isReceived = tx.to.toLowerCase() === walletAddress.toLowerCase();
    
    const amountInBnb = parseFloat(ethers.formatEther(tx.value));
    const gasUsed = BigInt(tx.gasUsed);
    const gasPrice = BigInt(tx.gasPrice);
    const feeInBnb = parseFloat(ethers.formatEther(gasUsed * gasPrice));

    return {
      hash: tx.hash,
      blockNumber: parseInt(tx.blockNumber),
      timestamp: parseInt(tx.timeStamp),
      type: isSent ? 'sent' : isReceived ? 'received' : 'unknown',
      amount: amountInBnb,
      from: tx.from,
      to: tx.to,
      status: tx.isError === '0' ? 'success' : 'failed',
      fee: feeInBnb,
      description: `${isSent ? 'Sent' : 'Received'} ${amountInBnb.toFixed(4)} ETH ${isSent ? 'to' : 'from'} ${truncateAddress(isSent ? tx.to : tx.from)}`
    };
  };

  const fetchTransactions = async () => {
    if (!walletAddress) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Blockscout exposes an Etherscan-compatible API at /api (no key required)
      const baseUrl = `${EXPLORER_URL}/api`;

      const response = await fetch(
        `${baseUrl}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=20&sort=desc`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== '1') {
        if (data.message === 'No transactions found') {
          setTransactions([]);
          return;
        }
        throw new Error(data.message || 'Failed to fetch transactions');
      }
      
      const bscTransactions: BscTransaction[] = data.result;
      
      if (bscTransactions.length === 0) {
        setTransactions([]);
        return;
      }

      // Parse transactions
      const parsedTransactions = bscTransactions.map(tx => 
        parseBscTransaction(tx, walletAddress)
      );

      setTransactions(parsedTransactions);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transaction history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [walletAddress]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === 'all') return true;
    return transaction.type === activeTab;
  });

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case 'sent':
        return 'Sent';
      case 'received':
        return 'Received';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-medium">Wallet Transaction History</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchTransactions}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
          <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
          <TabsTrigger value="sent" className="text-xs sm:text-sm">Sent</TabsTrigger>
          <TabsTrigger value="received" className="text-xs sm:text-sm">Received</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="flex flex-col sm:flex-row justify-center items-center py-8 gap-2">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground text-center">Loading transactions...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8 px-4">
              <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>
              <Button
                variant="outline"
                onClick={fetchTransactions}
                className="w-full sm:w-auto"
              >
                Try Again
              </Button>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-8 px-4">
              <p className="text-muted-foreground text-sm sm:text-base">No transactions found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.hash}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0">
                    <div className="p-2 rounded-full bg-muted flex-shrink-0">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <p className="font-medium text-sm sm:text-base">
                          {getTransactionTypeLabel(transaction.type)}
                        </p>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(transaction.status)}
                          <span className="text-xs text-muted-foreground">
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {formatDate(transaction.timestamp)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {transaction.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-1 sm:gap-2">
                    <p className={`font-medium text-sm sm:text-base ${
                      transaction.type === 'received'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {formatAmount(transaction.amount, transaction.type)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Fee: {transaction.fee.toFixed(6)} ETH
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground self-start sm:self-auto"
                      onClick={() => {
                        window.open(
                          txExplorerUrl(transaction.hash),
                          '_blank'
                        );
                      }}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">View on explorer</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
