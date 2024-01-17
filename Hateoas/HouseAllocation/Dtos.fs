module HouseAllocation.Dtos

open HouseAllocation.Domain
open Microsoft.AspNetCore.Routing

type HouseListItemDto = { Name: string; Links: Link list }

type ConfirmationDto = { Message: string; Links: Link list }

type HouseDto =
    { Name: string
      Capacity: int
      Links: Link list }

    static member map (linker: LinkGenerator) (house: House) =
        let houseName = house.Name.ToString()

        { Name = houseName
          Capacity = house.Capacity
          Links =
            [ { Rel = "all_students"
                Href = linker.GetPathByName("get_house_students", {| s0 = houseName |}) } ] }

type StudentDto =
    { Id: string
      Name: string
      House: string
      Links: Link list }

    static member map (linker: LinkGenerator) (canEdit: bool) (student: Student) =
        let houseName = student.House.ToString()

        { Id = student.Id
          Name = student.Name
          House = houseName
          Links =
            match canEdit with
            | false -> []
            | true ->
                [ { Rel = "edit"
                    Href = linker.GetPathByName("delete_student", {| s0 = houseName; s1 = student.Id |}) } ] }
