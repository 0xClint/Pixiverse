export function convertWalletData(response) {
  return response.reduce((acc, network) => {
    acc[network.network_name] = {
      address: network.address,
      network_id: network.network_id,
      network_symbol: network.network_symbol,
    };
    return acc;
  }, {});
}
