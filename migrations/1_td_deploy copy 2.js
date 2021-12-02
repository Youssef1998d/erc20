const Str = require('@supercharge/strings')

var TDErc20 = artifacts.require("ERC20TD.sol");
var evaluator = artifacts.require("Evaluator.sol");
var erc = artifacts.require("IExerciceSolution.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
		await test(deployer, network, accounts);
        //await interact(deployer, network, accounts); 
		await testDep(deployer, network, accounts);
    });
};

async function testDep(deployer, network, accounts){
	acc = 1
	//ex1
	await Evaluator.ex1_getTickerAndSupply({from : accounts[acc]});
	assignedTicker = await Evaluator.assignedTicker(accounts[acc]);
	assignedSupply = new web3.utils.BN(await Evaluator.assignedSupply(accounts[acc]))

	myERC20 = await erc.new(assignedTicker, assignedTicker, assignedSupply, {from : accounts[acc]})
	await Evaluator.submitExercice(myERC20.address, {from:accounts[acc]})


	//ex2
	await Evaluator.ex2_testErc20TickerAndSupply({from : accounts[acc]})
	//await Evaluator.submitExercice(myERC20.address, {from:accounts[acc]})
}

/*async function interact(deployer, network, accounts) {
	TDToken = await TDErc20.at("0xbf23538e0c8AB87f517E2d296cb0E71D3d3AFE8F");
	Evaluator = await evaluator.at("0xcff8985FF63cDce92036A2747605FB7ead26423e")
}*/
async function test(deployer, network, accounts){
	TDToken = await TDErc20.new("www", "ww", 1000000000000);
	Evaluator = await evaluator.new(TDToken.address);
}




