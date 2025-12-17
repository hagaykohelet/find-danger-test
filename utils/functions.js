import { count } from 'console'
import { readFileSync } from 'fs'
import fs from 'fs/promises'
import readline from "readline-sync"
const BASE_URL = "https://spiestestserver.onrender.com"


export async function getPeopleList() {
    try {
        const response = await fetch(`${BASE_URL}/people`)
        const data = await response.text()
        try {
            await fs.writeFile("../data/PEOPLE.json", data)
            console.log("success")
        }
        catch (err) {
            console.log("fail")
        }
    }
    catch (err) {
        console.log(err)
    }

}


export async function getCallRecords() {
    try {
        const response = await fetch(`${BASE_URL}/transcriptions`)
        const data = await response.text()
        try {
            await fs.writeFile("../data/TRANSCRIPTIONS.json", data)
            console.log("success to write a file")

        } catch (err) {
            console.log("fail")
        }
    } catch (err) {
        console.log(err)
    }
}




export async function searchPeople(validation) {
    let searchBy;
    try {
        const people_list = await fs.readFile("./data/PEOPLE.json")
        const people_list_json = await JSON.parse(people_list)
        if (validation == "name") {
            searchBy = readline.question("enter a name do you want to search: ")
        }
        else {
            searchBy = readline.questionInt("enter the age do you want to search: ")
        }
        let person = people_list_json.filter(person => person[validation] == searchBy)
        if (person.length == 0)
            console.log("not found")
        else {
            console.log(person)
        }
    }
    catch (err) {
        console.log(err)
    }
}


export async function findDangerousPeople() {
    try {
        const transcriptionsText = await fs.readFile("../data/TRANSCRIPTIONS.json")
        const transcriptions = await JSON.parse(transcriptionsText)
        let result = {}
        let knife = 0
        let death = 0
        let bomb = 0
        let attack = 0
        for (let call of transcriptions) {
            if (call.content.includes("knife")){
                 knife +=  1
                }
            if (call.content.includes("death")){
                 death +=  1
                }
            if (call.content.includes("bomb")){
                 bomb +=  1
                }
            if (call.content.includes("attack")){
                 attack +=  1
                }  
            result[call.age] = [knife,death,bomb,attack]
            }
            console.log(result) }
    catch (err) {
        console.log(err)
    }

}


findDangerousPeople()