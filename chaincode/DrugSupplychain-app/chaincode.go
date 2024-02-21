package main


import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
	contractapi
}


type Drug struct {
	Date string `json:"id"`
	Timestamp string `json:"timestamp"`
	Location  string `json:"location"`
	Holder  string `json:"holder"`
}


func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}


func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {


	function, args := APIstub.GetFunctionAndParameters()
	if function == "queryDrug" {
		return s.queryDrug(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "recordDrug" {
		return s.recordDrug(APIstub, args)
	} else if function == "queryAllDrug" {
		return s.queryAllDrug(APIstub)
	} else if function == "changeDrugHolder" {
		return s.changeDrugHolder(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}


func (s *SmartContract) queryDrug(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	drugAsBytes, _ := APIstub.GetState(args[0])
	if drugAsBytes == nil {
		return shim.Error("Could not locate drug")
	}
	return shim.Success(drugAsBytes)
}


func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	drug := []Drug{
		Drug{Date: "12/1/2022", Location: "Country1", Timestamp: "1504054225", Holder: "Manufacturers"},
		Drug{Date: "18/1/2022", Location: "Countr2", Timestamp: "1504057825", Holder: "Wholesaler"},
		Drug{Date: "11/5/2022", Location: "Country3", Timestamp: "1493517025", Holder: "Packager"},
		Drug{Date: "22/6/2022", Location: "Country4", Timestamp: "1496105425", Holder: "Manufacturers"},
		Drug{Date: "11/7/2022", Location: "Country5", Timestamp: "1493512301", Holder: "Pharmacy"},
		Drug{Date: "12/7/2022", Location: "Country6", Timestamp: "1494117101", Holder: "Pharmacy"},
		Drug{Date: "12/1/2023", Location: "Country7", Timestamp: "1496104301", Holder: "Manufacturers"},
		Drug{Date: "21/1/2023", Location: "Country5", Timestamp: "1485066691", Holder: "Packager"},
		Drug{Date: "12/2/2023", Location: "Countr2", Timestamp: "1485153091", Holder: "Wholesaler"},
		Drug{Date: "15/2/2023", Location: "Country6", Timestamp: "1487745091", Holder: "Wholesaler"},
	}

	i := 0
	for i < len(drug) {
		fmt.Println("i is ", i)
		drugAsBytes, _ := json.Marshal(drug[i])
		APIstub.PutState(strconv.Itoa(i+1), drugAsBytes)
		fmt.Println("Added", drug[i])
		i = i + 1
	}

	return shim.Success(nil)
}

func (s *SmartContract) recordDrug(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	var drug = Drug{ Date: args[1], Location: args[2], Timestamp: args[3], Holder: args[4] }

	drugAsBytes, _ := json.Marshal(drug)
	err := APIstub.PutState(args[0], drugAsBytes)
	if err != nil {
		return err
	}

	return shim.Success(nil)
}


func (s *SmartContract) queryAllDrug(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "0"
	endKey := "999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllDrug:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}


func (s *SmartContract) changeDrugHolder(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	drugAsBytes, _ := APIstub.GetState(args[0])
	if drugAsBytes == nil {
		return shim.Error("Could not locate drug")
	}
	drug := Drug{}

	json.Unmarshal(drugAsBytes, &drug)
	drug.Holder = args[1]

	drugAsBytes, _ = json.Marshal(drug)
	err := APIstub.PutState(args[0], drugAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to change drug holder: %s", args[0]))
	}

	return shim.Success(nil)
}


func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error %s", err)
	}
}
