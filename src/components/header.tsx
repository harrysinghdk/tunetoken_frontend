import { useCallback } from "react";
import { AccountType } from "@/pages";

interface HeaderProps extends AccountType {}

export const Header = ({ address, balance, chainId, network }: HeaderProps) => {
  return (
    <div className="px-6 md:px-12 sm:px-2">
      <div className="flex justify-between items-centers">
        <div className="flex-1 px-2 mx-2">
          🟢 <span>{address ?? "Wallet Address"}</span>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <span>{balance ?? "Balance"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
