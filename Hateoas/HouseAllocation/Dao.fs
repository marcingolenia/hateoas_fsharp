module HouseAllocation.Dao

open Domain
open System

let f = Bogus.Faker()

let houses: House list = [ Gryffindor; Slytherin; Ravenclaw; Hufflepuff ]

let private generateStudents house =
    [ for _ in 1..100 ->
          { Id = Guid.NewGuid().ToString()
            Name = f.Name.FullName()
            House = house } ]

let private allStudents =
    [ for house in
          [ HouseName.Gryffindor
            HouseName.Slytherin
            HouseName.Ravenclaw
            HouseName.Hufflepuff ] do
          yield! generateStudents house ]
    
let mutable housedStudents =
    allStudents |> List.groupBy _.House
                |> Map.ofList
    
let deleteStudentBy (id: string) =
    housedStudents <- housedStudents.Values
                            |> List.concat
                            |> List.filter(fun student -> student.Id <> id)
                            |> List.groupBy _.House
                            |> Map.ofList
                      