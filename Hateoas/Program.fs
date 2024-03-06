open System.Security.Claims
open Microsoft.AspNetCore.Builder
open Giraffe
open Giraffe.EndpointRouting
open Microsoft.AspNetCore.Http

let fakeAuth: HttpHandler =
     fun (next: HttpFunc) (ctx: HttpContext) ->
        let a = ctx.Request.Headers.Authorization
        let role =
            match a.ToArray() with
            | [|"Test Admin"|] -> "Admin"
            | _ -> "Guest"
        let claims = [
            Claim(ClaimTypes.Name, "Dumbledore")
            Claim(ClaimTypes.Email, "dumbledore@hogwart.gb")
            Claim(ClaimTypes.Role, role)
        ]
        let principal = ClaimsIdentity(claims, "TestAuth") |> ClaimsPrincipal
        ctx.User <- principal
        next ctx

let endpoints useMocks =
    let auth = if useMocks then applyBefore fakeAuth else id
    [
        GET [ route "/health" (text "Up") ]
        auth (subRoute "/accommodation" HouseAllocation.Api.endpoints)
        auth (subRoute "/accommodation-app" HouseAllocation.App.endpoints)
    ]

let builder = WebApplication.CreateBuilder()
builder.Services.AddGiraffe() |> ignore
let app = builder.Build()
app
   .UseRouting()
   .UseStaticFiles()
   .UseEndpoints(fun e -> e.MapGiraffeEndpoints (endpoints true)) |> ignore
app.Run()

type Program() = class end