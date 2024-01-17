module HouseAllocation.Router

open Giraffe
open Giraffe.EndpointRouting
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Routing
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
        let linker = ctx.GetService<LinkGenerator>()
        let links : Link list = [{
                Rel = "all_houses"
                Href = linker.GetPathByName "get_houses"
        }]
        json links next ctx

let readHouses: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let linker = ctx.GetService<LinkGenerator>()
        let data =
            houses
            |> List.map (fun house ->
                { Name = house.Name.ToString()
                  Links =
                    [ { Rel = "self"
                        Href = linker.GetPathByName("get_houses_by", {|s0 = house.Name.ToString()|}) }
                      { Rel = "all_students"
                        Href = linker.GetPathByName("get_house_students", {|s0 = house.Name.ToString()|})}
                    ]})
        json data next ctx

let readHouseBy (name: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let linker = ctx.GetService<LinkGenerator>()
        let house =
            houses
            |> List.tryFind (fun house -> house.Name.ToString() = name)
            |> Option.bind (fun house -> HouseDto.map linker house |> Some)
        match house with
        | Some house -> json house next ctx
        | None ->
            ctx.SetStatusCode(StatusCodes.Status404NotFound)
            text "Page not found" next ctx

let readStudentsBy (houseName: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let linker = ctx.GetService<LinkGenerator>()
        let house = fromString<HouseName> houseName
        let isAdmin = ctx.User.IsInRole "Admin"
        match house with
        | Some house -> housedStudents[house] |> fun list ->
            let response: ResponseDto<StudentDto list> = { Members = list |> List.map(StudentDto.map linker isAdmin)
                                                           Links = [{Rel = "parent"; Href = linker.GetPathByName("get_houses_by", {|s0 = houseName |}) }] 
            }
            json response next ctx
        | None ->
            ctx.SetStatusCode(StatusCodes.Status404NotFound)
            text "Page not found" next ctx

let deleteStudentBy (houseName: string, id: string) : HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        let linker = ctx.GetService<LinkGenerator>()
        let confirmation: ConfirmationDto =
            { Message = "Deleted"
              Links = [
                  { Rel = "all_students"; Href = linker.GetPathByName("get_house_students", {|s0 = houseName |})}
                  { Rel = "parent"; Href = linker.GetPathByName("get_houses_by", {|s0 = houseName |}) }
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
            routef "/houses/%s/students" readStudentsBy |> addMetadata(EndpointNameMetadata "get_house_students") 
            routef "/houses/%s" readHouseBy |> addMetadata(EndpointNameMetadata "get_houses_by") 
            route "/houses" readHouses |> addMetadata(EndpointNameMetadata "get_houses")
          ]
      DELETE [
          routef "/houses/%s/students/%s" deleteStudentBy |> addMetadata(EndpointNameMetadata "delete_student")
      ]
    ]