open Falco
open Falco.Routing
open Falco.HostBuilder
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Routing

let handleName =
    fun (ctx: HttpContext) ->
        let linker = ctx.GetService<LinkGenerator>()
        let route = Request.getRoute ctx
        let name = route.GetString "name"
        let message = sprintf "Hello %s" name
        Response.ofPlainText message ctx

webHost [||] { endpoints [
    get "/hello/{name:alpha}" handleName
] } 
