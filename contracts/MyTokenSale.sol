pragma solidity ^0.6.0;

import "./Crowdsale.sol";
import "./MintedCrowdsale.sol";
import "./ERC20Mintable.sol";
import "./KycContract.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyTokenSale is Crowdsale, MintedCrowdsale {

	
    KycContract kyc;

    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    )
        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require (kyc.isKycCompleted(msg.sender), "KYC is not completed. You can't purchase tokens!");
    }

     function _deliverTokens(address beneficiary, uint256 tokenAmount) internal override {
        // Potentially dangerous assumption about the type of the token.
        require(
            ERC20Mintable(address(token())).mint(beneficiary, tokenAmount),
                "MintedCrowdsale: minting failed"
        );
    }
}