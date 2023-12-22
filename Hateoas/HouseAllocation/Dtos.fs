module HouseAllocation.Dtos

open HouseAllocation.Domain

type HouseListItemDto = { Name: string; Links: Link list }

type ConfirmationDto = { Message: string; Links: Link list }

type HouseDto =
    { Name: string
      Capacity: int
      Links: Link list }

    static member map(house: House) =
        let houseName = house.Name.ToString()

        { Name = house.Name.ToString()
          Capacity = house.Capacity
          Links =
            [ { Rel = "all_students"
                Href = $"/accommodation/houses/{houseName}/students/" } ] }

type StudentDto =
    { Id: string
      Name: string
      House: string
      Links: Link list }

    static member map (canEdit: bool) (student: Student) =
        let houseName = student.House.ToString()

        { Id = student.Id
          Name = student.Name
          House = houseName
          Links =
            match canEdit with
            | false -> []
            | true ->
                [ { Rel = "edit"
                    Href = $"/accommodation/houses/{houseName}/students/{student.Id}" } ] }
