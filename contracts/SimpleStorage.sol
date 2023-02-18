// I'm a comment!
// SPDX-License-Identifier: MIT

pragma solidity 0.8.8;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

// contract SimpleStorage {
//   uint256 favoriteNumber;

//   struct People {
//     uint256 favoriteNumber;
//     string name;
//   }

//   // uint256[] public anArray;
//   People[] public people;

//   mapping(string => uint256) public nameToFavoriteNumber;

//   function store(uint256 _favoriteNumber) public {
//     favoriteNumber = _favoriteNumber;
//   }

//   function retrieve() public view returns (uint256) {
//     return favoriteNumber;
//   }

//   function addPerson(string memory _name, uint256 _favoriteNumber) public {
//     people.push(People(_favoriteNumber, _name));
//     nameToFavoriteNumber[_name] = _favoriteNumber;
//   }
// }


// SPDX-Licence-Identifier : MIT 

//pragma solidity ^0.6.6 ;

contract SimpleStorage{

    // farmers and its lands 
    struct Land{
        uint256  UPIN ;
        string  landTitle ;
        uint64  SurvayNo;
        string  area ;
        string  landUse ;
    }
    Land[] public farmer; 
    mapping(uint256 => Land) public upin_to_land;

    string[] public Farmers_arr ;
    mapping(string => uint256[] ) public Farmers_map;

    function add_land( string memory _fid,uint256  _UPIN ,string memory _landTitle ,uint64  _SurvayNo ,string memory _area ,string memory _landUse  ) public {
        Land memory land = Land(_UPIN , _landTitle , _SurvayNo , _area , _landUse);
        farmer.push(land);
        upin_to_land[_UPIN] = land ;
        if( bool(Farmers_map[_fid].length>= 0 )){
            // uint256[] memory arr =  uint256();
            // arr.push()
            Farmers_arr.push(_fid);
            Farmers_map[_fid].push(_UPIN);
        }
    }

    // function add_farmer(string memory _fid  , uint256 _UPIN ) public {
    //     Farmers_arr.push(_fid);
    //     Farmers_map[_fid].push(_UPIN);
    // }

    function sell_land(string memory _buyer_fid , string memory _seller_fid , string memory _UPIN) public {
        
    }
