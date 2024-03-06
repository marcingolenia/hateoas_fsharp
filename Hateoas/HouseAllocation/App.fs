module HouseAllocation.App

open Giraffe
open Giraffe.EndpointRouting
open Microsoft.AspNetCore.Http
open Microsoft.FSharp.Reflection
open Api

// Api + App
// API intact
// APP:
// 1. Home screen that fetches maybe fetches options
// 2. Allocate student functionality
// 3. Delete student functionallity
// 4. Show houses state

let fromString<'a> (s: string) =
    match FSharpType.GetUnionCases typeof<'a> |> Array.filter (fun case -> case.Name = s) with
    | [| case |] -> Some(FSharpValue.MakeUnion(case, [||]) :?> 'a)
    | _ -> None

let showIndex: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) ->
        task {
            let! options = Api.readOptions next ctx
            let a = options.Value
            ()
        }
        
        htmlView (Views.layout) next ctx

let showTest: HttpHandler =
    fun (next: HttpFunc) (ctx: HttpContext) -> htmlView Views.test next ctx

let endpoints =
    [ GET
          [ route "/" showIndex |> addMetadata "index"
            route "/test" showTest |> addMetadata "test" ] ]
