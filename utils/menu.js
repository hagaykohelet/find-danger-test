import { findDangerousPeople,getCallRecords,getPeopleList,searchPeople } from "./functions.js";
import readline from "readline-sync"


export default async function menu(){
    console.log(`======menu========
        1. get people list to json file
        2. get call transcriptions to json file
        3. search people 
        4. find dangerous people
        0. exit \n`)

        let flag = true
        while(flag){
            let choice = readline.question("please enter from menu: ")
        

        switch(choice){
            case "1":
                await getPeopleList()
                break
            

            case "2":
                await getCallRecords()
                break

            
            case "3":
                let searchBy;
                while(searchBy != "name"  && searchBy != "age"){
                    searchBy = readline.question("please choose name or age: ")
                }
                await searchPeople(searchBy)
                break

            case "4":
                await findDangerousPeople()
                break

            case "0":
                flag = false
                break


            default:
                console.log("invalid input try again")
        }
        }

}
