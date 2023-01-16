// SPDX-License-Identifier: MIT
//
// ╭━━━━╮╱╱╭╮╱╱╱╱╱╭╮╱╱╱╱╱╭╮
// ┃╭╮╭╮┃╱╱┃┃╱╱╱╱╱┃┃╱╱╱╱╱┃┃
// ╰╯┃┃┣┻━┳┫┃╭┳━━╮┃┃╱╱╭━━┫╰━┳━━╮
// ╱╱┃┃┃╭╮┣┫╰╯┫╭╮┃┃┃╱╭┫╭╮┃╭╮┃━━┫
// ╱╱┃┃┃╭╮┃┃╭╮┫╰╯┃┃╰━╯┃╭╮┃╰╯┣━━┃
// ╱╱╰╯╰╯╰┻┻╯╰┻━━╯╰━━━┻╯╰┻━━┻━━╯
pragma solidity ^0.8.9;

import "../thirdparty/LibMerkleTrie.sol";
import "../libs/LibZKP.sol";
import "../common/EssentialContract.sol";

/// @author dantaik <dan@taiko.xyz>
interface IProofVerifier {
    function verifyZKP(
        bytes memory verificationKey,
        bytes calldata zkproof,
        bytes32 blockHash,
        address prover,
        bytes32 txListHash
    ) external view returns (bool verified);

    function verifyMKP(
        bytes memory key,
        bytes memory value,
        bytes memory proof,
        bytes32 root
    ) external pure returns (bool verified);
}

contract ProofVerifier is IProofVerifier, EssentialContract {
    function init(address addressManager) external initializer {
        EssentialContract._init(addressManager);
    }

    function verifyZKP(
        bytes memory verificationKey,
        bytes calldata zkproof,
        bytes32 blockHash,
        address prover,
        bytes32 txListHash
    ) external view returns (bool) {
        return
            LibZKP.verify({
                plonkVerifier: resolve("plonk_verifier"),
                verificationKey: verificationKey,
                zkproof: zkproof,
                blockHash: blockHash,
                prover: prover,
                txListHash: txListHash
            });
    }

    function verifyMKP(
        bytes memory key,
        bytes memory value,
        bytes memory proof,
        bytes32 root
    ) external pure returns (bool) {
        return
            LibMerkleTrie.verifyInclusionProof({
                _key: key,
                _value: value,
                _proof: proof,
                _root: root
            });
    }
}
