module Tests.Houses

open System.Net.Http.Headers
open HouseAllocation.Domain
open HouseAllocation.Dao
open Xunit
open FsUnit.Xunit
open HouseAllocation.Dtos

[<Fact>]
let ``GET /accommodation/house/:name" should return house with capacity`` () =
    task {
        let api = run().CreateClient()
        let! response = api.Get<{|Name: string; Capacity: int|}> "/accommodation/houses/Gryffindor" None
        response.Capacity |> should equal Gryffindor.Capacity
        response.Name |> should equal (Gryffindor.Name.ToString())
    }
    
[<Fact>]
let ``GET /accommodation/house/:name/students" should return list of students`` () =
    task {
        let api = run().CreateClient()
        let! response = api.Get<ResponseDto<StudentDto list>> "/accommodation/houses/Gryffindor/students" None
        response.Members |> List.map(_.Id) |> should equal (housedStudents[HouseName.Gryffindor] |> List.map(_.Id))
    }
    
[<Fact>]
let ``DELETE /accommodation/house/:name/students/:name" should return 200 OK`` () =
    task {
        let api = run().CreateClient()
        let! response = api.Delete<ConfirmationDto> $"/accommodation/houses/Gryffindor/students/%s{housedStudents[HouseName.Gryffindor].Head.Name}"
        response.Message |> should equal "Deleted"
    }
    
[<Fact>]
let ``HATEOAS Admin Can list students, delete one of them and get refreshed list`` () =
    task {
        let api = run().CreateClient()
        let! options = api.Options<Link list>"/accommodation"
        let allHousesLink =  options |> List.find(fun link -> link.Rel = "all_houses") |> _.Href
        let! housesReponse = api.Get<HouseListItemDto list> allHousesLink None
        let fstHouseLink = housesReponse.Head
                           |> _.Links
                           |> List.find(fun link -> link.Rel = "all_students")
                           |> _.Href
        let! studentsReponse = api.Get<ResponseDto<StudentDto list>> fstHouseLink (Some (AuthenticationHeaderValue("Test", "Admin")))
        let fstStudentLink = studentsReponse.Members.Head
                             |> _.Links
                             |> List.find(fun link -> link.Rel = "edit")
                             |> _.Href
        let! _ = api.Delete<ConfirmationDto> fstStudentLink
        let! studentsReponseAfterDelete = api.Get<ResponseDto<StudentDto list>> fstHouseLink None
        let studentThatShouldBeRemoved =
            studentsReponseAfterDelete.Members
            |> List.tryFind(fun student -> student.Name = studentsReponse.Members.Head.Name)
        studentThatShouldBeRemoved |> should equal None
    }
    
[<Fact>]
let ``GET /accommodation/houses" should return ["Gryffindor"; "Hufflepuff"; "Ravenclaw"; "Slytherin"] with links`` () =
    task {
        // Arrage
        let api = run().CreateClient()
        // Act
        let! houses = api.Get<HouseListItemDto list> "/accommodation/houses" None
        // Assert
        houses |> List.iter(fun house ->
                ["Gryffindor"; "Hufflepuff"; "Ravenclaw"; "Slytherin"] |> should contain house.Name
            )
        let link = houses |> List.head |> _.Links |> List.head
        let! house = api.Get<{|Name: string; Capacity: int|}> link.Href None
        house.Capacity |> should greaterThan 0
    }