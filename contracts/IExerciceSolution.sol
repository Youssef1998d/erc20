pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IExerciceSolution is ERC20{

    mapping(address=>bool) public whiteList;
    mapping(address=>uint8) public tierLevels;

    constructor(string memory assN, string memory asst, uint256 initialSupply) public ERC20(assN, asst){
      _mint(msg.sender, initialSupply);
      tierLevels[address(0xcff8985FF63cDce92036A2747605FB7ead26423e)] = 1;
      whiteList[address(0xcff8985FF63cDce92036A2747605FB7ead26423e)] = false;
    }
  
  function getToken() public onlyWhiteList returns (bool){
    _mint(msg.sender, 1000);
    return  true;
  }

  function isCustomerWhiteListed(address a) public returns (bool){
    return whiteList[a];
  }
  function customerTierLevel(address a) external returns (uint256){
    return tierLevels[a];
  }

  function setList(address a, bool b) public {
    whiteList[a] = b;
  }

  function setLevel(address a, uint8 b) public{
    tierLevels[a] = b;
  }

  modifier onlyWhiteList(){
    require (whiteList[msg.sender]);
    _;
  }

  function buyToken() external payable onlyWhiteList returns (bool){
    _mint(msg.sender, msg.value*tierLevels[msg.sender]);
    return true;
  }
}