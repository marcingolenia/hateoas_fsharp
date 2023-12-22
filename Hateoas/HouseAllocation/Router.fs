module HouseAllocation.Router

open Giraffe
open Giraffe.EndpointRouting
open Microsoft.AspNetCore.Http
open Microsoft.FSharp.Reflection
open Domain
open Dao
open Dtos

let fromString<'a> (s: string) =
    match FSharpType.GetUnionCases typeof<'a> |> Array.filter (fun case -> case.Name = s) with
    | [| case |] -> Some(FSharpValue.MakeUnion(case, [||]) :?> 'a)
    | _ -> None
    
let readOptions: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let links : Link list = [{
                Rel = "all_houses"
                Href = "/accommodation/houses"
        }]
        json links next ctx

let readHouses: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let data =
            houses
            |> List.map (fun house ->
                { Name = house.Name.ToString()
                  Links =
                    [ { Rel = "self"
                        Href = $"/accommodation/houses/{house.Name.ToString()}" }
                      { Rel = "all_students"
                        Href = $"/accommodation/houses/{house.Name.ToString()}/students" }
                    ] })

        json data next ctx

let readHouseBy (name: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let house =
            houses
            |> List.tryFind (fun house -> house.Name.ToString() = name)
            |> Option.bind (fun house -> HouseDto.map house |> Some)
        match house with
        | Some house -> json house next ctx
        | None ->
            ctx.SetStatusCode(StatusCodes.Status404NotFound)
            text "Page not found" next ctx

let readStudentsBy (houseName: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let house = fromString<HouseName> houseName
        let isAdmin = ctx.User.IsInRole "Admin"
        match house with
        | Some house -> housedStudents[house] |> fun list ->
            let response: ResponseDto<StudentDto list> = { Members = list |> List.map(StudentDto.map isAdmin)
                                                           Links = [{Rel = "parent"; Href = $"/accommodation/houses/{houseName}" }] 
            }
            json response next ctx
        | None ->
            ctx.SetStatusCode(StatusCodes.Status404NotFound)
            text "Page not found" next ctx

let deleteStudentBy (house: string, id: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let confirmation: ConfirmationDto =
            { Message = "Deleted"
              Links = [
                  { Rel = "all_students" ;Href = $"/accommodation/houses/{house}/students"}
                  { Rel = "parent"; Href = $"/accommodation/houses/{house}" }
              ]
            }
        deleteStudentBy id
        json confirmation next ctx

let endpoints =
    [
      OPTIONS [
          route "/" readOptions
      ]
      GET [
            routef "/houses/%s/students" readStudentsBy
            routef "/houses/%s" readHouseBy
            route "/houses" readHouses
          ]
      DELETE [
          routef "/houses/%s/students/%s" deleteStudentBy
      ]
    ]

//https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/openapi?view=aspnetcore-8.0
// |> addMetadata (EndpointNameMetadata "get_houses")
//HOMEWORK: IMPLEMENT AssignStudent
